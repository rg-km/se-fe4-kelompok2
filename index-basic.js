const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 100;
const life = 22;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    level: 1,
    speed: MOVE_INTERVAL,
  };
}

let snake1 = initSnake("#DBDBDB");

let apples = [{
  
    color: "red",
    position: initPosition(),
},
{
    color: "green",
    position: initPosition(),
}]

let totalLife = 3;

function clearScreen(ctx) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawCell(ctx, x, y, snakeId) {
  let img = document.getElementById(snakeId);
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(ctx, snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-left");
      break;
    case DIRECTION.RIGHT:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-right");
      break;
    case DIRECTION.DOWN:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-down");
      break;
    case DIRECTION.UP:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-up");
      break;
  }

  for (let i = 1; i < snake.body.length; i++) {
    let part = snake.body[i];
    drawCell(ctx, part.x, part.y, "snake-body");
  }
}

function drawApple(ctx, apple) {
  let img = document.getElementById("apel");

  ctx.drawImage(
    img,
    apple.position.x * CELL_SIZE,
    apple.position.y * CELL_SIZE,
    CELL_SIZE + 10,
    CELL_SIZE
  );
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } 
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = "black";
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawSpeed(snake) {
    let speedCanvas;
    if (snake.color == snake1.color) {
        speedCanvas = document.getElementById("speed2Board");
    }
    let speedCtx = speedCanvas.getContext("2d");
    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "30px Arial";
    speedCtx.fillStyle = "black"
    speedCtx.fillText(snake.speed, 10, speedCanvas.scrollHeight / 2);
}

function drawLife(ctx, totalLife) {
    let img = document.getElementById("heart");
    let space = CELL_SIZE;
    for (let i = 0; i < totalLife; i++) {
      ctx.drawImage(img, space, CELL_SIZE, CELL_SIZE, CELL_SIZE);
      space = space + life;
    }
}

function drawLevel(snake) {
    let levelCanvas;
    if (snake.color == snake1.color) {
        levelCanvas = document.getElementById("level");
    }
    let levelCtx = levelCanvas.getContext("2d");
    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fill = "black";
    levelCtx.fillText(snake.level, 10, levelCanvas.scrollHeight / 2);
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    clearScreen(ctx);

    drawSnake(ctx, snake1);

    drawApple(ctx, apples[0]);

    drawApple(ctx, apples[1]);

    drawLife(ctx, totalLife);
    drawLevel(snake1); 
    drawScore(snake1); 
    drawSpeed(snake1); 
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function eat(snake, apple) {
  let eatApple = new Audio("assets/eat-apple.wav");
  let levelUp = new Audio("assets/ding.mp3");
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    
    if (snake.body.x != apple.position.x && snake.body.y != apple.position.y) {
      apple.position = initPosition();
    }

    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    eatApple.play(); 

    
    if (snake.score != 0 && snake.score % 5 == 0) {
      if (snake.level == 5) {
        snake.level;
      } else {
        levelUp.play();
        snake.level++;
      }
      snake.speed -= 5;
    }
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apples[0]);
  eat(snake, apples[1]);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apples[0]);
  eat(snake, apples[1]);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apples[0]);
  eat(snake, apples[1]);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apples[0]);
  eat(snake, apples[1]);
}

function checkCollision(snakes) {
  let isCollide = false;
  let gameOver = new Audio("assets/dwgame-over.wav");

  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;
        }
      }
    }
  }

  if (isCollide) {
    if (totalLife == 0) {
      gameOver.play();
      alert("Game over");
      
      snake1 = initSnake("#DBDBDB");   
      totalLife = 3;  
    } else {
      totalLife -= 1;
      snake1 = initSnake("#DBDBDB"); 
    }
    
  }

  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, snake.speed);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
