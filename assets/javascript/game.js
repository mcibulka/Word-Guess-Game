var game = {
    currWord: 0,
    firstKey: false,
    guessed: "",
    guesses: [],
    losses: 0,
    nextWord: false,
    playerWord: "",
    prevWord: "",
    remGuess: 6,
    wins: 0,
    words: ["sonic", "gallardo", "raptor", "sierra", "challenger"],

    /*  Add a space between each letter to increase readability  */
    addSpaces: function () {
        var padded = "";
        
        for (var i = 0 ; i < this.playerWord.length ; i++) {
            padded += this.playerWord.charAt(i);
            padded += " ";
        }
    
        padded.trim();  // remove trailing whitespace
    
        return padded;
    },

    /*  Prepare game for player  */
    initialise: function () {
        if (this.nextWord) {
            $("#instructions").text("Previous word: " + this.prevWord);
            this.nextWord = false;
        }
        else {
            $("#instructions").text("Press a letter key to make a guess.");
        }

        this.guesses.length = 0;   // remove any guesses from the previous round
        this.playerWord = "";
        this.guessed = "Letters Guessed: ";
        
        for (var i = 0 ; i < this.words[this.currWord].length ; i++) {   // initialise by assigning an underscore for each letter in the word to guess
            this.playerWord += "_"
        }    
    },

    /*  Record the previous word for player to view after page updates, select next word from list  */
    changeWord: function () {
        this.prevWord = this.words[this.currWord];

        if (this.currWord < this.words.length - 1){
            this.currWord++;    // select next word in words list
        }
        else {
            this.currWord = 0;  // loop back from start of words list
        }

        this.remGuess = 6;
        this.nextWord = true;
    },

    /*  Check if any remaining guesses are available  */
    checkLoss: function () {
        this.remGuess--;

        if (this.remGuess === 0) {
            this.losses++;

            this.changeWord();
        }
    },

    /*  Check for the matching word  */
    checkWin: function () {
        if (this.playerWord === this.words[this.currWord]) {
            this.wins++;

            this.changeWord();
        }
    },

    /*  Update game data for player  */
    updateBoard: function () {
        $("#word").text(this.addSpaces());
        $("#guessed").text(this.guessed);
        $("#remGuess").text("Remaining Guesses: " + this.remGuess);
        $("#wins").text("Wins: " + this.wins);
        $("#losses").text("Losses: " + this.losses);
    },

    /*  Adds guess to list of guesses to print to player  */
    updateGuessed: function (c) {
        this.guessed += " " + c;
    },

    /*  Fills in correct guess at corresponding location within word  */
    updatePlayerWord: function (c) {
        var updated = "";

        for (var i = 0 ; i < this.words[this.currWord].length ; i++) {
            if (this.words[this.currWord].charAt(i) === c) {
                updated += c;
            }
            else {
                updated += this.playerWord.charAt(i);
            }
        }

        this.playerWord = updated;
    },
};


document.onkeydown = function(event) {
    if (game.firstKey === false) {
        game.firstKey = true;
        game.initialise();
    }
    else {
        var key = event.key;

        if (game.guesses.includes(key) === false) {
            game.guesses.push(key);

            if (game.words[game.currWord].includes(key)) {
                game.updatePlayerWord(key);
                game.checkWin();
            }
            else {
                game.checkLoss();
            }
    
            if (game.nextWord) {
                game.initialise();
            }
            else {
                game.updateGuessed(key);
            }
        }
    }
    
    game.updateBoard();
}

