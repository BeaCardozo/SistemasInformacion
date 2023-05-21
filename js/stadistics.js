var keyValue = {}; //Diccionario para almacenar de forma ordenada los valores del localstorage

//Se recorre el LocalStorage
function forEachKey() {
    for (let i = 0; i < localStorage.length; i++) {
      keyValue[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
    }
  }

//Se ordena el contenido del diccionario keyValue
function orderScores(){
    var result = Object.keys(keyValue).sort(function(a, b) {
      return keyValue[b] - keyValue[a];
    })
    return result;
}
forEachKey();
orderScores();
//Se colocan dentro del html
for (var i = 0; i < orderScores().length; i++ ) {        
    let key = orderScores()[i];
    let item = "player"+(i+1);
    const player = document.getElementById(item);
    player.innerHTML = orderScores()[i];
    let item2 = "score"+(i+1);
    const score = document.getElementById(item2);
    score.innerHTML = localStorage.getItem(key); 
}

//Mostrar puntuación del último jugador
const currScoreP = document.getElementById("currScore");
currScoreP.innerHTML = "Tu puntuación: " + sessionStorage.getItem("score") + "pts.";

linkBtn.addEventListener('click', (e) => {
  window.location.reload();
});
