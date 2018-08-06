from flask import Flask, request, render_template, abort, jsonify
import pickle
import numpy as np

app = Flask('pupper_predict')

pipeline = pickle.load(open('./model.pkl', 'rb'))

def make_prediction(features):
    X = np.array([features['Age'], features['Days in Shelter'],int(features['Good Health'] == True)]).reshape(1,-1)
    prob_euth = pipeline.predict_proba(X)[0, 1]

    result = {
        'prediction': int(prob_euth > 0.5),
        'prob_euthanization': prob_euth
    }
    return result

@app.route('/')
def landing_page():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def score_api():
    if not request.json:
        abort(400)
    response = make_prediction(request.json['data'])
    return jsonify(response), 201

app.run(port=5000, debug=True)