// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
//Global variables
var g_mouseX, g_mouseY, dx, dy, distsq, rsq = 0,
    isDragging=false,
    buttonX = 700,
    buttonY = 150,
    buttonR = 30,
    tower=null;

function handleMouse(evt) {
    g_mouseX = evt.clientX - g_canvas.offsetLeft; 
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    var button = evt.buttons === undefined ? evt.which : evt.buttons;

    //Check if we already have a tower selected
    if(tower != null){
      var pos = Arena.posToIndex(g_mouseX, g_mouseY);
      var row = pos.row;
      var column = pos.column;

      // If we want to place tower in a legal spot:
      if(Arena.isLegalTile(evt.clientX, evt.clientY) && evt.clientX < Arena.WIDTH){
        tower.isPlaced = true;
        playerInfo.coins -= tower.price;

        //Change tile so we can't place tower on top of tower
        Arena.grid[row][column] = -1;
    

    // If we try to place tower in an illegal spot
     }else if(!Arena.isLegalTile(evt.clientX, evt.clientY) || evt.clientX > Arena.WIDTH){
      tower.isPlaced=false;
      return;
    }
  }

    dx = g_mouseX - buttonX,
    dy = g_mouseY - buttonY;
    distsq = dx * dx + dy * dy,
    rsq = buttonR * buttonR;

    // If no button is being pressed, then bail
    if (!button){
      return;

    //If we click inside "next wave" button
    }else if(distsq < rsq){
          countRed, countBlue, countGreen, countYellow = 0;
          currentBalloon="red";

          //Increse balloons by each level
          Arena.balloons1[0]+=5;
          Arena.balloons1[1]+=2;
          Arena.balloons1[2]+=2;
          Arena.balloons1[3]+=0.4;

          entityManager.generateLevel();
      }
      else
      {
        tower = menuBar.getTower(g_mouseX,g_mouseY);
    }  
  }

function handleMove(evt){

    g_mouseX = evt.clientX - g_canvas.offsetLeft; 
    g_mouseY = evt.clientY - g_canvas.offsetTop;

    //Tower follows the mouse
    if(tower != null){
      tower.setPos(g_mouseX,g_mouseY);
      tower.render(g_ctx);
    }
}

window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
