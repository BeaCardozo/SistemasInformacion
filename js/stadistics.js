const keyValue = {}; //Diccionario para almacenar de forma ordenada los valores del localstorage

function forEachKey() {
    for (let i = 0; i < localStorage.length; i++) {
      keyValue[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
    }
  }
forEachKey();
const entries = Object.entries(keyValue);
entries.sort();


for (var i = 0; i < localStorage.length; i += 1) {        
    let key = entries[i];
    let item = "player"+(i+1);
    const player = document.getElementById(item);
    player.innerHTML = key[0];
    let item2 = "score"+(i+1);
    const score = document.getElementById(item2);
    score.innerHTML = key[1]; 
}

//Mostrar puntuación del último jugador
const currScoreP = document.getElementById("currScore");
currScoreP.innerHTML = "Tu puntuación: " + sessionStorage.getItem("score") + "pts.";

linkBtn.addEventListener('click', (e) => {
  window.location.reload();
});
