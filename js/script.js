    let totalTiming = 5;
    const timerTitle = document.getElementById("Timer");
    displayTime(totalTiming);

    const countDown = setInterval(() => {
        totalTiming--;
    displayTime(totalTiming);
    if (totalTiming == 0 || totalTiming < 1) {
        endCount();
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
        //window.location.href = "./stadistics.html"
        swal({title: "¡Perdiste!", text: "Se acabo el tiempo. Puntaje Obtenido: 0"});
    }


class Game {
    constructor(){
        this.GameStart = false;
        this.cardOne = null;
        this.cardTwo = null;
        this.availableCards = [1, 2, 3, 4, 5, 6, 7, 8];
        this.order = [];
        this.maxPairNumber = this.availableCards.length;
        this.cards = Array.from(document.querySelectorAll('.game-container figure'));
        this.game();
    }

    

    game() {
        this.foundPairs = 0;
        this.userPoints = 0;
        this.setNewOrder();
        this.setImages();
        this.openCards();
    }

    setNewOrder(){
        this.order = this.availableCards.concat(this.availableCards);
        this.order.sort(() => Math.random() - 0.5);
    }

    setImages(){
        for (const key in this.cards) {
           const card = this.cards[key];
           const img = this.order[key];
           const imgFile = card.children[1].children[0];
           card.dataset.image = img;
           imgFile.src = `images/${img}.png`;
        }
    }

    openCards(){
        this.cards.forEach(card => card.classList.add("selected"));
        setTimeout(() => {
            this.closeCards();
        }, 1000);
    }

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

    selectedCard(e){
        const clickedCard = e.target;
        if (this.GameStart && !clickedCard.classList.contains("selected")) {
            clickedCard.classList.add("selected");
            this.checkPair(clickedCard.dataset.image);
        }
    }

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

    resetCards(){
        const OpenedCardCurr = document.querySelector(`.game-container figure.selected[data-image ='${this.cardOne}']`);
        const OpenedCardCurr2 = document.querySelector(`.game-container figure.selected[data-image ='${this.cardTwo}']`);
        OpenedCardCurr.classList.remove("selected");
        OpenedCardCurr2.classList.remove("selected");
        this.cardOne = null;
        this.cardTwo = null;
        this.GameStart = true;
    }

    checkIfWon(){
        this.foundPairs++;
        this.userPoints += 10;
        this.cardOne = null;
        this.cardTwo = null;
        this.GameStart = true;
        if (this.maxPairNumber == this.foundPairs) {
            const finalPoints = this.userPoints*(second/minutes);
            swal({title: "¡Ganaste!", text: "Puntaje Obtenido: " + finalPoints});
            //window.location.href = "./stadistics.html";
        }
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    new Game();
});