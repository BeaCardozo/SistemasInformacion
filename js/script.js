class Game {
    constructor(){
        this.GameStart = false;
        this.cardOne = null;
        this.cardTwo = null;

        this.availableCards = [1, 2, 3, 4, 5, 7, 8];
        this.order = [];

        this.cards = Array.from(document.querySelectorAll('.game-container figure'));

        this.game();
    }

    game() {
        this.setNewOrder();
    }

    setNewOrder(){
        this.order = this.availableCards.concat(this.availableCards);
        this.order.sort(() => math.random() - 0.5);
    }
}



document.addEventListener("DOMContentLoaded", () =>{

    function SelectCard() {
        this.classList.add("selected")
    }

    const cards = document.querySelectorAll("figure");
    cards.forEach(card => {
        card.addEventListener("click", SelectCard);
        
    });
    new Game();
});