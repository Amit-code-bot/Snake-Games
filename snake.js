const board = document.querySelector('.border')
const StartButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const StartGamesModal = document.querySelector('.start-game')
const Restart = document.querySelector('.Restart-game')
const restartButton = document.querySelector('.btn-restart')
const highScoreElement = document.querySelector('#High-score')
const Score = document.querySelector('#score')
const Time = document.querySelector('#time')
const gameOverSound = new Audio('gameover.mp3')
const moveSound = new Audio('move.mp3')
const musicSound = new Audio('music.mp3')
const FoodSound = new Audio('food.mp3')

const blockHight = 50
const blockWidth = 50

let highscore = localStorage.getItem("highscore") || 0
let score = 0
let time = `00-00`

highScoreElement.innerText = highscore

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHight)
let interValID =  null
let TimeintervalID = null
let food = {x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
const blocks = []
let snake = [{
    x: 1, y: 3
}]
let direction = "down"
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div')
        block.classList.add('block')
        board.appendChild(block)
        blocks[`${row}-${col}`] = block
    }
}

function render(){
    
    let head = null
    blocks[`${food.x}-${food.y}`].classList.add("food")

  if(direction === 'left'){
    head = {x: snake[0].x, y: snake[0].y-1}
  }else if(direction === 'right'){
    head = {x: snake[0].x, y: snake[0].y+1}
  }else if(direction === 'down'){
    head = {x: snake[0].x + 1, y: snake[0].y}
  }else if(direction === 'up'){
    head = {x: snake[0].x - 1, y: snake[0].y}
  }

// well collision logic
 if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
    clearInterval(interValID)
    modal.style.display = 'flex'
    StartGamesModal.style.display = 'none'
    Restart.style.display = 'flex'
    gameOverSound.play()
    return;
  }

  // Food Consume logics //
  if(head.x == food.x && head.y==food.y){
     blocks[`${food.x}-${food.y}`].classList.remove("food")
     food = { 
       x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
     }
     blocks[`${food.x}-${food.y}`].classList.add("food")
     food
     snake.unshift(head)
     score += 10
     Score.innerText = score
     FoodSound.play()
     if(score>highscore){
      highscore = score
      localStorage.setItem("highscore", highscore.toString())
     }

  }

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
  })
    snake.unshift(head)
    snake.pop(snake)
  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill")
  })
}
render()

// interValID = setInterval(()=>{
//   render()
// },400);

StartButton.addEventListener('click',() =>{
 
  modal.style.display = 'none'
  interValID = setInterval(() => {render()}, 300)
  TimeintervalID = setInterval(()=>{
    let [min,sec] = time.split("-").map(Number)
    if(sec == 59){
      min+=1
      sec=0
    }else{
      sec+= 1
    }
    time = `${min}-${sec}`
    Time.innerHTML = time
  },1000)
})

restartButton.addEventListener("click",Restartgame)

function Restartgame(){
  musicSound.play()
   blocks[`${food.x}-${food.y}`].classList.remove("food")
   snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    musicSound.pause()
  })
   score = 0
    time = `00-00`
    Score.innerText = score
    Time.innerText = time
    highScoreElement.innerText = highscore
  direction = 'down'
  modal.style.display = 'none'
  snake = [{ x: 1, y: 3}]
  food = {x:Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
  interValID = setInterval(() => { render() }, 300)

}


addEventListener("keydown", (event) => {

  if (event.key == "ArrowUp"){
    direction = 'up'
     moveSound.play()
  }else if (event.key == "ArrowRight"){
    direction = 'right'
     moveSound.play()
  }else if (event.key == "ArrowLeft") {
    direction = "left"
     moveSound.play()
  }else if (event.key == "ArrowDown"){
    direction = "down"
     moveSound.play()
  }
})










