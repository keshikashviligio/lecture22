const gameBoard = document.getElementById('canvas');
const ctx = gameBoard.getContext('2d');

const moveSpeed = 3;
const squareSize = 50;
const targetSize = 20;

let squareX = 50;
let squareY = 100;
let targetX = 0;
let targetY = 0;

let dirUp = false;
let dirDown = false;
let dirRight = false;
let dirLeft = false;


function startGame() {
  moveTarget();
  draw();
  moveSquare();
  document.addEventListener('keydown', e => {
    const { code } = e;
    if(code === 'ArrowUp'){
      dirUp = true;
    }
    if(code === 'ArrowDown'){
      dirDown = true;
    }
    if(code === 'ArrowRight'){
      dirRight = true;
    }
    if(code === 'ArrowLeft'){
      dirLeft = true;
    }
  });
  document.addEventListener('keyup', e => {
    const { code } = e;
    if(code === 'ArrowUp'){
      dirUp = false;
    }
    if(code === 'ArrowDown'){
      dirDown = false;
    }
    if(code === 'ArrowRight'){
      dirRight = false;
    }
    if(code === 'ArrowLeft'){
      dirLeft = false;
    }
  });
}

startGame();

function draw() {
  resetCanvas();
  ctx.fillStyle = 'red';
  ctx.fillRect(squareX, squareY, squareSize, squareSize);

  ctx.fillStyle = 'green';
  ctx.fillRect(targetX, targetY, targetSize, targetSize);
}

function moveSquare() {
  if(dirUp){
    squareY -= moveSpeed;
  }
  if(dirDown){
    squareY += moveSpeed;
  }
  if(dirLeft){
    squareX -= moveSpeed;
  }
  if(dirRight){
    squareX += moveSpeed;
  }
  if(squareX + squareSize > gameBoard.width){
    squareX = gameBoard.width - squareSize;
  }
  if(squareY + squareSize > gameBoard.height){
    squareY = gameBoard.height - squareSize;
  }
  squareX = Math.max(0, squareX);
  squareY = Math.max(0, squareY);
  if(isEaten()){
    moveTarget();
  }
  draw();
  requestAnimationFrame(moveSquare);
}

function moveTarget() {
  const { x, y } = getTargetRandomXY();
  targetX = x;
  targetY = y;
}

function getTargetRandomXY() {
  const x = Math.floor(Math.random() * (gameBoard.width - targetSize));
  const y = Math.floor(Math.random() * (gameBoard.height - targetSize));

  return {
    x,
    y,
  }
}

function resetCanvas() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

function isEaten(){
  const squareRight = squareX + squareSize;
  const squareBottom = squareY + squareSize;
  const targetRight = targetX + targetSize;
  const targetBottom = targetY + targetSize;

  const caseY = squareBottom > targetBottom && squareY < targetY;
  const caseX = squareRight > targetRight && squareX < targetX;
  return caseY && caseX;
}
