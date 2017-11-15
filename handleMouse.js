// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0,
    //mynd,
    isDragging=false;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft; // kalla g_canvas arena í staðinn?
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    //console.log(g_mouseX,g_mouseY)

    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
  
    if (!button) return;
    mynd = menuBar.getTower(g_mouseX,g_mouseY,g_ctx);
    //menuBar.drawButton()
    g_ctx.drawImage(mynd,g_mouseX,g_mouseY,50,50);

    
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
window.addEventListener("mouseup", handleMouse);

/*$(function(){


    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0,0);
    };
    img.src = "http://images.christmastimeclipart.com/images/2/1271716593176_1788/img_1271716593176_17881.jpg";

    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");


var canvasOffset=$("#canvas").offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    var canvasWidth=canvas.width;
    var canvasHeight=canvas.height;
    var isDragging=false;

    function handleMouseDown(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // set the drag flag
      isDragging=true;
    }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // user has left the canvas, so clear the drag flag
      //isDragging=false;
    }

    function handleMouseMove(e){
      canMouseX=parseInt(e.clientX-offsetX);
      canMouseY=parseInt(e.clientY-offsetY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging){
          ctx.clearRect(0,0,canvasWidth,canvasHeight);
          ctx.drawImage(img,canMouseX-128/2,canMouseY-120/2,128,120);
      }
    }

    $("#canvas").mousedown(function(e){handleMouseDown(e);});
    $("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUp(e);});
    $("#canvas").mouseout(function(e){handleMouseOut(e);});


*/



