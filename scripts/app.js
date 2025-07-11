/*-------------------------------- Constants --------------------------------*/
const ComputerPattern = [];

/*---------------------------- Variables (state) ----------------------------*/
let FlashedButtonID;
let buttonsElem;
let clickedButton;
let level = 1;
let message;
let playerPattern = [];
let patternMatch;

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function init() {
  message = document.querySelector("#message");
  buttonsElem = document.querySelectorAll(".button");

  setTimeout(() => {
        flashButton()
      }, 2000);
  

  buttonsElem.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
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
      button.style.backgroundColor = "grey";
      setTimeout(() => {
        button.style.backgroundColor = "";
      }, 1000);
    }
  });
}

function checkPattern() {
  console.log(ComputerPattern);
  console.log(playerPattern);
  for (let i = 0; i < playerPattern; i++) {
    if (playerPattern[i] === Number(ComputerPattern[i])) {
      message.textContent = "Level " + level;
      playerPattern = [];
      return (patternMatch = true);
    } else {
      message.textContent = `You lost at level ${level}!`;
      return (patternMatch = false);
    }
  }
}

function handleClick(event) {
  clickedButton = event.target.id;
  playerPattern.push(Number(clickedButton));
  checkPattern();
  console.log(patternMatch);
  if (patternMatch === true) {
    flashButton();
  } else {
    return;
  }
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", init);
