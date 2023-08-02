let userClickedPattern = [];
let gamePattern = [];
let started = 1;
let level = 0;
$(".btn").on("click", function (event) {
    let getRightClicks = 0;
    let userChoosenColour = this.getAttribute("id");
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
        for (let i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] != gamePattern[i]) {
                $("body").addClass("game-over");
                setTimeout(function () {
                    $("body").removeClass("game-over");
                }, .200);
                playSound("wrong");
                gamePattern = [];
                userClickedPattern = [];
                $("#level-title").text("GameOver,press any Key to restart");
                startOver();
                getRightClicks = 0;
            }
            getRightClicks++;
        }
        if (gamePattern.length === userClickedPattern.length && getRightClicks === gamePattern.length) {
            rightClicked = 0;
            userClickedPattern = [];
            level++;
            nextSquence(level);
        }
});

$(document).on("keydown", function () {
    if (started === 1) {
        $("#level-title").text("Level " + level);
        nextSquence(level);
    }
    started++;
});


function nextSquence(level) {
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let buttonColours = ["red", "blue", "green", "yellow"];
    let randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    setTimeout(function () {
        $("#" + randomChoosenColour).fadeOut(200).fadeIn(200);
        playSound(randomChoosenColour);
    }, .1000);
}


function playSound(name) {
    let randomAudioSrc = "./sounds/" + name + ".mp3";
    let audio = new Audio(randomAudioSrc);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, .100)
}

function startOver() {
    level = 0;
    started = 1;
}