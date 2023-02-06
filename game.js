var gamePattern = []; 
var userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var level = 0;
var start = false;


$(document).on("keydown", function(){
    if(!start)
    {
        nextSequence();
        start = true;
    }
});


function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.round(Math.random()*3);

    randomChosenColour = buttonColours[randomNumber];


    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour+"").fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    level = level + 1;

    $("h1").text("Level "+level+"");
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");

    $("#"+userChosenColour+"").addClass("pressed");

    playSound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentColour)
{
    if(gamePattern[currentColour] === userClickedPattern[currentColour])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver()
{
    gamePattern = [];
    level = 0;
    start = false;
}

function playSound(name)
{
    var random = new Audio("sounds/"+name+".mp3");
    random.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour+"").addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour+"").removeClass("pressed");
    }, 100);
}

