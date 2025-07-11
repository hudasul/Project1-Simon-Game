/*-------------------------------- Constants --------------------------------*/

const ComputerPattern = []
const playerPattern = []

/*---------------------------- Variables (state) ----------------------------*/
let FlashedButtonID 
let buttonsElem  
let clickedButton
let level = 0

/*------------------------ Cached Element References ------------------------*/
const message = document.querySelector("message")
/*-------------------------------- Functions --------------------------------*/
function init(){
  buttonsElem = document.querySelectorAll(".button") 
  flashButton()
  buttonsElem.forEach(button => {
    button.addEventListener("click", handleClick)
  })
}

function createRandomNum(){
  FlashedButtonID = Math.floor(Math.random() * 4)
  return FlashedButtonID
}

function flashButton(){
  FlashedButtonID = createRandomNum()
  buttonsElem.forEach(button => {
    if (Number(button.id) === FlashedButtonID) {
      ComputerPattern.push(button.id)
      console.log("computer = " + ComputerPattern)
      button.style.backgroundColor = "grey"
      setTimeout(() => {
        button.style.backgroundColor = ""
      }, 1000)
    }
  })
}

function handleClick(event) {
  console.log(event.target.id)
  clickedButton = event.target.id
  playerPattern.push(clickedButton)
  console.log("player " + playerPattern)
  if(clickedButton === FlashedButtonID){
    level++

  }
  flashButton()
  
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("DOMContentLoaded", init)
