class Game {
    constructor(){
        this.GameStart = false;
        this.cardOne = null;
        this.cardTwo = null;
        this.availableCards = [1, 2, 3, 4, 5, 6, 7, 8];
        this.order = [];
        this.cards = Array.from(document.querySelectorAll('.game-container figure'));
        this.game();
    }

    game() {
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

    selectedCard(e){
        const clickedCard = e.target;
        if(this.GameStart && !clickedCard.classList.contains("selected")){
            clickedCard.classList.add("selected");
        }
    }
}

let minutes = 180;
const timeH = document.getElementById("Timer");
displayTime(minutes);

const countDown = setInterval(() => {
    minutes--;
  displayTime(minutes);
  if (minutes == 0 || minutes < 1) {
    endCount();
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

function endCount() {
    timeH.innerHTML = "Time out";
}




document.addEventListener("DOMContentLoaded", () =>{

    /*function flipCard(){
        this.classList.add("selected");
    }
    const cards = document.querySelectorAll("figure");
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    })*/

    new Game();
});