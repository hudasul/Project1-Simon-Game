let id;
let level = 1;
let buttonsElem;
let startBtn;
let quitBtn;
let message;
let lamp;

// used for hel player function
let helpMode = false;

// an array that has the ids of the player clicked buttons
let playerPattern = [];

// an array that has the ids of the computer clicked buttons
const ComputerPattern = [];

function init() {
  quitBtn = document.querySelector("#quit");
  startBtn = document.querySelector("#startBtn");
  message = document.querySelector("#message");
  buttonsElem = document.querySelectorAll(".button");
  lamp = document.querySelector("#help-lamp");

  lamp.classList.remove("hidden");
  message.style.marginLeft = "5px"
  helpMode = false;

  startBtn.addEventListener("click", startGame);
  startBtn.style.backgroundColor = "black";

  quitBtn.addEventListener("click", function () {
    init();
    quitBtn.style.backgroundColor = "grey";
    message.textContent = `You quited the game at level ${level}`;
    message.style.color = "white";
    startBtn.textContent = "Play Again";
    lamp.classList.add("hidden");
    message.style.marginLeft = "-30px"
    startBtn.disabled = false;
  });

  disableButtonClick();
}

function startGame() {
  lamp.classList.remove("hidden");
  message.style.marginLeft = "5px"
  startBtn.style.backgroundColor = "grey";
  quitBtn.style.backgroundColor = "black";

  buttonsElem.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });

  lamp.addEventListener("click", helpPlayer);

  ComputerPattern.length = 0;
  playerPattern.length = 0;
  level = 1;
  helpMode = false;

  message.textContent = `Level ${level}`;
  message.style.color = "white";
  startBtn.disabled = true;

  setTimeout(flashButton, 1000);
}

function creatRandomNumber() {
  id = Math.floor(Math.random() * 4);
  return id;
}

function flashButton() {
  id = creatRandomNumber();
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
    "/assets/yellow.mp3",
  ];
  const audio = new Audio(sounds[id]);
  audio.play();
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
      disableButtonClick();
      return false;
    }
  }
  return true;
}

function helpPlayer() {
  lamp.classList.add("hidden");
  message.style.marginLeft = "-25px"
  helpMode = true;
  updateHelpMessage();
}

function updateHelpMessage() {
  if (helpMode === false) {
    return;
  }

  const colors = ["Red", "Green", "Blue", "Yellow"];
  const index = playerPattern.length;

  if (index < ComputerPattern.length) {
    const nextColor = colors[ComputerPattern[index]];
    message.textContent = `Click ${nextColor}`;
    message.style.color = "white";
  }
}

function flashNextButton() {
  level++;
  message.textContent = `Level ${level}`;
  message.style.color = "green";
  playerPattern = [];

  setTimeout(flashButton, 1000);
}

function disableButtonClick() {
  buttonsElem.forEach(function (button) {
    button.removeEventListener("click", handleClick);
  });
}

function handleClick(event) {
  const clickedID = Number(event.target.id);
  makeSound(clickedID);
  changeColor(event.target);
  playerPattern.push(clickedID);

  if (checkPattern() === false) {
    message.textContent = `You lost at level ${level}!`;
    message.style.color = "red";
    startBtn.style.backgroundColor = "black";
    new Audio("/assets/wrong.mp3").play();
    lamp.classList.add("hidden");
    message.style.marginLeft = "-37px"
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";
    return;
  }

  if (helpMode === true) {
    updateHelpMessage();
  }

  if (
    checkPattern() === true &&
    playerPattern.length === ComputerPattern.length
  ) {
    helpMode = false;
    setTimeout(flashNextButton, 1000);
  }
}

// Load game when page opens
document.addEventListener("DOMContentLoaded", init);
