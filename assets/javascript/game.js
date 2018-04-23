var firstKey = false;
var guessed = "Letters Guessed: ";
var word = "hello"
var newStr = "";

var remGuess = 6;
var wins = 0;
var losses = 0;


function padStr (s) {
    var padded = "";
    
    for (var i = 0 ; i < s.length ; i++) {
        padded += s.charAt(i);
        padded += " ";
    }

    padded.trim();

    return padded;
}


document.onkeydown = function(event) {
    if (firstKey === false) {
        firstKey = true;

        for (var i = 0 ; i < word.length ; i++) {   // initialise newStr by giving an underscore for each letter in the word to guess
            newStr += "_"
        }

        $("#instructions").text("Press a letter key to make a guess.");
        $("#word").text(padStr(newStr));
        $("#remGuess").text("Remaining Guesses: " + remGuess);
        $("#wins").text("Wins: " + wins);
        $("#losses").text("Losses: " + losses);
    }
    else {
        var key = event.key;

        if (word.includes(key)) {
            var tempStr = "";

            for (var i = 0 ; i < word.length ; i++) {
                if (word.charAt(i) === key) {
                    tempStr += key;
                }
                else {
                    tempStr += newStr.charAt(i);
                }
            }

            newStr = tempStr;
            $("#word").text(padStr(newStr));

            if (newStr === word) {
                $("#instructions").text("You win!  Refresh the page to play again.");
                wins++;
                $("#wins").text("Wins: " + wins);
            }
        }
        else {
            remGuess--;
            $("#remGuess").text("Remaining Guesses: " + remGuess);
        
            if (remGuess === 0) {
                $("#instructions").text("You lose.  Refresh the page to play again.");
                losses++;
                $("#losses").text("Losses: " + losses);
            }
        }

        guessed += " " + key;
        $("#guessed").text(guessed);
    } 
}

