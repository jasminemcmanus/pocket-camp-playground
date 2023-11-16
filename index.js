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
    
    let card1 = Number(document.querySelector('#card1').innerText);
    let card2 = Number(document.querySelector('#card2').innerText);

    console.log(card1)
    console.log(card2)

    let outcome = compareCards(card1, card2)

   if (outcome !== 'equal') {
        handlePrediction(prediction, outcome, card2)
   } else endGame(event)

   endButtons.style.display = 'none'
   refreshButtons.style.display = 'inline-block'

}

/* handle prediction */

function handlePrediction(prediction, outcome, number) {
    if (prediction === outcome) {
        handleWin(number)
    }
    else handleLoss(number)
}

/* refresh game */

function refreshGame() {
    refreshButtons.style.display = 'none'
    startGameButton.style.display = 'inline-block'
    gamePrompt.innerText = `Let's play a game of high card, low card!`
    clearCard(1)
    clearCard(2)
}

/* randomise dialogue */

function getRandomDialogue(array) {

    let max = array.length - 1;
    let index = Math.floor(Math.random() * max );

    gamePrompt.innerText = array[index]

    return gamePrompt.innerText
}

function handleWin(number) {

    const winDialogue = [
        `It's ${number}! Way to guess!`,
        `It's ${number}! You got it!`,
        `WOW! ${number}! WAY TO GUESS!`,
        `You nailed it! It's ${number}!`,
        `IT'S ${number}! YAY! CONGRATS!`,
        `${number}! You guessed right!`
    ]
    
    return getRandomDialogue(winDialogue);
}

function handleLoss(number) {

    const loseDialogue = [
        `It's... ${number}. I hate to say 'lose' but.... you lose.`,
        `It's... ${number}. But don't let one tiny loss discourage you. There's always next time!`,
        `Oooh! ${number}! That's too bad.`,
        `Oooh! ${number}! That's a shame. You didn't get it.`,
        `Oh no! It's a ${number}! That's too bad, you guessed wrong.`,
        `HERE WE GO! IT'S A.... It's a ${number}. That's too bad.`
    ]
    
    return getRandomDialogue(loseDialogue);
}
