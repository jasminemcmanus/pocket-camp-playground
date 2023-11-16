/* global variables */

let gamePrompt = document.getElementById('game-prompt');
let endButtons = document.getElementById('end-buttons');
let refreshButtons = document.getElementById('refresh-buttons');

/* event listeners */

let startGameButton = document.getElementById('start');
startGameButton.addEventListener('click', startGame);

let endGameButtons = document.querySelectorAll('.end');
for (i of endGameButtons) {
  i.addEventListener('click', endGame);
}

let refreshGameButtons = document.querySelectorAll('.refresh');
for (i of refreshGameButtons) {
  i.addEventListener('click', refreshGame);
}

/* card handling functions */

function getCard(no) {

    let cardValue = Math.floor(Math.random()*10+1);

    let card = document.querySelector(`#card${no}`);
    card.innerText = cardValue
    
    return cardValue
}

function clearCard(no) {
    let card = document.querySelector(`#card${no}`);
    card.innerText = null
}

function compareCards(value1, value2) {
    if (value1 < value2) {
        return "higher"
    }
    else if (value1 > value2) {
        return "lower"
    }
    else return "equal"
    }

/* game part A */

function startGame() {
    getCard(1)
    gamePrompt.innerText = 'Do you think the next card will be higher or lower?'
    startGameButton.style.display = 'none'
    endButtons.style.display = 'inline-block'
}

/* game part B */

function endGame(event) {
    
    getCard(2)
    
    let prediction = event.target.innerText;
    
    let value1 = Number(document.querySelector('#card1').innerText);
    let value2 = Number(document.querySelector('#card2').innerText);

    let outcome = compareCards(value1, value2)

   if (outcome !== 'equal') {
        handlePrediction(prediction, outcome, value2)
   }
   else endGame(event)

    endButtons.style.display = 'none'
    refreshButtons.style.display = 'inline-block'
}

/* handle prediction */

function handlePrediction(prediction, outcome, value) {
    if (prediction === outcome) {
        gamePrompt.innerText = `It's ${value}! Way to guess!`
    }
    else gamePrompt.innerText = `It's... ${value}. I hate to say 'lose' but.... you lose.`
}

/* refresh game */

function refreshGame() {
    refreshButtons.style.display = 'none'
    startGameButton.style.display = 'inline-block'
    gamePrompt.innerText = `Let's play a game of high card, low card!`
    clearCard(1)
    clearCard(2)
}