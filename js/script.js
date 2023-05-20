const username = document.getElementById('name')
const button = document.getElementById('button')

button.addEventListener('click', (e) => {
    e.preventDefault()
    const info = {
        username: username.value
    }
})


class Game {
    constructor(){
        this.GameStart = false;
        this.cardOne = null;
        this.cardTwo = null;

    }
}

document.addEventListener("DOMContentLoaded", () =>{

    const cards = document.querySelectorAll("figure");
    cards.forEach(card => {
        card.addEventListener("click", SelectCard);
        
    });
    new Game();
});