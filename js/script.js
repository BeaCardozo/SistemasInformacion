const username = document.getElementById('name');
const button = document.getElementById('button');
const maxLength = 25;
const pattern = new RegExp('^[A-Z]+$', 'i');
var validation = false;

const validateInfo = () =>{
    if (!username.value){
        swal("Por favor, ingresa tu nombre!");
        validation = false;
    } else {
        if (username.value.length > maxLength){
            swal("Solo se permiten 25 carácteres");
            validation = false;
        } else {
            if(!pattern.test(username.value)){
                swal("Por favor, ingresa solo letras...");
            } else {
                const info = {
                    username: username.value
                }
                sessionStorage.setItem("username", info.username);
                validation = true;
            }
        }
    }
}

button.addEventListener('click', (e) => {
    e.preventDefault()
    validateInfo()
    if(validation == true){
        document.getElementById("form-container").style.display = 'none';
        new Game();
        displayTime(totalTiming);

        const countDown = setInterval(() => {
            totalTiming--;
            displayTime(totalTiming);
            var restTiming = totalTiming;
            if (totalTiming == 0 || totalTiming < 1) {
                endCount();
                document.getElementById("game").style.display = 'none';
                document.getElementById("stadistics").style.display = 'block';
                clearInterval(countDown);
            }
            }, 1000);

        function displayTime(second) {
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timerTitle.innerHTML = `
        ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
        `;
        }

        function endCount() {
            this.GameStart = false;
            sessionStorage.setItem("score", 0);
            swal({title: "¡Perdiste!", text: "Se acabo el tiempo. Puntaje Obtenido: 0pts.", button: "Ver estadísticas", closeOnClickOutside: false})};
        }
    }
);

//Funcionamiento del temporizador
    let totalTiming = 10; 
    const timerTitle = document.getElementById("Timer");

    

//Clase Game: funcionamiento del juego de memoria
class Game {
    constructor(){
        this.showScore = document.getElementById("player-score");
        this.showPlayersName = document.getElementById("player-name");
        this.timing = document.getElementById("timer");
        let name = sessionStorage.getItem("username");
        this.showPlayersName.innerHTML = "Nombre del jugador: " + name;
        this.totaliming = totalTiming;
        this.GameStart = false;
        this.cardOne = null;
        this.cardTwo = null;
        this.availableCards = [1, 2, 3, 4, 5, 6, 7, 8];
        this.order = [];
        this.maxPairNumber = this.availableCards.length;
        this.cards = Array.from(document.querySelectorAll('.game .game-container figure'));
        const playersInformation = {};
        this.game();
    }

    //Función game(): Declara la cantidad de parejas encontradas y los puntos iniciales del usuario. Invoca funciones para ordenar aleatoriamente las cartas, colocar las imagenes según el orden y mostrarlas incialmente.
    game() {
        document.getElementById("game").style.display = 'grid';
        this.foundPairs = 0;
        this.userPoints = 0;
        this.setNewOrder();
        this.setImages();
        this.openCards();
    }

    //Ordena aleatoriamente las cartas concantenando dos veces el arreglo inicial, para que se puedan establecer las parejas.
    setNewOrder(){
        this.order = this.availableCards.concat(this.availableCards);
        this.order.sort(() => Math.random() - 0.5);
    }

    //Asigna las imágenes según el orden. Como los archivos tienen por nombre números, entonces al recorrer el arreglo de cards, podemos acceder a los archivos mediante src.
    setImages(){
        for (const key in this.cards) {
           const card = this.cards[key];
           const img = this.order[key];
           const imgFile = card.children[1].children[0];
           card.dataset.image = img;
           imgFile.src = `images/${img}.png`;
        }
    }

    //Muestra las cartas inicialmente, agregarando la clase selected que en el archivo styles.css, hace que las cartas roten estilo "3D".
    openCards(){
        this.cards.forEach(card => card.classList.add("selected"));
        setTimeout(() => {
            this.closeCards();
        }, 1000);
    }

    //Remueve la clase selected y coloca las cartas en su posición original. Asignando GameStart como true, permite que ya el usuario pueda comenzar a interactuar con las cartas.
    closeCards() {
        this.cards.forEach(card => card.classList.remove("selected"));
        this.addEvents();
        this.GameStart = true;
    }

    
    addEvents() {
        this.cards.forEach(card => card.addEventListener("click", this.selectedCard.bind(this)));
    }

    removeClickEvents() {
        this.cards.forEach(card => card.removeEventListener("click", this.sle));
    }

    //Funcion que recibe como parámetro un evento, y voltea la carta segun el estilo de selected. También invoca la función para verificar si ese pareja es igual.
    selectedCard(e){
        const clickedCard = e.target;
        if (this.GameStart && !clickedCard.classList.contains("selected")){
            clickedCard.classList.add("selected");
            this.checkPair(clickedCard.dataset.image);
        }
    }

    //Verifica si dos cartas son iguales. Toma a cardOne y cardTwo y verifica que ambas tengan un valor asignado y las compara, en caso de ser iguales, invoca la funcion para verificar si ya se ganó la partida. En caso de que no, se resetean las cartas seleccionadas y se sigue jugando.
    checkPair(img) {
        if (!this.cardOne) this.cardOne = img;
        else this.cardTwo = img;
        if (this.cardOne && this.cardTwo) {
            if (this.cardOne == this.cardTwo) {
                this.GameStart = false;
                setTimeout(this.checkIfWon.bind(this), 300);
            }
            else {
                this.GameStart = false;
                setTimeout(this.resetCards.bind(this), 800)
            }
        }
    }

    //Se toman las ultimas dos cartas seleccionadas, para no cerrar todas en caso de haber sido descubierta una pareja. Se verifican estos valores mediante figure que posea clase selected y cuya data-image corresponda a lo guardado en cardOne y cardTwo. Se les remueve el estilo selected y se cierran. 
    resetCards(){
        const OpenedCardCurr = document.querySelector(`.game-container figure.selected[data-image ='${this.cardOne}']`);
        const OpenedCardCurr2 = document.querySelector(`.game-container figure.selected[data-image ='${this.cardTwo}']`);
        OpenedCardCurr.classList.remove("selected");
        OpenedCardCurr2.classList.remove("selected");
        this.cardOne = null;
        this.cardTwo = null;
        this.GameStart = true;
    }

    //Se añade un punto de foundPairs y 10 puntos a el score del usuario, se modifica en la interfaz. Si el número de pares, en este caso 8, es igual a los pares descubiertos se gana la partida.
    checkIfWon(){
        this.foundPairs++;
        this.userPoints += 10;
        this.showScore.innerHTML = "Puntaje: " + this.userPoints;
        this.cardOne = null;
        this.cardTwo = null;
        this.GameStart = true;
        if (this.maxPairNumber == this.foundPairs) {
            const finalPoints = this.userPoints*(120/180);
            sessionStorage.setItem("score", finalPoints);
            this.storageUserScore(finalPoints);
            swal({title: "¡Ganaste!", text: "Puntaje Obtenido: " + finalPoints, button: "Ver estadísticas", closeOnClickOutside: false}); 
            this.hideGame();
            this.showStadistics();
        }
    }

    storageUserScore(finalPoints){
        localStorage.setItem(sessionStorage.getItem("username"), finalPoints);
    }

    hideGame(){
        document.getElementById("game").style.display = 'none';
    }

    showStadistics(){
        document.getElementById("stadistics").style.display = 'block';
    }

    hideStadistics(){
        document.getElementById("stadistics").style.display = 'none';
    }
}