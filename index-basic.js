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
}

let MOVE_INTERVAL = 100;
function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
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

        speed:MOVE_INTERVAL,

    }
}

// Declaration variable
let snake1 = initSnake("blue");
// let snake_body_2 = initSnake("blue");


let snake1 = initSnake("purple");

let apples = [{
  
    color: "red",
    position: initPosition(),

}


// function drawLive(x) {
//     let scoreCtx = scoreCanvas.getContext("2d");
//     scoreCtx.fillStyle = color;
//     scoreCtx.fillRect(x * 120, 100, 30, 20);
// }
},
{
    color: "green",
    position: initPosition(),
}]

let obstacles = [{
    color: "yellow",
    position: initPosition(),
},
{
    color: "yellow",
    position: initPosition(),

},
{
    color: "yellow",
    position: initPosition(),

},
{
    color: "yellow",
    position: initPosition(),

},
{
    color: "yellow",
    position: initPosition(),

}]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

let lifeSnake = snake1.lifes;
function lifes(ctx, x, y) {
    let heart = document.getElementById("heart");
    scoreCanvas = document.getElementById("liveBoard");
    for(let i = 0; i < lifeSnake; i++) {
        ctx.drawImage(heart, 10 + x * i, y, CELL_SIZE, CELL_SIZE);
    }
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else {
        scoreCanvas = document.getElementById("score2Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");
    scoreCtx.fill = "red";
    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

//new line for show speed in canvas
function drawSpeed(snake) {
    let speedCanvas;
    if (snake.color == snake1.color) {
        speedCanvas = document.getElementById("speed2Board");
    }
    let speedCtx = speedCanvas.getContext("2d");
    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "30px Arial";
    speedCtx.fillStyle = snake.color
    speedCtx.fillText(snake.speed, 10, speedCanvas.scrollHeight / 2);
}


function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        const sameDirections = {
            [DIRECTION.LEFT]: DIRECTION.RIGHT,
            [DIRECTION.RIGHT]: DIRECTION.LEFT,
            [DIRECTION.DOWN]: DIRECTION.UP,
            [DIRECTION.UP]: DIRECTION.DOWN,
        }

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        if (snake1.direction == sameDirections[0]) {
            let img_snake1 = document.getElementById("snake_head_right");
            ctx.drawImage(img_snake1, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            for (let i = 1; i < snake1.body.length; i++) {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            }
        } else if (snake1.direction == sameDirections[1]) {
            let img_snake2 = document.getElementById("snake_head_left");
            ctx.drawImage(img_snake2, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            for (let i = 1; i < snake1.body.length; i++) {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            }
        } else if (snake1.direction == sameDirections[2]) {
            let img_snake3 = document.getElementById("snake_head_down");
            ctx.drawImage(img_snake3, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            for (let i = 1; i < snake1.body.length; i++) {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            }
        } else if (snake1.direction == sameDirections[3]) {
            let img_snake4 = document.getElementById("snake_head_up");
            ctx.drawImage(img_snake4, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            for (let i = 1; i < snake1.body.length; i++) {
                drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
            }
        }

        let img2 = document.getElementById("apple")
        ctx.drawImage(img2, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        drawScore(snake1);
        drawLive(30);
        // drawScore(snake2);

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }


        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];
            var img = document.getElementById("apel");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        for (let i = 0; i < obstacles.length; i++) {
            let obstacle = obstacles[i];
        drawCell(ctx, obstacle.position.x, obstacle.position.y, obstacle.color);
        }

        drawSpeed(snake1);
        drawScore(snake1);

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
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        if(snake.body.length % 2 == 0) {
            snake.body.push({x: snake.head.x, y: snake.head.y});
        } else {

function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;

            snake.body.push({x: snake.head.x, y: snake.head.y});
        }
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
  
    eat(snake, apples);

}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);

    eat(snake, apples);

}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
  
    eat(snake, apples);

}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);


    eat(snake, apples);
}

function obstacleCollison() {
    let isCollide = false;

    for (let i = 0; i < obstacles.length; i++){
        if (snake.head.x == obstacles.position.x && snake.head.y == obstacles.position.y){
            isCollide = true;
        }else if (snake.head.y == obstacles.position.y && snake.head.x == obstacles.position.x) {
            isCollide = true;
        }
    } 

}

function checkCollision(snakes) {
    let isCollide = false;

    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;


    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                    if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                        isCollide = true;

                }
            }
        }
    }

    if (isCollide) {
        alert("Game over");
        snake1 = initSnake("purple");
    

    if (isCollide) {
        var audio = new Audio();
        audio.src = "assets/assets_crash.mp3"
        audio.play();

        alert("Game over");
        snake1 = initSnake("purple");


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
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
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
    }

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
})

function initGame() {
    move(snake1);

}

initGame();