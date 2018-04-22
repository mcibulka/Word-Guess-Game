var firstKey = false;
var guessed = "Letters Guessed: ";
var word = "hello"
var newStr = "";

var remGuess = 6;
var wins = 0;
var losses = 0;

document.onkeydown = function(event) {
    if (firstKey === false) {
        $("#instructions").text("Press a letter key to make a guess.");
        firstKey = true;

        for (var i = 0 ; i < word.length ; i++) {
            newStr += "_"
        }
        newStr.trim();
        $("#word").text(newStr);

        $("#remGuess").text("Remaining Guesses: " + remGuess);
    }
    else {
        var key = event.key;

        if (word.includes(key)) {
            var tempString = "";

            for (var i = 0 ; i < word.length ; i++) {
                if (word.charAt(i) === key) {
                    tempString += key;
                }
                else {
                    tempString += newStr.charAt(i);
                }
            }
            newStr = tempString;
            $("#word").text(newStr);
        }
        else {
            remGuess--;
            $("#remGuess").text("Remaining Guesses: " + remGuess);
        
            if (remGuess === 0) {
                $("#instructions").text("You lose.  Refresh the page to play again.");
            }
        }

        guessed += " " + key;
        $("#guessed").text(guessed);
    } 
}

