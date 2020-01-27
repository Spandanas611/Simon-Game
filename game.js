// alert("working.");
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  level++;
  $("#level-title").text("Level " + level);

  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log(gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);


}

$(".btn").click(function() {
  var userChosenColour = this.id;
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

$(document).on('keypress', function() {
  // alert("works");
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
