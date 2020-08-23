var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var input = document.getElementById('eqn');
var scale = document.getElementById('scale');
var width = canvas.width;
var height = canvas.height;
var axes = {};
    
function draw() {
	axes.x = canvas.width/2;  
    axes.y = canvas.height/2;
    showAxes(c, axes);
}

//Drawing the axes and the quadrants
function showAxes(c, axes) {
    var x = axes.x;
    var y = axes.y;
    c.beginPath();
    c.strokeStyle = 'white'; 
    c.moveTo(0, y);
    c.lineTo(width, y);  
    c.moveTo(x, 0);
    c.lineTo(x, height);  
    c.stroke();
    c.font = '15px Times New Roman';
    c.fillText('I', 3*width/4, height/4);
    c.strokeText('I', 3*width/4, height/4);
    c.fillText('II', width/4, height/4);
    c.strokeText('II', width/4, height/4);
    c.fillText('III', width/4, 3*height/4);
    c.strokeText('III', width/4, 3*height/4);
    c.fillText('IV', 3*width/4, 3*height/4);
    c.strokeText('IV', 3*width/4, 3*height/4);
}

//Plotting the graph
function drawGraph (c,axes,func,s) {

    c.clearRect(0, 0, width, height);
	draw();

    var xx, yy, dx=4, x = axes.x, y = axes.y;
    var iMax = Math.round((width-x)/dx);
    var iMin = Math.round(-x/dx);
    c.beginPath();
    c.strokeStyle = 'aqua';
   
    for (var i = iMin; i <= iMax; i = i + 0.06) {
        xx = s*i; 
        yy = s*func(i);
        if (i == iMin) {
            c.moveTo(x + xx, y - yy);
        }
        else {
            c.lineTo(x + xx, y - yy);
        }
    }
    c.stroke();

   }

function plot() {
    if(input.value == '') {
        window.alert("Enter a valid function!");
    }
    else {
    var str ="Math.";
    var val = input.value;
    var exp = str.concat(val);
    var s = scale.value;
    
    if(s == '') {
        s=10;
    }
    
    function func(x) {
      return eval(exp);
    }
    
    drawGraph(c,axes,func,s); 
    
    }   
}

//Responding to ENTER
input.addEventListener("keyup", function(event){

	if(event.keyCode == 13) {
		plot();
	}

});

scale.addEventListener("keyup", function(event){

	if(event.keyCode == 13) { 
		plot();
	}

});

draw();
