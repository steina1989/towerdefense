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
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft; // kalla g_canvas arena í staðinn?
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
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
      currentBalloon="red";
      Arena.balloons1[0]+=5;
      Arena.balloons1[1]+=2;



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

/*Arena.posToIndex = function(x,y){
	var column = Math.floor((x - this.ORIGINX) / this.cellWidth);
	var row = Math.floor((y - this.ORIGINY) / this.cellHeight);
	return {
		row : row,
		column : column

	}
}*/

function handleUp(evt){
	if(isDragging){
		g_mouseX = evt.clientX - g_canvas.offsetLeft; 
		g_mouseY = evt.clientY - g_canvas.offsetTop;
		  
		var pos = Arena.posToIndex(g_mouseX, g_mouseY);
		var row = pos.row;
		var column = pos.column;
		if(Arena.grid[row][column] === 0){ 
			// ASDF tower er undefined hér, why??
			// breyta í placeTower að staðsetning sé miðja reits
		  	tower.isPlaced = true;
		  	isDragging = false;
		  	console.log(tower, "legal spot", tower);
		}
		else {
			g_mouseX = evt.clientX - g_canvas.offsetLeft; 
			g_mouseY = evt.clientY - g_canvas.offsetTop;
			tower.isPlaced = false;
		  	isDragging = false;
		  	console.log(tower, "illegal spot", tower);

		}
		// posToIndex fall til að segja hvort sé í löglegum reit
		if(tower.isPlaced){
      playerInfo.coins -= Tower.towerType.properties[Tower.towerType.DIAMOND].price;
    }
	}

}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMove);
window.addEventListener("mouseup", handleUp);