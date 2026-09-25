var titletxt = $("#level-title");
var buttonColors = ["green", "red", "yellow", "blue"];

var level = 0;
var sequencestored = [];
var sequenceplayer = [];
var acceptingInput = false;
var gameStarted = false;

var FLASH_DURATION = 200; // ms the button stays lit
var FLASH_GAP = 200;      // ms of darkness between flashes
var NEXT_LEVEL_DELAY = 1000; // ms pause before the next round starts

// ---- Sound effects --------------------------------------------------
var sounds = {
    green: new Audio("sounds/green.mp3"),
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    wrong: new Audio("sounds/wrong.mp3")
};

function playSound(name) {
    var sound = sounds[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(function () {});
}
// -----------------------------------------------------------------------

$(document).on("click", function () {
    if (!gameStarted) {
        startGame();
    }
});

$(".btn").on("click", function (event) {
    event.stopPropagation();
    if (!acceptingInput) return;
    playerClick($(this).attr("id"));
});

function startGame() {
    gameStarted = true;
    level = 0;
    sequencestored = [];
    $("body").removeClass("game-over");
    nextLevel();
}

function nextLevel() {
    level++;
    sequenceplayer = [];
    acceptingInput = false;
    titletxt.text("Level " + level);
    sequencestored = rollSequence(sequencestored);
    animate(sequencestored);
}

function rollSequence(sequence) {
    var next = buttonColors[Math.floor(Math.random() * buttonColors.length)];
    sequence.push(next);
    return sequence;
}

function flash(color, duration) {
    var btn = $("#" + color);
    btn.addClass("pressed");
    playSound(color);
    setTimeout(function () {
        btn.removeClass("pressed");
    }, duration || FLASH_DURATION);
}

function animate(sequence) {
    acceptingInput = false;
    var i = 0;
    var step = FLASH_DURATION + FLASH_GAP;

    var interval = setInterval(function () {
        if (i >= sequence.length) {
            clearInterval(interval);
            acceptingInput = true;
            return;
        }
        flash(sequence[i]);
        i++;
    }, step);
}

function playerClick(color) {
    flash(color);
    sequenceplayer.push(color);

    var idx = sequenceplayer.length - 1;
    if (sequenceplayer[idx] !== sequencestored[idx]) {
        gameOver();
        return;
    }

    if (sequenceplayer.length === sequencestored.length) {
        acceptingInput = false;
        setTimeout(nextLevel, NEXT_LEVEL_DELAY);
    }
}

function gameOver() {
    acceptingInput = false;
    gameStarted = false;
    playSound("wrong");
    $("body").addClass("game-over");
    titletxt.text("Game Over! Click to restart");
}