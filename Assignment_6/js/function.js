/*
File: https://gordonwu80.github.io/Assignment_6/function.js
(91.46) COMP 4610 GUI Programming I
Assignment 6: Creating an Interactive Dynamic Table
Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
Description: Recieves the user inputs from the html forms and 
             then prints out the multiplication table.
*/


/*
 function validate_input(input)
   - input: each of the inputs available

   Description: Validate whether the input is a number or not 
                and check if it is empty or not
 
*/
function validate_input(input) {
    if (isNaN(input)) {
        alert("ERROR: This is not a numerical input: " + input);
        return false;
    } else if(input == "") {
        alert("ERROR: Need an input for each bound.");
        return false;
    } else {
        return true;
    }
}

/*
 function check_prior(previous, current)
  - previous: the lower bound of input
  - current: the upper bound of input

  Description: Check whether or not the lower bound is greater than the upper bound, 
               this check is done on both the multplicand(horizontal) and 
               multiplier(vertical) edges
*/
function check_prior(previous, current) {
    if (previous > current) {
        console.log("PREV TYPE= " + typeof previous);
        console.log("CURR TYPE= " + typeof current);
        console.log("RESULT = " + previous > current)
        console.log("RESULT = " + previous < current)

        alert("ERROR: Must enter a lower value for the lower bound than the upper bound.");
        return false;
    }
    return true;
}

function create_table() {

    var no_table = false;
    
    // Check each input to see if any of them are empty or not a number or not
    // then change the className to 'error' if any of the inputs don't work
    var input = document.getElementsByTagName("input");

    for (var i = 0; i < input.length; i++) {
        if (!validate_input(input[i].value)) {
            input[i].className = "error";
            no_table = true;
        } else {
            input[i].className = "";
        }
    }

    // Check whether the horizontal lower bound is greater than the upper bound
    // then change the className to 'error' if any of the inputs don't work
    // Need the else if, otherwise if no input is added, the classname
    // would not revert and would stay red
    if (!check_prior(Number(input[0].value), Number(input[1].value))) {
        input[0].className = "error";
        no_table = true;
    } else if (!check_prior(Number(input[0].value), Number(input[1].value))) {
        input[0].className = "";
    }

    // Check whether the vertical lower bound is greater than the upper bound
    // then change the className to 'error' if any of the inputs don't work
    // Need the else if, otherwise if no input is added, the classname
    // would not revert and would stay red
    if (!check_prior(Number(input[2].value), Number(input[3].value))) {
        input[2].className = "error";
        no_table = true;
    } else if (!check_prior(Number(input[2].value), Number(input[3].value))) {
        input[2].className = "";
    }

    // Make it so that if the inputs were errors, the table doesn't print
    // Refered to this StackOverflow page for reference: 
    //https://stackoverflow.com/questions/14643617/create-table-using-javascript
    if (!no_table) {
        var div = document.getElementById("table");
        var tbl = document.createElement("table");
        var tbo = document.createElement("tbody");

        var row = document.createElement("tr");
        row.appendChild(document.createElement("th"));

        for (var i = Number(input[0].value); i <= Number(input[1].value); i++) {
            var x_index = document.createElement("th");
            x_index.innerText = i;
            row.appendChild(x_index);
        }
        tbo.appendChild(row);

        for (var y = Number(input[2].value); y <= Number(input[3].value); y++) {
            var row = document.createElement("tr");
            var vert_index = document.createElement("th");
            var vert_index_content = document.createTextNode(y);
            vert_index.appendChild(vert_index_content);
            row.appendChild(vert_index);

            for (var x = Number(input[0].value); x <= Number(input[1].value); x++) {
                var cell = document.createElement("td");
                var cell_text = document.createTextNode( y*x );
                cell.appendChild(cell_text);
                row.appendChild(cell);
            }
            tbo.appendChild(row);
        }
        tbl.appendChild(tbo);
        div.appendChild(tbl);
        div.replaceChild(tbl, div.childNodes[0]);
    }
}