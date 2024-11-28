class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

canvas = document.getElementById("game");
  speed = 10;
  tileCount = 20;
  tileSize = canvas.width / tileCount - 2;
  headX = 10;
  headY = 10;
  snakeParts = [];
  tailLength = 2;
  appleX = 5;
  appleY = 5;
  inputsXVelocity = 0;
  inputsYVelocity = 0;
  xVelocity = 0;
  yVelocity = 0;
  score = 0;
  ctx = canvas.getContext("2d");

function update() {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;
  
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
      return;
    }
  
    clearScreen();
  
    checkAppleCollision();
    drawApple();
    drawSnake();
  
    drawScore();
  
    if (score > 5) {
      speed = 9;
    }
    if (score > 10) {
      speed = 11;
    }
  
    setTimeout(update, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0 || headX === tileCount ||
    headY < 0 || headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red"; 
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up, w
  if (event.keyCode == 38 || event.keyCode == 87) {
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down, s
  if (event.keyCode == 40 || event.keyCode == 83) {
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  // left, a
  if (event.keyCode == 37 || event.keyCode == 65) {
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right, d
  if (event.keyCode == 39 || event.keyCode == 68) {
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

update();