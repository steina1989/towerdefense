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
  
    //mynd

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft; 
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    console.log("er í handleMouse");
    
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

    g_mouseX = evt.clientX - g_canvas.offsetLeft; 
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    //console.log(g_mouseX,g_mouseY);
    // If we're not dragging a tower, do nothing
    if(!isDragging){
        return;
    }
    // If we are dragging and want to place in a legal spot:
    else if (tower.getTileValue(g_mouseX, g_mouseY) === 0 || evt.clientX > Arena.WIDTH){
        tower.setPos(g_mouseX,g_mouseY);
        tower.render(g_ctx);
    }
    // If we are dragging and want to place in an illegal spot:
    else {
    	tower.setPos(g_mouseX,g_mouseY);
        tower.render(g_ctx);
    }
}

function handleUp(evt){
	if(isDragging){
		g_mouseX = evt.clientX - g_canvas.offsetLeft; 
		g_mouseY = evt.clientY - g_canvas.offsetTop;
		  
		var pos = Arena.posToIndex(g_mouseX, g_mouseY);
		var row = pos.row;
		var column = pos.column;
		if(tower.getTileValue(g_mouseX, g_mouseY) === 0){ 
			// ASDF tower er undefined hér, why??
			// breyta í placeTower að staðsetning sé miðja reits
			// gera snap to middle aðferð
		  	tower.isPlaced = true;
		  	isDragging = false;
		  	console.log(tower, "legal spot", tower);
		  	Arena.grid[row][column] = -1;
		}
		else {
			g_mouseX = evt.clientX - g_canvas.offsetLeft; 
			g_mouseY = evt.clientY - g_canvas.offsetTop;
			tower.isPlaced = false;
		  	isDragging = true;
		  	console.log(tower, "illegal spot", tower);
		  	return;
		}
		// posToIndex fall til að segja hvort sé í löglegum reit
		// if isPlaced, minnka coins
	}
	else {
		return;
	}
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleUp);