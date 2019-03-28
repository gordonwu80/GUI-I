/*
    File: https://gordonwu80.github.io/Assignment_9/js/functions.js
    (91.46) COMP 4610 GUI Programming I
    Assignment 9: Implementing a Bit of Scrabble with Drag-And-Drop
    Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
    Description: Necessary functions required to make objects draggable and dropable
 */

// Grabs a random tile from the remaining tiles in the bag
// Decrements the number of remaining tiles and updates the remaining tiles html
// and returns the tiles in hand
function get_from_remaining(x) {
    var tiles_in_hand = [];
    var all_tiles = [];

    for (var key in scrabble_tiles) {
        if (scrabble_tiles.hasOwnProperty(key)) {
            var remaining = scrabble_tiles[key]["number-remaining"];
            for (var i = 0; i < remaining; i++) {
                all_tiles.push(key);
            }
        }
    }

    for (var i = 0; i < x; i++) {
        if (all_tiles.length) {
            var rand_index = get_rand_int(0, Object.keys(all_tiles).length - 1);
            var rand_letter = all_tiles[rand_index];
            tiles_in_hand.push(rand_letter);
            --scrabble_tiles[rand_letter]["number-remaining"];
            all_tiles.splice(rand_index, 1);
        }
    }

    $("#remaining").html(all_tiles.length);

    return tiles_in_hand;
}

// Accessor for total number of tiles in the deck
function num_tiles_deck() {
    var total_tiles = 0;

    for (var key in scrabble_tiles) {
        if (scrabble_tiles.hasOwnProperty(key)) {
            total_tiles += scrabble_tiles[key]["number-remaining"];
        }
    }
    
    return total_tiles;
}

// Accessor for the number of tiles on the tile rack
function num_tiles_rack() {
    return $("#letter_rack img").length;
}

// Changes the Next Word button to a Finish button if the argument is passed
// The argument is only passed if there are no more tiles to hand out
function toggle_finish(to_finish) {
    var next_word_button = document.getElementById("nextword_button");
    if (to_finish) {
        next_word_button.innerHTML = "Finish";
        next_word_button.onclick = function(event) {
            finish();
        }
    } else {
        next_word_button.innerHTML = "Next Word";
        next_word_button.onclick = function(event) {
            next_word();
        }
    }
}

// Resets the board and all tiles, adds all the tiles back into the bag
// and removes all tiles from the letter rack
function restart() {
    $("#letter_rack img").remove();

    scrabble_board.clear_board();

    for (var key in scrabble_tiles) {
        if (scrabble_tiles.hasOwnProperty(key)) {
            scrabble_tiles[key]["number-remaining"] = scrabble_tiles[key]["original-distribution"];
        }
    }

    toggle_finish(false);
    
    scrabble_score.reset();

    next_word();
}

// Adds up the score and removes all tiles form the board and draws new tiles per
// the amount of tiles used up to make the word
function next_word() {
    var x, key, tile_id, new_tile, hand;

    scrabble_score.change();
    scrabble_board.clear_board();

    hand = get_from_remaining(7 - num_tiles_rack());
    for (x = 0; x < hand.length; x++) {
        key = hand[x];
        tile_id = generate_tile_id();
        new_tile = $("<img id=\"" + tile_id + "\" src=\"" + scrabble_tiles[key]["image"] + "\" class=\"letterTile\" letter=\"" + key + "\" />");
        if (key == "_") {
            new_tile.addClass("blank_tile");
        }
        
        $("#letter_rack").append(new_tile);
        new_tile.addClass("letter_tile_on_rack");

        // Makes the tile Draggable
        new_tile.draggable({
            revert_duration: 200,
            start: function(event, ui) {
                $(this).css("z-index", 99);
                $(this).draggable("option", "revert", "invalid");
            },
            stop:function() {
                $(this).css("z-index", "");
            }
        });

        if (num_tiles_deck() == 0) {
            toggle_finish(true);
            document.getElementById("nextword_button").disabled = false;
        } else {
            document.getElementById("nextword_button").disabled = true;
        }

    }
}

// Halts all play after this function is called
function finish() {
    scrabble_score.change();
    document.getElementById("nextword_button").disabled = true;
    $(".letter_tile").draggable("disable");
}

