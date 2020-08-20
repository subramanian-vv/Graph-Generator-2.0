var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var input = document.getElementById('eqn');
var scale = document.getElementById('scale');
var width = canvas.width;
var height = canvas.height;
var axes={};
    
function draw() {
	axes.x = 0.5 + 0.5*canvas.width;  
    axes.y = 0.5 + 0.5*canvas.height;
    axes.scale = 40;                  
    axes.neg = true;
    showAxes(c, axes);
}
    
let scope = {
        x: -width/2
    };

//Drawing the axes and the quadrants
function showAxes(c, axes) {
    var x = axes.x, 
        w = c.canvas.width;
    var y = axes.y, 
        h = c.canvas.height;
    var xmin = axes.neg ? 0 : x;
    c.beginPath();
    c.strokeStyle = 'white'; 
    c.moveTo(xmin, y);
    c.lineTo(w, y);  
    c.moveTo(x, 0);
    c.lineTo(x, h);  
    c.stroke();
    c.font = '15px Times New Roman';
    c.fillText('I', 3*w/4, h/4);
    c.strokeText('I', 3*w/4, h/4);
    c.fillText('II', w/4, h/4);
    c.strokeText('II', w/4, h/4);
    c.fillText('III', w/4, 3*h/4);
    c.strokeText('III', w/4, 3*h/4);
    c.fillText('IV', 3*w/4, 3*h/4);
    c.strokeText('IV', 3*w/4, 3*h/4);
}

//Plotting the graph
function drawGraph (c,axes,func,s) {

    c.clearRect(0, 0, width, height);
	draw();

    var xx, yy, dx=4, x = axes.x, y = axes.y;
    var iMax = Math.round((c.canvas.width-x)/dx);
    var iMin = axes.neg ? Math.round(-x/dx) : 0;
    c.beginPath();
    c.lineWidth = 1;
    c.strokeStyle = 'aqua';
   
    for (var i = iMin; i <= iMax; i = i+0.06) {
        scope.x = i;
        xx = s*i; 
        yy = s*func();
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
      var x = scope.x;
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