/*
    File: https://gordonwu80.github.io/Assignment_9/js/setup.js
    (91.46) COMP 4610 GUI Programming I
    Assignment 9: Implementing a Bit of Scrabble with Drag-And-Drop
    Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
    Description:
 */

// Used this for refernce https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
// Tile images attained from here: https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.html
var scrabble_tiles = [] ;
scrabble_tiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_A.jpg"  } ;
scrabble_tiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_B.jpg"  } ;
scrabble_tiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_C.jpg"  } ;
scrabble_tiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_D.jpg"  } ;
scrabble_tiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12, "image" : "images/Scrabble_Tiles/Scrabble_Tile_E.jpg"  } ;
scrabble_tiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_F.jpg"  } ;
scrabble_tiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_G.jpg"  } ;
scrabble_tiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_H.jpg"  } ;
scrabble_tiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_I.jpg"  } ;
scrabble_tiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_J.jpg"  } ;
scrabble_tiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_K.jpg"  } ;
scrabble_tiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_L.jpg"  } ;
scrabble_tiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_M.jpg"  } ;
scrabble_tiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_N.jpg"  } ;
scrabble_tiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_O.jpg"  } ;
scrabble_tiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_P.jpg"  } ;
scrabble_tiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_Q.jpg"  } ;
scrabble_tiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_R.jpg"  } ;
scrabble_tiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_S.jpg"  } ;
scrabble_tiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_T.jpg"  } ;
scrabble_tiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_U.jpg"  } ;
scrabble_tiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_V.jpg"  } ;
scrabble_tiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_W.jpg"  } ;
scrabble_tiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_X.jpg"  } ;
scrabble_tiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_Y.jpg"  } ;
scrabble_tiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_Z.jpg"  } ;
scrabble_tiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2,  "image" : "images/Scrabble_Tiles/Scrabble_Tile_Blank.jpg"  } ;
