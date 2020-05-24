//-------------------------------
// CONNECT TO WEBSOCKET SERVER
//-------------------------------

let socket;
socket = io.connect('http://localhost:3000');

//-------------------------------
// FILL CARDS GRID WITH WORDS
//-------------------------------

const words = [
  {"name": "Acne", "team": "red"},
  {"name": "Acre", "team": "red"},
  {"name": "Addendum", "team": "neutral"},
  {"name": "Advertise", "team": "blue"},
  {"name": "Aircraft", "team": "blue"},
  {"name": "Aisle", "team": "bomb"},
  {"name": "Alligator", "team": "blue"},
  {"name": "Alphabetize", "team": "neutral"},
  {"name": "America", "team": "blue"},
  {"name": "Ankle", "team": "blue"},
  {"name": "Apathy", "team": "red"},
  {"name": "Applause", "team": "red"},
  {"name": "Applesauce", "team": "blue"},
  {"name": "Application", "team": "red"},
  {"name": "Archaeologist", "team": "blue"},
  {"name": "Aristocrat", "team": "neutral"},
  {"name": "Arm", "team": "neutral"},
  {"name": "Armada", "team": "blue"},
  {"name": "Asleep", "team": "red"},
  {"name": "Astronaut", "team": "neutral"},
  {"name": "Athlete", "team": "red"},
  {"name": "Atlantis", "team": "red"},
  {"name": "Aunt", "team": "blue"},
  {"name": "Avocado", "team": "neutral"},
  {"name": "Baby-Sitter", "team": "neutral"}
];

// inject words in cards

const cardsContainer = document.getElementById("cards");

words.forEach((word) => {
  cardsContainer.insertAdjacentHTML("beforeend", `<div class="card" data-word="${word.name}"><h2>${word.name}</h2></div>`);
})



//-------------------------------
// BUTTON TO SHOW SPY GRID
//-------------------------------

// TODO: when one client hits the spy grid button, other clients' button should be disabled OR 2 clients??? OR have a warning XXX clicked on the show spygrid button???

const showSpyGrid = () => {
  cardDivs.forEach((card, index) => {
    card.classList.add(`${words[index]["team"]}-text`);
  })
  const viewOutput = document.getElementById("view");
  viewOutput.innerHTML = "Spymaster's view";
}

const spyButton = document.getElementById("spymaster");
spyButton.addEventListener('click', showSpyGrid);


//-------------------------------
// CARD CLICK
//-------------------------------

// when card is clicked, tell websocket server about it, change color of card for each client and update score for each client


const triggerClickCard = () => {
  // detect clicked word
  const clickedWord = event.target.innerText;
  console.log(clickedWord);

  // send clicked word to websocket server

  let data = {
    word: clickedWord
  }
  socket.emit('trigger-click-card', data);
}

let redCount = 8;
let blueCount = 9;

const redCountOutput = document.getElementById("red-count");
const blueCountOutput = document.getElementById("blue-count");
const bombGiph = document.getElementById('giphy');

const updateWordsLeft = (team) => {
 if (team == "red") {
    redCount--
    redCountOutput.innerHTML = redCount;
  } else if (team == "blue") {
    blueCount--
    blueCountOutput.innerHTML = blueCount;
  }
}


const clickCard = (data) => {
  console.log("someone has clicked a card");
  console.log(data);

  const clickedCard = document.querySelector(`[data-word="${data.word}"]`);
  //console.log(clickedCard);

  const clickedInfo = words.find( info => info["name"] === data.word );

  clickedCard.classList.add(`clicked-${clickedInfo.team}`);

  if (clickedInfo.team == "bomb") {
    bombGiph.style.display = "inline";
  } else {
    updateWordsLeft(clickedInfo.team);
  }
}
socket.on('click-card', clickCard);


// add event listener on each card (listening for a click)

const cardDivs = document.querySelectorAll(".card");
// cardDivs is a NodeList object (similar to an array)

cardDivs.forEach((card, index) => {
  card.addEventListener('click', triggerClickCard);
})
