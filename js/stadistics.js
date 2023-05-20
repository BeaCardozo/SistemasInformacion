const keyValue = {}; //Diccionario para almacenar de forma ordenada los valores del localstorage

function forEachKey() {
    for (let i = 0; i < localStorage.length; i++) {
      keyValue[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
    }
  }

forEachKey();
const entries = Object.entries(keyValue);
entries.sort();


for (var i = 0; i < 3; i += 1) {        
    let key = entries[i];
    let score = keyValue[key];
    console.log(key);
    
    
}


//Mostrar puntuación del último jugador
const currScoreP = document.getElementById("currScore");
currScoreP.innerHTML = "Tu puntuación: " + sessionStorage.getItem("score") + "pts.";
