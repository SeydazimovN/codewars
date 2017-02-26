var cnt = 0;
var was = false;

function goPaint(canvas) {
    console.log("here we go!");
    console.log(canvas);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWith = 2;

    var drawing = false;
    var mousePos = { x: 0, y: 0};
    var lastPos = mousePos;
    canvas.addEventListener("mousedown", function(e) {
        drawing = true;
        console.log("in MouseDown");
        last = getMousePos(canvas, e);
        console.log(last);
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        drawing = false;
        was = 0;
        console.log("in MouseUp");
    }, false);
    canvas.addEventListener("mousemove", function(e) {
        mousePos = getMousePos(canvas, e);
        if (drawing) was = 1;
    }, false); 
    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    // Get a regular interval for drawing to the screen
    window.requestAnimFrame = (function (callback) {
            return window.requestAnimationFrame || 
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimaitonFrame ||
               function (callback) {
            window.setTimeout(callback, 1000/60);
               };
    })();

    function renderCanvas() {
        if (drawing) {
            if (!was) 
                lastPos = mousePos;
            cnt++;
            console.log(cnt);
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }
    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();   
}

$(document).ready(function(){
    var canvas = document.getElementById("myCanvas");
    goPaint(canvas);
});

