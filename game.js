var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGameTracker = false;
var level = 0;
var clicktracker = 0;

$(document).keypress(function () {
  if (startGameTracker === false) {
    nextSequence();
    startGameTracker = true;
  }
});

$(".btn").click(function (event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  var userChosenColorAudio = "sounds/" + userChosenColor + ".mp3";
  playSound(userChosenColorAudio);
  animatePress(userChosenColor);
  checkAnswer(level);
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  var randomChosenColorId = "#" + randomChosenColor;
  var randomChosenColorSound = "sounds/" + randomChosenColor + ".mp3";
  $(randomChosenColorId).fadeOut(100).fadeIn(100);
  playSound(randomChosenColorSound);
  gamePattern.push(randomChosenColor);
}

function playSound(sound) {
  var sound = new Audio(sound);
  sound.play();
}

function gameOverSound() {
  var gg = new Audio("sounds/wrong.mp3");
  gg.play();
}

function animatePress(currentColor) {
  var selected = "#" + currentColor;
  $(selected).addClass("pressed");
  setTimeout(function () {
    $(selected).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[clicktracker] != userClickedPattern[clicktracker]) {
    gameOverSound();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  } else {
    clicktracker++;
    if (clicktracker == currentLevel) {
      userClickedPattern = [];
      clicktracker = 0;
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
}

function startOver() {
  startGameTracker = false;
  level = 0;
  clicktracker = 0;
  gamePattern = [];
  userClickedPattern = [];
}
