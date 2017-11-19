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
    buttonX = 700,
    buttonY = 150,
    buttonR = 30,
    dx = 0,
    dy = 0,
    distsq = 0,
    rsq = 0,
    tower=null; 


function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft; 
    g_mouseY = evt.clientY - g_canvas.offsetTop;
  
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    dx = g_mouseX - buttonX,
    dy = g_mouseY - buttonY;
    distsq = dx * dx + dy * dy,
    rsq = buttonR * buttonR;


    if (!button){
      return;
    }else if(distsq < rsq){
          countRed=0;
          countBlue=0
          countGreen = 0;
          countYellow =0;
          countWhite = 0;
          countBlack=0;
          currentBalloon="red";
          Arena.balloons1[0]+=5;
          Arena.balloons1[1]+=2;
          Arena.balloons1[2]+=2;
          Arena.balloons1[3]+=2;
          Arena.balloons1[4]+=2;
          Arena.balloons1[5]+=2;

          entityManager.generateLevel();



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
    else {
      //tower = menuBar.getTower(g_mouseX,g_mouseY); <- fokkar öllu upp
      if(tower != null) {
        tower.setPos(g_mouseX,g_mouseY);
        tower.render(g_ctx);
      }
    }
    /*
    // If we are dragging and want to place in a legal spot:
    if (isDragging && (Arena.isLegalTile(g_mouseX, g_mouseY) === 0 && evt.clientX < Arena.WIDTH)){
        tower.setPos(g_mouseX,g_mouseY);
        tower.render(g_ctx);
    }
    // If we are dragging and want to place in an illegal spot:
    else if(isDragging && (Arena.isLegalTile(g_mouseX, g_mouseY) != 0 || evt.clientX > Arena.WIDTH)){
    	tower.setPos(g_mouseX,g_mouseY);
      tower.render(g_ctx);
    }*/
}

function handleUp(evt){
	if(isDragging && tower != null){

		g_mouseX = evt.clientX - g_canvas.offsetLeft; 
		g_mouseY = evt.clientY - g_canvas.offsetTop;
		  
		var pos = Arena.posToIndex(g_mouseX, g_mouseY);
		var row = pos.row;
		var column = pos.column;

    // If we are dragging and want to place in a legal spot:
		if(Arena.isLegalTile(g_mouseX, g_mouseY) && evt.clientX < Arena.WIDTH){ 
			// breyta í placeTower að staðsetning sé miðja reits
			// gera snap to middle aðferð
		  	tower.isPlaced = true;
        playerInfo.coins -= Tower.towerType.properties[Tower.towerType.DIAMOND].price;
		  	isDragging = false;
		  	console.log(tower, "legal spot", "Tile legal?: ", Arena.isLegalTile(g_mouseX, g_mouseY));
		  	Arena.grid[row][column] = -1;
		}

		// If we are dragging and want to place in an illegal spot:
    else if(!Arena.isLegalTile(g_mouseX, g_mouseY) || evt.clientX > Arena.WIDTH){
      return;
			/*g_mouseX = evt.clientX - g_canvas.offsetLeft; 
			g_mouseY = evt.clientY - g_canvas.offsetTop;
			tower.isPlaced = false;
		  isDragging = true;
		  console.log(tower, "legal tile? ", Arena.isLegalTile(g_mouseX, g_mouseY));*/
		}
	}
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleUp);