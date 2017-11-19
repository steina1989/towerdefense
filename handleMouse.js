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
    console.log("er í handleMouse");
    
    //console.log(g_mouseX,g_mouseY)

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
<<<<<<< HEAD
		  isDragging = false;
		  console.log(tower, "illegal spot", tower);

=======
		  	isDragging = false;
		  	console.log(tower, "illegal spot", tower);
        return;
>>>>>>> 00e8795e4e3df4dfc38d0737300584f2638a5f27
		}
		// posToIndex fall til að segja hvort sé í löglegum reit
		if(tower.isPlaced){
      playerInfo.coins -= Tower.towerType.properties[Tower.towerType.DIAMOND].price;
    }
	}
	else {
		return;
	}
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleUp);