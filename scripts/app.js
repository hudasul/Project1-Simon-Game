/*-------------------------------- Constants --------------------------------*/
const ComputerPattern = [];

/*---------------------------- Variables (state) ----------------------------*/
let FlashedButtonID;
let buttonsElem;
let clickedButton;
let level = 1;
let message;
let playerPattern = [];
let patternsMatch

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
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


function createRandomNum() {
  FlashedButtonID = Math.floor(Math.random() * 4);
  return FlashedButtonID;
}

function makeSound() {
   const sounds = [
    "/assets/red.mp3",
    "/assets/green.mp3",
    "/assets/blue.mp3",
    "/assets/yellow.mp3"
  ];
  const audio = new Audio(sounds[id]);
  audio.play();
}

function flashButton() {
  FlashedButtonID = createRandomNum();
  makeSound()
  console.log(FlashedButtonID);
  buttonsElem.forEach((button) => {
    if (Number(button.id) === FlashedButtonID) {
      ComputerPattern.push(button.id);
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

function flashNextButton() {
  if (playerPattern.length === ComputerPattern.length) {
    const patternMatch = checkPattern();
    if (patternMatch) {
      level++;
      message.textContent = `Level ${level}`;
      playerPattern = [];
      setTimeout(() => {
        flashButton();
      }, 1000);
      console.log(ComputerPattern);
      console.log(playerPattern);
    } else {
      message.textContent = `You lost at level ${level}!`;
    }
  }
}

function checkPattern() {
  console.log(ComputerPattern);
  console.log(playerPattern);
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== Number(ComputerPattern[i])) {
      return false;
    }
  }
  return true;
}

function handleClick(event) {
  FlashedButtonID = event.target.id;
  makeSound()
  changeColor(event.target);
  playerPattern.push(Number(FlashedButtonID));

  const patternMatch = checkPattern();
  console.log(patternMatch);

  if (patternMatch === false) {
    message.textContent = `You lost at level ${level}!`;
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
