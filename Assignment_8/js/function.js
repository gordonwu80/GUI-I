/*
File: https://gordonwu80.github.io/Assignment_8/function.js
(91.46) COMP 4610 GUI Programming I
Assignment 8: Creating an Interactive Dynamic Table
Gordon Wu, UMass Lowell Computer Science, gwu@cs.uml.edu
Description: Recieves the user inputs from the jQuery sliders 
             and then prints out the multiplication table and 
             the user is able to save the tables through tabs.
*/

$(document).ready(function() {
    sliders();
    validate_input();
    valid_submit();
    $.validator.addMethod("greater_than", function(value, element, param) {
        var $otherElement = $(param);
        return parseInt(value, 10) >= parseInt($otherElement.val(), 10);
    });
});

/*
  function valid_submit()
  Description: Makes sure all the inputs are valid and then sumbits the input
               and returns false if the inputs do not work.
*/
function valid_submit() {
    if($("#user_input").valid()){
        $("#user_input").submit();
    }else{
        return false;
    }
}

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
  function validate_input()
  Description: Makes sure all the inputs are valid and then sumbits the input
               and returns false if the inputs do not work.
*/
function validate_input() {  
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
       
       submitHandler: function(event) {
           create_table();
           return false;
       },

       invalid: function(event) {
            $("#table").empty();
       }
    });
}

/*
  function sliders()
  Description: Creates the sliders used to input the bounds for the
               table.
*/
function sliders() {
    // First Slider 
    $("#slider_1").slider({
        min: 1,
        max: 20,
        slide:function(event,ui) {
            $("#x_lower").val(ui.value);
            valid_submit();
        }
    });
    $("#x_lower").change(function(){
        $("#slider_1").slider("value", this.value);
        valid_submit();
    })

    // Second Slider
    $("#slider_2").slider({
        min: 1,
        max: 20,
        slide:function(event,ui) {
            $("#x_upper").val(ui.value);
            valid_submit();
        }
    });
    $("#x_upper").change(function(){
        $("#slider_2").slider("value", this.value);
        valid_submit();
    })

    // Third Slider
    $("#slider_3").slider({
        min: 1,
        max: 20,
        slide:function(event,ui) {
            $("#y_lower").val(ui.value);
            valid_submit();
        }
    });
    $("#y_lower").change(function(){
        $("#slider_3").slider("value", this.value);
        valid_submit();
    })

    // Fourth Slider
    $("#slider_4").slider({
        min: 1,
        max: 20,
        slide:function(event,ui) {
            $("#y_upper").val(ui.value);
            valid_submit();
        }
    });
    $("#y_upper").change(function(){
        $("#slider_4").slider("value", this.value);
        valid_submit();
    })
}

var list_length = 1;

/*
  function save_table()
  Description: Saves the table with the user inputed slider inputs.
*/
function save_table() {
    var horiz_lower = Number(document.getElementById("x_lower").value);
    var horiz_upper = Number(document.getElementById("x_upper").value);
    var vert_lower  = Number(document.getElementById("y_lower").value);
    var vert_upper  = Number(document.getElementById("y_upper").value);

    var x = $("#saved_tabs li").length + 1;
    
    if ( x > 5 ) {
        return false;
    }

    $("#saved_tabs").tabs();
    list_length++;

    var title = "<li class='tab'><a href='#tab-" + list_length + "'>" + "("+ horiz_lower +
    "," + horiz_upper + "," + vert_lower + "," + vert_upper + ")" + "</a>" +
    "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";
    $( "div#saved_tabs ul" ).append( title );

    $("div#saved_tabs").append('<div id=tab-' + list_length + '>'+'<table class="table table-bordered table-hover"' + $("#table").html() +'</table>'+ '</div>');

    $("div#saved_tabs").append(create_table());
    $("#saved_tabs").tabs("refresh");

    $("#saved_tabs").tabs("option", "active", -1);

    $("#saved_tabs").delegate( "span.ui-icon-close", "click", function() {
        var num_li = $(this).closest("li").remove().attr("aria-controls");
        $("#" + num_li).remove();
    });
}

/*
 function create_table(x_lower, x_upper, y_lower, y_upper)
 Descripton: Creates a multiplication table using the data inputed by the user
              from the jquery sliders.
*/
function create_table() {
    var horiz_lower = Number(document.getElementById("x_lower").value);
    var horiz_upper = Number(document.getElementById("x_upper").value);
    var vert_lower  = Number(document.getElementById("y_lower").value);
    var vert_upper  = Number(document.getElementById("y_upper").value);

    // Used this StackOverflow page for reference: 
    // https://stackoverflow.com/questions/14643617/create-table-using-javascript
    var div = document.getElementById("table");
    var tbl = document.createElement("table");
    var tbo = document.createElement("tbody");

    var row = document.createElement("tr");
    row.appendChild(document.createElement("th"));

    for (var i = horiz_lower; i <= horiz_upper; i++) {
        var x_index = document.createElement("th");
        x_index.innerText = i;
        row.appendChild(x_index);
    }
    tbo.appendChild(row);

    for (var y = vert_lower; y <= vert_upper; y++) {
        var row = document.createElement("tr");
        var vert_index = document.createElement("th");
        var vert_index_content = document.createTextNode(y);
        vert_index.appendChild(vert_index_content);
        row.appendChild(vert_index);

        for (var x = horiz_lower; x <= horiz_upper; x++) {
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
