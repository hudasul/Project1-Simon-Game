let level = 1;
let playerPattern = [];
let buttonsElem;
let startBtn;
let message;
let quitBtn
const ComputerPattern = [];

/*------------------------------- Functions --------------------------------*/


function init() {
  quitBtn = document.querySelector("#quit");
  startBtn = document.querySelector("#startBtn");
  quitBtn.classList.add("hidden")
  

  message = document.querySelector("#message");
  buttonsElem = document.querySelectorAll(".button");

 
  buttonsElem.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });

 
  startBtn.addEventListener("click", startGame);
  quitBtn.addEventListener("click", function(){
    init()
    message.textContent = `You have quited the game at level ${level}`
    message.style.color = "black"
    startBtn.textContent = "Play Again"
    startBtn.disabled = false
  });
}

function startGame() {
  
  ComputerPattern.length = 0;
  playerPattern = [];
  level = 1;

  quitBtn.disabled = true
  message.textContent = `Level ${level}`;
  message.style.color = "black"
  startBtn.disabled = true;
  quitBtn.classList.remove("hidden")
  quitBtn.disabled = false
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
  message.style.color = "green"
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
    startBtn.disabled = false
    startBtn.textContent = "Play Again"
    quitBtn.classList.add("hidden")   
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

