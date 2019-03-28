/*
    File: https://gordonwu80.github.io/Assignment_9/js/board.js
    (91.46) COMP 4610 GUI Programming I
    Assignment 9: Implementing a Bit of Scrabble with Drag-And-Drop
    Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
    Description: Has all the functions of the scrabble board
 */

// Sets up the simplefied Scrabble Board; only one line
var scrabble_board = {};
scrabble_board.slots = [];
scrabble_board.slots[0] = [];
scrabble_board.slots[0][0] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "images/Scrabble_Tiles/Scrabble_BlankSquare_81x87.jpg"};
scrabble_board.slots[0][1] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "images/Scrabble_Tiles/Scrabble_DoubleWordScore_81x87.jpg"};
scrabble_board.slots[0][2] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "images/Scrabble_Tiles/Scrabble_BlankSquare_81x87.jpg"};
scrabble_board.slots[0][3] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "images/Scrabble_Tiles/Scrabble_BlankSquare_81x87.jpg"};
scrabble_board.slots[0][4] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "images/Scrabble_Tiles/Scrabble_BlankSquare_81x87.jpg"};
scrabble_board.slots[0][5] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "images/Scrabble_Tiles/Scrabble_DoubleWordScore_81x87.jpg"};
scrabble_board.slots[0][6] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "images/Scrabble_Tiles/Scrabble_BlankSquare_81x87.jpg"};

scrabble_board.row_count = Object.keys(scrabble_board.slots).length;
scrabble_board.col_count = Object.keys(scrabble_board.slots[0]).length;

// Creates the Scrabble board dynamically
scrabble_board.create_board = function() {
    var row, col, image_path, new_slot;
    
    // Sets up the board for an amount of rows
    // 87 refers to the board image height
    $("#board").css("height", (87+ 2 * (1 + 1)) * scrabble_board.row_count);
    // Sets up board for one row 
    // 81 refers to the board image width
    $("#board").css("width", (81 + 2 * (1+ 1)) * scrabble_board.col_count);
  
    for (row = 0; row < scrabble_board.row_count; row++) {
        for (col = 0; col < scrabble_board.col_count; col++) {
            image_path = scrabble_board.slots[row][col].image;
            new_slot = $("<div class=\"boardSlot\" row=\"" + row + "\" col=\"" + col + "\" style=\"background-image: url(" + image_path + ")\" />");
            $("#board").append(new_slot);
            new_slot.css({"width": 81, "height": 87, "margin": 1, "border-width": 1});
        }
    }
}

// Clears the Scrabble board of tiles when the function is called
scrabble_board.clear_board = function() {
    var row, col;

    $("#board img").remove();

    for (row = 0; row < scrabble_board.row_count; row++) {
        for (col = 0; col < scrabble_board.col_count; col++) {
            delete scrabble_board.slots[row][col].tile_id;
            delete scrabble_board.slots[row][col].letter;
        }
    }
}

// Accessor for a slot's tile ID
scrabble_board.get_tileid = function(row, col) {
    return scrabble_board.slots[row][col].tile_id;
}

// Accessor for a slot's letter
scrabble_board.get_letter = function(row, col) {
    return scrabble_board.slots[row][col].letter;
}

// Checks if a slot in the board is empty or not
scrabble_board.is_empty = function(row, col) {
    return typeof(scrabble_board.slots[row][col].tile_id) === "undefined";
}

// Adds slot information to the scrabble board slot data 
scrabble_board.add_to = function(tile_id, letter, row, col) {
    var x, y;

    for (x = 0; x < scrabble_board.row_count; x++) {
        for (y = 0; y < scrabble_board.col_count; y++) {
            if (scrabble_board.slots[x][y].tile_id = tile_id) {
                delete scrabble_board.slots[x][y].tile_id;
                delete scrabble_board.slots[x][y].letter;
            }
        }
    }

    scrabble_board.slots[row][col].letter = letter;
    scrabble_board.slots[row][col].tile_id = tile_id;
}

// Deletes the slot data of the user's choosing
scrabble_board.delete_slot = function(row, col) {
    delete scrabble_board.slots[row][col].tile_id;
    delete scrabble_board.slots[row][col].letter;
}

// Checks if a slot has a certain tile id, and if so returns the coordinates
// else returns false
scrabble_board.find_slot = function(tile_id) {
    var x, y;

    for (x = 0; x < scrabble_board.row_count; x++) {
        for (y = 0; y < scrabble_board.col_count; y++) {
            if (scrabble_board.slots[x][y].tile_id === tile_id) {
                return [x, y];
            }
        }
    }

    return false;
}

