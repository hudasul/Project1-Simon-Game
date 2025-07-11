/*-------------------------------- Constants --------------------------------*/
const ComputerPattern = [];

/*---------------------------- Variables (state) ----------------------------*/
let level = 1;
let playerPattern = [];
let buttonsElem;
let message;

/*------------------------ Cached Element References ------------------------*/
function init() {
  message = document.querySelector("#message");
  buttonsElem = document.querySelectorAll(".button");

  setTimeout(() => {
    flashButton();
  }, 1000);

  buttonsElem.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}

/*-------------------------------- Functions --------------------------------*/
function createRandomNum() {
  return Math.floor(Math.random() * 4);
}

function makeSound(id) {
  const sounds = [
    "/assets/red.mp3",
    "/assets/green.mp3",
    "/assets/blue.mp3",
    "/assets/yellow.mp3"
  ];
  const colorAudio = new Audio(sounds[id]);
  colorAudio.play();
}

function flashButton() {
  const id = createRandomNum();
  ComputerPattern.push(id);
  makeSound(id);

  buttonsElem.forEach((button) => {
    if (Number(button.id) === id) {
      changeColor(button);
    }
  });
}

function changeColor(button) {
  button.style.backgroundColor = "grey";
  setTimeout(() => {
    button.style.backgroundColor = "";
  }, 1000);
}

function checkPattern() {
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== ComputerPattern[i]) {
      return false;
    }
  }
  return true;
}

function flashNextButton() {
  if (playerPattern.length === ComputerPattern.length) {
    if (checkPattern()) {
      level++;
      message.textContent = `Level ${level}`;
      playerPattern = [];
      setTimeout(() => {
        flashButton();
      }, 1000);
    } else {
      message.textContent = `You lost at level ${level}!`;
      const gameOverSound = new Audio("/assets/wrong.mp3");
      gameOverSound.play();
    }
  }
}

function handleClick(event) {
  const clickedID = Number(event.target.id);
  makeSound(clickedID);
  changeColor(event.target);
  playerPattern.push(clickedID);

  if (!checkPattern()) {
    message.textContent = `You lost at level ${level}!`
    const gameOver= new Audio("/assets/wrong.mp3")
    gameOver.play();
    return;
  }

  if (playerPattern.length === ComputerPattern.length) {
    setTimeout(() => {
      flashNextButton();
    }, 1000);
  }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", init);
