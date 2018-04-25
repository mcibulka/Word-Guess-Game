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

    addSpaces: function () {
        var padded = "";
        
        for (var i = 0 ; i < this.playerWord.length ; i++) {
            padded += this.playerWord.charAt(i);
            padded += " ";
        }
    
        padded.trim();  // remove trailing whitespace
    
        return padded;
    },


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
        
        for (var i = 0 ; i < this.words[this.currWord].length ; i++) {   // initialise playerWord by assigning an underscore for each letter in the word to guess
            this.playerWord += "_"
        }    
    },


    changeWord: function () {
        this.prevWord = this.words[this.currWord];

        if (this.currWord < this.words.length - 1){
            this.currWord++;    // select next word in words array
        }
        else {
            this.currWord = 0;  // loop back from start of words array
        }

        this.remGuess = 6;
        this.nextWord = true;
    },


    checkLoss: function () {
        if (this.remGuess === 0) {
            this.losses++;

            this.changeWord();
        }
    },


    checkWin: function () {
        if (this.playerWord === this.words[this.currWord]) {
            this.wins++;

            this.changeWord();
        }
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


    updateRemGuess: function () {
        this.remGuess--;
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
                game.updateRemGuess();
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

