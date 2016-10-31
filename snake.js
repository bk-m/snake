var can = $("#can");
var W = $("#can").width();
var H = $("#can").height();
var scl = 40;
var cols = W / scl;
var rows = H / scl;
var dire = 1;
var timer;
var timerOn = 0;
var score = 0;
var points = 10;
var snake = [];
var coords = [];
var snakeCounter = 0;
//var hit = 0;
$("#score").val("0");

function spawn() {
//    var player = document.createElement("div");
//    player.setAttribute("id", "player");
//    can.append(player);
    can.append("<div id='food'></div>");
    var P = $("#food");
    var spawnX = (W - scl) / scl;
    var spawnY = (H - scl) / scl;
    var x = rngRange(0, spawnX);
    var y = rngRange(0, spawnY);
    P.css("background-color", "orange");
    P.css("width", scl);
    P.css("height", scl);
    P.css("position", "absolute");
    P.css("left", x * scl);
    P.css("top", y * scl);
    P.css("z-index", 2);
}

function rngRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function grid() {
    var gridX = 0;
    for (i = 0; i < cols; i++) {
        var gridY = 0;
        for (j = 0; j < rows; j++) {
            can.append("<div id='gridy" + i * 100 + j + "'></div>");
            var temp = $("#gridy" + i * 100 + j);
            temp.css("width", scl);
            temp.css("height", scl);
            temp.css("position", "absolute");
            temp.css("left", gridX);
            temp.css("top", gridY);
            temp.css("border", "1px solid white");
            gridY += scl;
        }
        gridX += scl;
    }
}

function initPlayer() {
    can.append("<div id='player'></div>");
    var P = $("#player");
    P.css("width", scl);
    P.css("height", scl);
    P.css("position", "absolute");
    P.css("left", Math.floor(cols / 2) * scl);
    P.css("top", Math.floor(rows / 2) * scl);
    P.css("background-color", "white");
    P.css("z-index", 5);
}

function move() {
    var P = $("#player");
    var F = $("#food");
    var S = $("#score");
    var foodX = parseInt(F.css("left").replace("px", ""));
    var foodY = parseInt(F.css("top").replace("px", ""));
    var startX = parseInt(P.css("left").replace("px", ""));
    var startY = parseInt(P.css("top").replace("px", ""));
    var co = {'x': startX, 'y': startY};
    coords.push(co);

    hit(timer);

    if ((coords.length - (snake.length + 2)) > 0) {
        coords.shift();
    }

    for (i = 0; i <= snake.length; i++) {
        $(snake[i]).css("left", coords[coords.length - (i + 1)].x);
        $(snake[i]).css("top", coords[coords.length - (i + 1)].y);
    }

    if ((foodX === startX) && (foodY === startY)) {
        grow(startX, startY);
        F.remove();
        score += points;
        S.val(score);
        spawn();
    }

    if (dire === 1) {
        startY -= scl;
        P.css("top", startY);
    } else if (dire === 2) {
        startX += scl;
        P.css("left", startX);
    } else if (dire === 3) {
        startY += scl;
        P.css("top", startY);
    } else if (dire === 4) {
        startX -= scl;
        P.css("left", startX);
    }

    if (timerOn) {
        timer = window.setTimeout("move();", 150);
    }
}

function hit(time) {

    var P = $("#player");
    //var F = $("#food");
    //var foodX = parseInt(F.css("left").replace("px", ""));
    //var foodY = parseInt(F.css("top").replace("px", ""));

    var playerX = parseInt(P.css("left").replace("px", ""));
    var playerY = parseInt(P.css("top").replace("px", ""));

    var PXX = {'x': playerX, 'y': playerY};
    for (i = snake.length - 1; i >= 0; i--) {
        var S = $("#snake" + i);
        var snakeX = parseInt(S.css("left").replace("px", ""));
        var SXX = {'x': snakeX, 'y': snakeY};
        var snakeY = parseInt(S.css("top").replace("px", ""));
        if ((SXX.x === PXX.x) && (SXX.y === PXX.y)) {
            lose(time);
            break;
        }
    }
    if ((playerX < 0) || (playerX > (W - scl)) || (playerY < 0) || (playerY > (H - scl))) {
        lose(time);
    }
}

function lose(time) {
    timerOn = 0;
    clearTimeout(time);
    $("#score").val("you lose");
    $("#player").remove();
    $("#food").remove();
    alert(score);
    score = 0;
}

function start() {
    if (!timerOn) {
        timerOn = 1;
        move();
    }
}

function Snake(x, y) {
    this.x = x;
    this.y = y;
    can.append("<div id='snake" + snakeCounter + "'></div>");
    var S = $("#snake" + snakeCounter);
    snake.push(S);
    S.css("width", scl);
    S.css("height", scl);
    S.css("position", "absolute");
    S.css("left", this.x);
    S.css("top", this.y);
    S.css("background-color", "white");
    S.css("z-index", 5);
    snakeCounter += 1;
}

function grow(x, y) {
    if (dire === 1) {
        var grow = new Snake(x, y + scl);
        //snake.push(grow);
    } else if (dire === 2) {
        var grow = new Snake(x - scl, y);
        //snake.push(grow);
    } else if (dire === 3) {
        var grow = new Snake(x, y - scl);
        //snake.push(grow);
    } else if (dire === 4) {
        var grow = new Snake(x + scl, y);
        //snake.push(grow);
    }
}