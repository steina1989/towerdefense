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
    isDragging=false,
    tower=null;
  
    //mynd,
    isDragging=false;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft; // kalla g_canvas arena í staðinn?
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    //console.log(g_mouseX,g_mouseY)

    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
  
    if (!button){
      return;
    }else{
      tower = menuBar.getTower(g_mouseX,g_mouseY);
      //console.log("þessi",tower);
      //isDragging=true;
      //menuBar.drawButton()
      //g_ctx.drawImage(mynd,g_mouseX,g_mouseY,50,50);
}
    
}

function handleMove(evt){

    g_mouseX = evt.clientX - g_canvas.offsetLeft; // kalla g_canvas arena í staðinn?
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    //console.log(g_mouseX,g_mouseY);
    if(!isDragging){
      return;
    }else{
      tower.setPos(g_mouseX,g_mouseY);
      tower.render(g_ctx);
    }

    

}

function handleUp(evt){
  g_mouseX = evt.clientX - g_canvas.offsetLeft; // kalla g_canvas arena í staðinn?
  g_mouseY = evt.clientY - g_canvas.offsetTop;
  isDragging=false;
  //place tower at g_mouseX/Y
  //entityManager.placeTower(g_mouseX,g_mouseY);

}
// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleUp);





