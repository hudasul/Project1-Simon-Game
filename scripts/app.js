let id
let level = 1
let buttonsElem
let startBtn
let quitBtn
let message
let playerPattern = []

const ComputerPattern = []


function init() {
  quitBtn = document.querySelector("#quit")
  startBtn = document.querySelector("#startBtn")
  message = document.querySelector("#message")
  buttonsElem = document.querySelectorAll(".button")

  startBtn.addEventListener("click", startGame)
  startBtn.style.backgroundColor = "black"

  quitBtn.addEventListener("click", function () {
    init()
    quitBtn.style.backgroundColor = "grey"
    message.textContent = `You have quited the game at level ${level}`
    message.style.color = "white"
    startBtn.textContent = "Play Again"
    startBtn.disabled = false
  })

  disableButtonClick()
}

function startGame() {
  startBtn.style.backgroundColor = "grey"
  quitBtn.style.backgroundColor = "black"
  buttonsElem.forEach(function (button) {
    button.addEventListener("click", handleClick)
  })

  ComputerPattern.length = 0
  playerPattern = []
  level = 1

  message.textContent = `Level ${level}`
  message.style.color = "white"
  startBtn.disabled = true
  setTimeout(function () {
    flashButton();
  }, 1000);
}

function creatRandomNumber() {
  id = Math.floor(Math.random() * 4)
  console.log(id)
  return id
}

function flashButton() {
  id = creatRandomNumber()
  ComputerPattern.push(id)
  makeSound(id)

  buttonsElem.forEach(function (button) {
    if (Number(button.id) === id) {
      changeColor(button)
    }
  });
}

function makeSound(id) {
  const sounds = [
    "/assets/red.mp3",
    "/assets/green.mp3",
    "/assets/blue.mp3",
    "/assets/yellow.mp3",
  ]
  const audio = new Audio(sounds[id])
  audio.play()
}

function changeColor(button) {
  button.style.backgroundColor = "grey"
  setTimeout(function () {
    button.style.backgroundColor = ""
  }, 500)
}

function checkPattern() {
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== ComputerPattern[i]) {
      disableButtonClick()
      return false
    }
  }
  return true
}

function flashNextButton() {
  level++;
  message.textContent = `Level ${level}`
  message.style.color = "green"
  playerPattern = []
  setTimeout(function () {
    flashButton()
  }, 1000)
}

function disableButtonClick() {
  buttonsElem.forEach(function (button) {
    button.removeEventListener("click", handleClick)
  })
}

function handleClick(event) {
  const clickedID = Number(event.target.id)
  makeSound(clickedID)
  changeColor(event.target)
  playerPattern.push(clickedID)

  if (checkPattern() === false) {
    message.textContent = `You lost at level ${level}!`
    message.style.color = "red"
    startBtn.style.backgroundColor = "black"
    const gameOver = new Audio("/assets/wrong.mp3")
    gameOver.play()
    startBtn.disabled = false
    startBtn.textContent = "Play Again"
  }

  if  (checkPattern() === true && playerPattern.length === ComputerPattern.length) {
    setTimeout(function () {
      flashNextButton()
    }, 1000)
  }
}

document.addEventListener("DOMContentLoaded", init)
