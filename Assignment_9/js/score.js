/*
    File: https://gordonwu80.github.io/Assignment_9/js/score.js
    (91.46) COMP 4610 GUI Programming I
    Assignment 9: Implementing a Bit of Scrabble with Drag-And-Drop
    Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
    Description: Has all the functions necessary to compute the score
 */

var scrabble_score = { "total": 0, "highest": 0 };

// Calculates the score using the letter multiplier and the word multiplier from the board
// and the rules and returns the score.
scrabble_score.calculate_score = function() {
    var row, col, letter, letter_val, word_multiplier = 1, board_score = 0;

    for (row = 0; row < scrabble_board.row_count; ++row) {
        for (col = 0; col < scrabble_board.col_count; ++col) {
            letter = scrabble_board.slots[row][col].letter;
            if (letter) {
                letter_val = scrabble_tiles[letter].value;
                board_score += letter_val * scrabble_board.slots[row][col].letterMultiplier;
                word_multiplier *= scrabble_board.slots[row][col].wordMultiplier;
            }
        }
    }

    board_score *= word_multiplier;

    return board_score;
}

// Refreshes the Score + the Highest Scores texts
scrabble_score.refresh = function() {
    var board_score = scrabble_score.calculate_score();
    $('#score').css("color", "");
    $('#score').html(scrabble_score.total + " (+<span id='board_score'>" + board_score + "</span>)");
    if (board_score > 0) {
        $("#board_score").css("color", "black");
    } else {
        $("#board_score").css("color", "red");
    }

    $("#high_score").html(scrabble_score.highest);
}

// Updates the total and highest score vars and updates the total and highest score
scrabble_score.change = function() {
    var board_score = scrabble_score.calculate_score();

    scrabble_score.total += board_score;
    $("#score").html(scrabble_score.total);
    if (scrabble_score.total > 0) {
        $("#score").css("color", "black");
    }

    if (scrabble_score.total > scrabble_score.highest) {
        scrabble_score.highest = scrabble_score.total;
        $("#high_score").html(scrabble_score.total);
        $("#high_score").css("color", "black");
    }
}

// Resets the score when the function is called
scrabble_score.reset = function() {
    scrabble_score.total = 0;
    $("#score").html(0);
    $("#high_score").css("color", "");
}
