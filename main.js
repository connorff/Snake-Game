//canvas variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//snake variables
let snakeArr = [];
let snakeDim = [20, 20];
// 0 => no movement; 1 => left; 2 => up; 3 => right; 4 => down;
let direction = 0;
let apple = [];
let score = 0;

//other random variables
let fps = Math.floor(1000 /13);
let interval;

window.onload = () => {
    sizeCanvas();
    
    snakeArr.push([Math.floor(canvas.width / 40) * 20, Math.floor(canvas.height / 40) * 20])
    
    // for (let i = 0; i < 10; i++){
    //     snakeArr.push([snakeArr[0][0] + (10 * i), snakeArr[0][1]])
    // }

    render();
    interval = setInterval(render, fps);
    spawnApple();
}

function render() {
    //clears the canvas of all past drawing
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //draws the apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0], apple[1], snakeDim[0], snakeDim[1]);
    
    //for all of the snake array, it shifts the elements and draws them
    ctx.fillStyle = "green";
    
    //draws each block of the snake
    snakeArr.forEach((value) => {
        ctx.fillRect(value[0], value[1], snakeDim[0], snakeDim[1]);
    });
    
    for (let i = snakeArr.length - 1; i >= 0; i--){
        snakeArr[i] = (!i) ? getFirstElement(snakeArr[i]) : snakeArr[i - 1];
    }

    checkDead();

    //if the snake ate an apple
    if (snakeArr[0][1] === apple[1] && snakeArr[0][0] === apple[0]){
        snakeArr.push([snakeArr[0][0] + 10, snakeArr[0][1]])
        spawnApple();
        score++;
    }

    //draws the score
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(score, canvas.width / 2, 50);
}

function getFirstElement(element) {
    switch (direction) {
        case 1:
            return [element[0] - 20, element[1]];
        case 2:
            return [element[0], element[1] - 20];
        case 3:
            return [element[0] + 20, element[1]];
        case 4:
            return [element[0], element[1] + 20];
        default:
            return element;
    }
}

function checkDead() {
    //checks if the snake has hit the sides of the window
    if (snakeArr[0][0] + 20 <= 0 || snakeArr[0][0] + 20 >= canvas.width || snakeArr[0][1] + 20 <= 0 || snakeArr[0][1] >= canvas.height){
        clearInterval(interval)
        return false;
    }

    for (let i = 1; i < snakeArr.length; i++){
        if (snakeArr[i][0] == snakeArr[0][0] && snakeArr[i][1] == snakeArr[0][1])
            clearInterval(interval);
    }
}

function spawnApple() {
    apple = [Math.floor(Math.random() * canvas.width / 20) * 20, Math.floor(Math.random() * canvas.height / 20) * 20];
}

//sizes the canvas the correct way
function sizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    ctx.fillStyle = "black";
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);   
}

/*
    Window Events:
*/

//makes the canvas fill up the screen whenever the size changes
window.onresize = () => {sizeCanvas()}

//changes the direction based on the inputs by the user
window.onkeydown = (e) => {
    direction = e.keyCode - 36;
}