// Generates a unique string used as a tile id; as long as the page is loaded
// the tile id remains the same
function generate_tile_id() {
    var id;

    generate_tile_id.id = ++generate_tile_id.id || 1;
    id = "tile" + generate_tile_id.id.toString();

    return id;
}

// Returns a random int between the min and the max
function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Changes the font red if an error
function error_font(jQueryObject, _true) {
    if (_true) {
        jQueryObject.css({
            "color": "red"
        });
    } else {
        jQueryObject.css({
            "color": "black"
        });
    }
}

// Creates a box for the user to choose which tile they want to replace with the 
// blank square
function blanktile_dialog(blanktile_draggable, tile_id, row, col) {
    var tileselect_dialog = $("<div id='blankTileDialog'></div>");
    var key, new_tile;
    for (key in scrabble_tiles) {
        if (key != "_") {
            // Add each tile image into the dialog so the user can click it to select the letter.
            new_tile = $("<img src='" + scrabble_tiles[key]["image"] + "' class='letter_tile_in_dialog' letter='" + key + "'>");
    
            // Register click event to the image
            new_tile.click(function() {
                var new_letter = $(this).attr("letter");
        
                // Replace the letter attribute and the image source of the draggable tile img.
                blanktile_draggable.attr("letter", new_letter);
                blanktile_draggable.attr("src", scrabble_tiles[new_letter]["image"]);
        
                tile_id = blanktile_draggable.attr("id");
                scrabble_board.add_to(tile_id, new_letter, row, col);
        
                // Validate and display the word we have so far.
                validate_word();
        
                // Update the score with the selected letter.
                scrabble_score.refresh();
        
                tileselect_dialog.dialog("close");
            });
            tileselect_dialog.append(new_tile);
        }
    }
    tileselect_dialog.css("z-index", 100);
    tileselect_dialog.dialog({
        modal: true,
        draggable: false,
        resizable: false
    });
}

// The Droppability and Draggability of the tiles is implemented once the window loads up
$(window).load(function() {
    var row, col;

    scrabble_board.create_board();

    $(".boardSlot").droppable({
        accept: function(draggable) {
            var row, col;

            row = $(this).attr("row");
            col = $(this).attr("col");

            // Make sure the board space isn't occupied 
            // and if so return false
            if (scrabble_board.get_tileid(row, col) === draggable.attr("id")) {
                return true;
            } else if (scrabble_board.is_empty(row, col)) {
                return true;
            } else {
                return false;
            }
        },
        drop: function (event, ui) {
            var row, col, letter, word, tile_id, prev_pos;

            ui.draggable.removeClass("letter_tile_on_rack");
            ui.draggable.addClass("letter_tile_on_board");

            row = $(this).attr("row");
            col = $(this).attr("col");

            letter = ui.draggable.attr("letter");
            tile_id = ui.draggable.attr("id");

            $(ui.draggable).css("top", "");
            $(ui.draggable).css("left", "");
            $(this).append(ui.draggable);

            console.log("Dropped " + letter + " (" + tile_id + ") on (" + row + ", " + col + ").");

            
            prev_pos = scrabble_board.find_slot(tile_id);
            if ($(ui.draggable).hasClass("blank_tile") && !prev_pos) {
                blanktile_dialog($(ui.draggable), tile_id, row, col);
            } else {
                scrabble_board.add_to(tile_id, letter, row, col);
                word = validate_word();
                scrabble_score.refresh();
            }
        }
    });

    $("#letter_rack").droppable({
        tolerance: "touch",
        drop: function(event, ui) {
            var tile_id, word, pos;

            ui.draggable.removeClass("letter_tile_on_board");
            ui.draggable.addClass("letter_tile_on_rack");

            if ($(ui.draggable).hasClass("blank_tile")) {
                $(ui.draggable).attr("src", scrabble_tiles["_"]["image"]);
            }

            tile_id = ui.draggable.attr("id");
            pos = scrabble_board.find_slot(tile_id);
            if (pos) {
                scrabble_board.delete_slot(pos[0], pos[1]);
                $("#letter_rack").append(ui.draggable);
                ui.draggable.css({
                    "position": "relative", 
                    "top": "", 
                    "left": ""
                });

                word = validate_word();
                scrabble_score.refresh();
            } else {
                ui.draggable.draggable("option", "revert", true);
            }
        }
    });

    restart();
});
