let id
let level = 1
let buttonsElem
let startBtn
let quitBtn
let message
let lamp
let hasShownIntro = false

let helpMode = false
let playerPattern = []
const computerPattern = []

function init() {
  quitBtn = document.querySelector("#quit")
  startBtn = document.querySelector("#startBtn")
  message = document.querySelector("#message")
  buttonsElem = document.querySelectorAll(".button")
  lamp = document.querySelector("#help-lamp")

  const startMessageDiv = document.querySelector("#startMessage")
  const okBtn = document.querySelector("#okBtn")

  if (!hasShownIntro) {
    setTimeout(() => {
      startMessageDiv.style.display = "block"
      hasShownIntro = true
    }, 1000)
  }

  okBtn.addEventListener("click", () => {
    startMessageDiv.style.display = "none"
  })

  lamp.classList.remove("hidden")
  message.style.marginLeft = "5px"
  helpMode = false

  startBtn.addEventListener("click", startGame)
  startBtn.style.backgroundColor = "black"

  quitBtn.addEventListener("click", function () {
    quitBtn.style.backgroundColor = "grey"
    message.textContent = `You quit the game at level ${level}`
    message.style.color = "white"
    startBtn.textContent = "Play Again"
    lamp.classList.add("hidden")
    message.style.marginLeft = "-30px"
    startBtn.disabled = false
    disableButtonClick()
  })

  disableButtonClick()
}

function startGame() {
  lamp.classList.remove("hidden")
  message.style.marginLeft = "5px"
  startBtn.style.backgroundColor = "grey"
  quitBtn.style.backgroundColor = "black"

  buttonsElem.forEach(button => {
    button.addEventListener("click", handleClick)
  })

  lamp.addEventListener("click", helpPlayer)

  computerPattern.length = 0
  playerPattern.length = 0
  level = 1
  helpMode = false

  message.textContent = `Level ${level}`
  message.style.color = "white"
  startBtn.disabled = true

  setTimeout(flashButton, 1000)
}

function createRandomNumber() {
  id = Math.floor(Math.random() * 4)
  return id
}

function flashButton() {
  id = createRandomNumber()
  computerPattern.push(id)
  makeSound(id)

  buttonsElem.forEach(button => {
    if (Number(button.id) === id) {
      changeColor(button)
    }
  })
}

function makeSound(id) {
  const sounds = [
    "assets/red.mp3",
    "assets/green.mp3",
    "assets/blue.mp3",
    "assets/yellow.mp3"
  ]
  const audio = new Audio(sounds[id])
  audio.play()
}

function changeColor(button) {
  button.style.backgroundColor = "grey"
  setTimeout(() => {
    button.style.backgroundColor = ""
  }, 500)
}

function checkPattern() {
  for (let i = 0; i < playerPattern.length; i++) {
    if (playerPattern[i] !== computerPattern[i]) {
      disableButtonClick()
      return false
    }
  }
  return true
}

function helpPlayer() {
  lamp.classList.add("hidden")
  message.style.marginLeft = "-25px"
  helpMode = true
  updateHelpMessage()
}

function updateHelpMessage() {
  if (!helpMode) return

  const colors = ["Red", "Green", "Blue", "Yellow"]
  const index = playerPattern.length

  if (index < computerPattern.length) {
    const nextColor = colors[computerPattern[index]]
    message.textContent = `Click ${nextColor}`
    message.style.color = "white"
  }
}

function flashNextButton() {
  level++
  message.textContent = `Level ${level}`
  message.style.color = "green"
  playerPattern = []

  setTimeout(flashButton, 1000)
}

function disableButtonClick() {
  buttonsElem.forEach(button => {
    button.removeEventListener("click", handleClick)
  })
}

function handleClick(event) {
  const clickedID = Number(event.target.id)
  makeSound(clickedID)
  changeColor(event.target)
  playerPattern.push(clickedID)

  if (!checkPattern()) {
    message.textContent = `You lost at level ${level}!`
    message.style.color = "red"
    startBtn.style.backgroundColor = "black"
    new Audio("assets/wrong.mp3").play()
    lamp.classList.add("hidden")
    message.style.marginLeft = "-37px"
    startBtn.disabled = false
    startBtn.textContent = "Play Again"
    return
  }

  if (helpMode) updateHelpMessage()

  if (checkPattern() && playerPattern.length === computerPattern.length) {
    helpMode = false
    setTimeout(flashNextButton, 1000)
  }
}

document.addEventListener("DOMContentLoaded", init)
