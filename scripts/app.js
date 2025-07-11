let level = 1;
let playerPattern = [];
let buttonsElem;
let startBtn;
let message;

const ComputerPattern = [];

/*------------------------------- Functions --------------------------------*/
function init() {
 
  startBtn = document.querySelector("#startBtn");
  message = document.querySelector("#message");
  buttonsElem = document.querySelectorAll(".button");

 
  buttonsElem.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });

 
  startBtn.addEventListener("click", startGame);
}

function startGame() {
  ComputerPattern.length = 0;
  playerPattern = [];
  level = 1;
  message.textContent = `Level ${level}`;
  startBtn.disabled = true;

  setTimeout(function () {
    flashButton();
  }, 1000);
}

function flashButton() {
  const id = Math.floor(Math.random() * 4);
  ComputerPattern.push(id);
  makeSound(id);

  buttonsElem.forEach(function (button) {
    if (Number(button.id) === id) {
      changeColor(button);
    }
  });
}

function makeSound(id) {
  const sounds = [
    "/assets/red.mp3",
    "/assets/green.mp3",
    "/assets/blue.mp3",
    "/assets/yellow.mp3"
  ];
  const audio = new Audio(sounds[id]);
  audio.play()
}

function changeColor(button) {
  button.style.backgroundColor = "grey";
  setTimeout(function () {
    button.style.backgroundColor = "";
  }, 500);
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
  level++;
  message.textContent = `Level ${level}`;
  playerPattern = [];
  setTimeout(function () {
    flashButton();
  }, 1000);
}

function handleClick(event) {
  const clickedID = Number(event.target.id);
  makeSound(clickedID);
  changeColor(event.target);
  playerPattern.push(clickedID);

  if (checkPattern() === false) {
    message.textContent = `You lost at level ${level}!`;
    message.style.color = "red" 
    const gameOver = new Audio("/assets/wrong.mp3");
    gameOver.play();
    startBtn.disabled = false;
    return;
  }

  if (playerPattern.length === ComputerPattern.length) {
    setTimeout(function () {
      flashNextButton();
    }, 1000);
  }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", init)
