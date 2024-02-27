// variables required for the code
var gamePattern = [];
var userClickedpattern = [];
var level = 0;
var buttonColors = ["green","red","yellow","blue"];
var started = false;


//this is used to start the game by clicking any key in the keyboard
$(document).keydown(function (){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


//this will track the buttons clicked by the user and store it.
$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedpattern.length - 1);
})

//Checking answer with gamePattern and userClickedpattern
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedpattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedpattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        playSound("wrong");
        $("h1").text("Game over,Press any key to continue");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}

//Will generate random colors for user to remember
function nextSequence(){
    userClickedpattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosencolor = buttonColors[randomNumber];
    gamePattern.push(randomChosencolor);

    $("#" + randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosencolor);
}

//Used to play sounds for entire code
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
}

//this class is used to create animation for user after clicking any button
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    },100);
}


//Used to restart the game.
function startover(){
    gamePattern = [];
    userClickedpattern = [];
    level = 0;
    started = 0;
}


