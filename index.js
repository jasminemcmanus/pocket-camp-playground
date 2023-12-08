/* global variables */

let gamePrompt = document.getElementById('game-prompt');
let nameTag = document.getElementById('name-tag');


let endButtons = document.getElementById('end-buttons');
let refreshButtons = document.getElementById('refresh-buttons');
let startButtons = document.getElementById('start-buttons');
const buttonGroup = [endButtons, refreshButtons, startButtons]

let villagerPhoto = document.getElementById('villager-photo')
let villagerName = document.getElementById('villager-name')

const villager = {
    name : '',
    url : '',
    phrase : '',
    colour1 : '',
    colour2 : ''
}

let speed = 35;

/* type effect test */

function typeEffect(element, speed) {
	let text = element.innerHTML;
	element.innerHTML = "";
	
	let i = 0;
	let timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

typeEffect(gamePrompt, speed)

/* get ACNH villager from API */

function getVillager() {
  
    const key = config.ACNH_API_KEY;
    let index = Math.floor(Math.random() * 488 );
  
      fetch(`https://api.nookipedia.com/villagers`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": key,
          "Accept-Version" : "1.6.0"
        }})
        .then(function(response) {
          return response.json();
      })
  
      .then(function(data) {
        villager.name = data[index].name
        villager.url = data[index].image_url
        villager.phrase = data[index].phrase
        villager.colour1 = data[index].text_color
        villager.colour2 = data[index].title_color
        updateApp()
      })
    }

function updateApp() {
    villagerPhoto.src = villager.url  
    villagerName.innerText = villager.name
    villagerName.style.color = `#${villager.colour1}`
    handleDialogue(`${villager.name} wants to play high card, low card!`, startButtons)
    nameTag.style.backgroundColor = `#${villager.colour2}`
    nameTag.style.display = 'block'
}

function clearApp() {
    villagerPhoto.src = './assets/ACNH-villager.png'
    villagerName.innerText = null
    handleDialogue(`Waiting for a villager to arrive . . .`, null)
    nameTag.style.display = 'none'
    clearCard(1)
    clearCard(2)
}
getVillager()

/* handle buttons */

let btns = document.querySelectorAll('button')
for (i of btns) {
    i.addEventListener('click', handleClick);
}

function handleClick(event) {
    let functionName = event.target.id;
    switch (functionName) {
        case "start-game": startGame(); break;
        case "higher": endGame("higher"); break;
        case "lower": endGame("lower"); break;
        case "new-game": newGame(); break;
        case "refresh-game": refreshGame(); break;
    }
}

/* button display functions */

function displayButtons(array, type) {
    for (element of array) {
        if (element === type) {
            element.style.display = 'inline-block'
        } else element.style.display = 'none'
    }
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
    handleDialogue(`Do you think the next card will be higher or lower, ${villager.phrase}?`, endButtons)
}

function newGame() {
    clearCard(1)
    clearCard(2)
    startGame()
}

/* game part B */

function endGame(prediction) {

    getCard(2)
    
    let card1 = Number(document.querySelector('#card1').innerText);
    let card2 = Number(document.querySelector('#card2').innerText);

    let outcome = compareCards(card1, card2)

   if (outcome !== 'equal') {
        handlePrediction(prediction, outcome, card2)
   } else endGame(prediction)
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
    clearApp()
    getVillager()
}

/* randomise dialogue */

function getRandomDialogue(array) {

    let max = array.length - 1;
    let index = Math.floor(Math.random() * max );

    gamePrompt.innerText = array[index]
    handleDialogue(array[index], refreshButtons)
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
        `Oooh! ${number}! That's too bad, ${villager.phrase}.`,
        `Oooh! ${number}! That's a shame. You didn't get it, ${villager.phrase}.`,
        `Oh no! It's a ${number}! That's too bad, you guessed wrong.`,
        `HERE WE GO! IT'S A.... It's a ${number}. That's too bad, ${villager.phrase}.`
    ]
    
    return getRandomDialogue(loseDialogue);
}

/* updating dialogue box */

function handleDialogue(text, button) {
    gamePrompt.innerText = text
    displayButtons(buttonGroup)
    let delay = gamePrompt.innerText.length * speed + speed;
    typeEffect(gamePrompt, speed)
    setTimeout(() => {displayButtons(buttonGroup, button)}, delay)
}