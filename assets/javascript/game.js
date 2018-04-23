var game = {
    firstKey: false,
    guessed: "Letters Guessed: ",
    losses: 0,
    playerWord: "",
    remGuess: 6,
    wins: 0,
    word: "hello",


    initialise: function () {
        for (var i = 0 ; i < this.word.length ; i++) {   // initialise playerWord by assigning an underscore for each letter in the word to guess
            this.playerWord += "_"
        }

        $("#instructions").text("Press a letter key to make a guess.");     // likely temporary  
    },


    checkLoss: function () {
        if (this.remGuess === 0) {
            $("#instructions").text("You lose.  Refresh the page to play again.");      // likely temporary
            this.losses++;
        }
    },


    checkWin: function () {
        if (this.playerWord === this.word) {
            $("#instructions").text("You win!  Refresh the page to play again.");       // likely temporary
            this.wins++;
        }
    },


    addSpaces: function () {
        var padded = "";
        
        for (var i = 0 ; i < this.playerWord.length ; i++) {
            padded += this.playerWord.charAt(i);
            padded += " ";
        }
    
        padded.trim();  // remove trailing whitespace
    
        return padded;
    },


    updateBoard: function () {
        $("#word").text(this.addSpaces());
        $("#guessed").text(this.guessed);
        $("#remGuess").text("Remaining Guesses: " + this.remGuess);
        $("#wins").text("Wins: " + this.wins);
        $("#losses").text("Losses: " + this.losses);
    },


    updateGuessed: function (c) {
        this.guessed += " " + c;
    },


    updatePlayerWord: function (c) {
        var updated = "";

        for (var i = 0 ; i < this.word.length ; i++) {
            if (this.word.charAt(i) === c) {
                updated += c;
            }
            else {
                updated += this.playerWord.charAt(i);
            }
        }

        this.playerWord = updated;
    },


    updateRemGuess: function () {
        this.remGuess--;
    },
};


document.onkeydown = function(event) {
    if (game.firstKey === false) {
        game.firstKey = true;
        game.initialise();
        game.updateBoard();
    }
    else {
        var key = event.key;

        if (game.word.includes(key)) {
            game.updatePlayerWord(key);
            game.checkWin();
        }
        else {
            game.updateRemGuess();
            game.checkLoss();
        }

        game.updateGuessed(key);
    }
    
    game.updateBoard();
}

