var game = {
    firstKey: false,
    guessed: "Letters Guessed: ",
    losses: 0,
    playerWord: "",
    remGuess: 6,
    wins: 0,
    word: "hello"
};


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
    if (game.firstKey === false) {
        game.firstKey = true;

        for (var i = 0 ; i < game.word.length ; i++) {   // initialise playerWord by giving an underscore for each letter in the word to guess
            game.playerWord += "_"
        }

        $("#instructions").text("Press a letter key to make a guess.");
        $("#word").text(padStr(game.playerWord));
        $("#remGuess").text("Remaining Guesses: " + game.remGuess);
        $("#wins").text("Wins: " + game.wins);
        $("#losses").text("Losses: " + game.losses);
    }
    else {
        var key = event.key;

        if (game.word.includes(key)) {
            var tempStr = "";

            for (var i = 0 ; i < game.word.length ; i++) {
                if (game.word.charAt(i) === key) {
                    tempStr += key;
                }
                else {
                    tempStr += game.playerWord.charAt(i);
                }
            }

            game.playerWord = tempStr;
            $("#word").text(padStr(game.playerWord));

            if (game.playerWord === game.word) {
                $("#instructions").text("You win!  Refresh the page to play again.");
                game.wins++;
                $("#wins").text("Wins: " + game.wins);
            }
        }
        else {
            game.remGuess--;
            $("#remGuess").text("Remaining Guesses: " + game.remGuess);
        
            if (game.remGuess === 0) {
                $("#instructions").text("You lose.  Refresh the page to play again.");
                game.losses++;
                $("#losses").text("Losses: " + game.losses);
            }
        }

        game.guessed += " " + key;
        $("#guessed").text(game.guessed);
    } 
}

