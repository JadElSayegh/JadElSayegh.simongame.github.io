var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Detect Keypress start game

$(document).on("keydown", function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
       started = true;
    }
});

$(document).on("click", function(){
    if(!started){
         var display = $(".menu-mobile").css("display");
        if (display == "none") {
            started = true;
        } else {
            $("#level-title").text("Level " + level);
    nextSequence();
       started = true;
        }
    
    }
});

//Detect button clicks
$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Game Framework
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
  }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

}


//Sound code
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


//Animation function
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  
