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
function makeSound() {
  if (FlashedButtonID === 0) {
    const red = new Audio("/assets/red.mp3");
    red.play();
  } else if (FlashedButtonID === 1) {
    const green = new Audio("/assets/green.mp3");
    green.play();
  } else if (FlashedButtonID === 2) {
    const blue = new Audio("/assets/blue.mp3");
    blue.play();
  } else {
    const yellow = new Audio("/assets/yellow.mp3");
    yellow.play();
  }
  patternsMatch = checkPattern()
  console.log(patternsMatch)
  if(patternsMatch === false){
    const GameOver = new Audio("/assets/wrong.mp3");
    GameOver.play();
  }
  
}

function createRandomNum() {
  FlashedButtonID = Math.floor(Math.random() * 4);
  return FlashedButtonID;
}

function flashButton() {
  FlashedButtonID = createRandomNum();
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
  clickedButton = event.target.id;
  changeColor(event.target);
  playerPattern.push(Number(clickedButton));

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
