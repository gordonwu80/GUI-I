/*
File: https://gordonwu80.github.io/Assignment_6/function.js
(91.46) COMP 4610 GUI Programming I
Assignment 6: Creating an Interactive Dynamic Table
Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
Description: Recieves the user inputs from the html forms and 
             then prints out the multiplication table.
*/

$(document).ready(function() {
    $.validator.addMethod("greater_than", function(value, element, param) {
        var $otherElement = $(param);
        return parseInt(value, 10) > parseInt($otherElement.val(), 10);
});

$("#button").click(function(){
    var horiz_lower = Number(document.getElementById("x_lower").value);
    var horiz_upper = Number(document.getElementById("x_upper").value);
    var vert_lower  = Number(document.getElementById("y_lower").value);
    var vert_upper  = Number(document.getElementById("y_upper").value);
  
    // Validates the input and makes sure that they are not empty or 
    // and makes sure that the upper bounds are greater than their respective lower bounds
    $("#user_input").validate({
      rules: {
        x_lower: {
            required: true,
                },
  
        x_upper: {
            required: true,
            greater_than: "#x_lower"
                },
  
        y_lower: {
            required: true,
                },
  
        y_upper: {
            required: true,
            greater_than: "#y_lower"
                }
  
        },
  
      // Help/Error messages that print out if an error occurs
      messages: {
          x_lower: {
              required: " Please enter a horizontal lower bound."
                  },
  
          x_upper: {
              required: " Please enter a horizontal upper bound.",
              greater_than: " The upper bound must be greater than the lower bound."
                  },
  
          y_lower: {
              required: " Please enter a vertical lower bound."
                  },
  
          y_upper: {
              required: " Please enter a horizontal upper bound.",
              greater_than: " The upper bound must be greater than the lower bound."
                  },
              },
  
        });
  
        // Then if all the inputs are valid, the table is printed
        if($("#user_input").valid()){
            create_table(horiz_lower, horiz_upper, vert_lower, vert_upper);
        }else{
            return false;
        }
  
    });
});

/*
 function is_number(event)
 Description: Prevents the user from inputing anything that isn't a number
*/
function is_number(event) {
    var char = String.fromCharCode(event.which);

    if(!(/[0-9]/.test(char))){
      event.preventDefault();
    }
}

/*
 function create_table(x_lower, x_upper, y_lower, y_upper)
  Params: 
    - x_lower: horizontal lower bound gathered from the HTML form
    - x_upper: horizontal upper bound gathered from the HTML form
    - y_lower: vertical lower bound gathered from the HTML form
    - y_upper: vertical upper bound gathered from the HTML form

  Descripton: Creates a multiplication table using the data inputed by the user
              from the HTML form.
*/
function create_table(x_lower, x_upper, y_lower, y_upper) {
    // Used this StackOverflow page for reference: 
    // https://stackoverflow.com/questions/14643617/create-table-using-javascript
    var div = document.getElementById("table");
    var tbl = document.createElement("table");
    var tbo = document.createElement("tbody");

    var row = document.createElement("tr");
    row.appendChild(document.createElement("th"));

    for (var i = x_lower; i <= x_upper; i++) {
        var x_index = document.createElement("th");
        x_index.innerText = i;
        row.appendChild(x_index);
    }
    tbo.appendChild(row);

    for (var y = y_lower; y <= y_upper; y++) {
        var row = document.createElement("tr");
        var vert_index = document.createElement("th");
        var vert_index_content = document.createTextNode(y);
        vert_index.appendChild(vert_index_content);
        row.appendChild(vert_index);

        for (var x = x_lower; x <= x_upper; x++) {
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
