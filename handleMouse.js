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
    mynd;

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








