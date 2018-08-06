function updateScore(){
  const age = document.getElementById('age_input').value;
  const days = document.getElementById('days_input').value;
  const health = document.getElementById('health_input').value;
  const outcome = document.getElementById('output');
  const probs = document.getElementById('probs');

  

  var data = {
    'Age': age,
    'Days in Shelter': days,
    'Good Health': health,
  };

  $.ajax({
    type: 'POST',
    contentType: "application/json; charset=utf-8",
    url: '/predict',
    async: true,
    data: JSON.stringify({
      data : data
    }),
    success: (response) => {
      var euth_outcome = (response.prediction == 0) ? "No" : "Yes"
      outcome.textContent = euth_outcome;
      probs.textContent = response.prob_euthanization;
    },
    error: (response) => {
      outcome.textContent = 'INVALID';
    }
  })
}