// étape 1 remplir la grille de mots
const words = [
  {"name": "Acne", "status": "red"},
  {"name": "Acre", "status": "red"},
  {"name": "Addendum", "status": "neutral"},
  {"name": "Advertise", "status": "blue"},
  {"name": "Aircraft", "status": "blue"},
  {"name": "Aisle", "status": "bomb"},
  {"name": "Alligator", "status": "blue"},
  {"name": "Alphabetize", "status": "neutral"},
  {"name": "America", "status": "blue"},
  {"name": "Ankle", "status": "blue"},
  {"name": "Apathy", "status": "red"},
  {"name": "Applause", "status": "red"},
  {"name": "Applesauce", "status": "blue"},
  {"name": "Application", "status": "red"},
  {"name": "Archaeologist", "status": "blue"},
  {"name": "Aristocrat", "status": "neutral"},
  {"name": "Arm", "status": "neutral"},
  {"name": "Armada", "status": "blue"},
  {"name": "Asleep", "status": "red"},
  {"name": "Astronaut", "status": "neutral"},
  {"name": "Athlete", "status": "red"},
  {"name": "Atlantis", "status": "red"},
  {"name": "Aunt", "status": "blue"},
  {"name": "Avocado", "status": "neutral"},
  {"name": "Baby-Sitter", "status": "neutral"}
];

// inject words in cells
const cellsDiv = document.querySelectorAll(".cell");
console.log(cellsDiv);

cellsDiv.forEach((cell, index) => {
  cell.innerHTML = `<h2>${words[index]["name"]}</h2>`
})

// show spy showSpyGrid
const showSpyGrid = () => {
  cellsDiv.forEach((cell, index) => {
    cell.classList.add(`${words[index]["status"]}-text`);
  })
  const viewOutput = document.getElementById("view");
  viewOutput.innerHTML = "Spymaster's view";
}


const spyButton = document.getElementById("spymaster");
spyButton.addEventListener('click', showSpyGrid);


// when cell is clicked, change color and update score
let redCount = 8;
let blueCount = 9;

const redCountOutput = document.getElementById("red-count");
const blueCountOutput = document.getElementById("blue-count");
const bombGiph = document.getElementById('giphy');

const coverCell = () => {
  // console.log(event);
  let clickedCell;
  if (event.target.tagName == "H2") {
    clickedCell = event.target.parentElement;
  } else {
    clickedCell = event.target;
  }
  const clickedWord = clickedCell.innerText;
  const clickedInfo = words.find( info => info["name"] === clickedWord );

  clickedCell.classList.add(`clicked-${clickedInfo.status}`);

  // Udpate words left
  if (clickedInfo.status == "bomb") {
    bombGiph.style.display = "inline";
  }
  else if (clickedInfo.status == "red") {
    redCount--
    redCountOutput.innerHTML = redCount;
  } else if (clickedInfo.status == "blue") {
    blueCount--
    blueCountOutput.innerHTML = blueCount;
  }
}

cellsDiv.forEach((cell, index) => {
  cell.addEventListener('click', coverCell);
})
