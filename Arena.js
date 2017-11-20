// ====
// Arena stuff.
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var DIR_ENUM = {
	LEFT: [-1,0],
	RIGHT: [1,0],
	UP: [0,-1],
	DOWN: [0,1]
}


var Arena = {

	// Upper left coordinates
	ORIGINX : 0,
	ORIGINY : 0,

	WIDTH : 600,
	HEIGHT : 600,

	numRows : 10,
	numColumns : 10,

	cellWidth : 60,
	cellHeight : 60,

	balloons1 : [0,0,0,0],

	level : 0,


	grid :
	[[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
	 [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
	 [ 1,  2,  3,  4,  5,  6,  7,  8,  0,  0],
	 [ 0,  0,  0,  0,  0,  0,  0,  9,  0,  0],
	 [ 0,  0,  0, 14, 13, 12, 11, 10,  0,  0],
	 [ 0,  0,  0, 15,  0,  0,  0,  0,  0,  0],
	 [ 0,  0,  0, 16,  0,  0,  0,  0,  0,  0],
	 [ 0,  0,  0, 17, 18, 19, 20,  0,  0,  0],
	 [ 0,  0,  0,  0,  0,  0, 21,  0,  0,  0],
	 [ 0,  0,  0,  0,  0,  0, 22,  0,  0,  0]]
};




/**
cx and cy is the current position of a balloon
the function will return a two-tuple object containing
the direction that the balloon should be travelling  in, 
in order to reach the next cell in its path.
**/
Arena.getDirection = function(cx,cy){
	var indexCurrent = this.posToIndex(cx,cy);
   
    if (indexCurrent.row >= this.numRows-1 || indexCurrent.column >= this.numColumns-1){
    	return entityManager.KILL_ME_NOW;
    }

    var cellNumber = this.grid[indexCurrent.row][indexCurrent.column]
    var indexNext = this.getIndexOfCellNumber(cellNumber+1);



    if (indexNext.row > indexCurrent.row) return DIR_ENUM.DOWN;
    if (indexNext.row < indexCurrent.row) return DIR_ENUM.UP;
    if (indexNext.column > indexCurrent.column) return DIR_ENUM.RIGHT;
    if (indexNext.column < indexCurrent.column) return DIR_ENUM.LEFT;
}

Arena.testGetDirection = function(cx,cy){
	var output = this.getDirection(cx,cy)
	if (output === DIR_ENUM.RIGHT) console.log("Right");
	else if (output === DIR_ENUM.LEFT) console.log("Left");
	else if (output === DIR_ENUM.UP) console.log("Up");
	else if (output === DIR_ENUM.DOWN) console.log("Down");
}

Arena.getIndexOfCellNumber = function(cellNumber){
	for (var row = 0; row<this.grid.length; row++)
		for (var column = 0; column<this.grid[0].length; column++){
			 if (cellNumber === this.grid[row][column]){
				return {row:row, column:column};
			}
		}
}

Arena.posToIndex = function(x,y){
	var column = Math.floor((x - this.ORIGINX) / this.cellWidth);
	var row = Math.floor((y - this.ORIGINY) / this.cellHeight);
	return {
		row : row,
		column : column

	}
}

Arena.indexToPos = function(row,column){
	var pix =  this.ORIGINX + this.cellWidth * column;
	var piy =  this.ORIGINY + this.cellHeight * row;
	pix = pix + this.cellWidth/2;
	piy = piy + this.cellHeight/2;
	return {
		x : pix,
		y : piy
	}
}


//Draw pretty background
Arena.render = function(ctx) {
	this.drawBackground(ctx);
}

// Placeholder backdrop
Arena.drawBackground = function(ctx){
	ctx.beginPath();
	ctx.save;
	ctx.strokeStyle="black";
	ctx.drawImage(g_images.background, 0,0, this.WIDTH, this.HEIGHT);
	ctx.stroke();
	ctx.restore;
}


// Visualises the grid.
Arena.renderDiagnostics = function(ctx){
	for (var x = 0; x < this.numRows; x++)
	{
		for (var y = 0; y < this.numColumns; y++)
		{
			if (this.grid[x][y] > 0){
				var pos = this.indexToPos(x,y)
				var posX = 	pos.x;
				var posY = pos.y;
				this._drawArrayPath(ctx,posX,posY); 
			}
		}
	}	
}

//Draws a path over the background
Arena._drawArrayPath = function(ctx,x,y){
	ctx.beginPath();
	ctx.save;
	ctx.strokeStyle="black";
	ctx.rect(x-this.cellWidth/2,y-this.cellWidth/2,this.cellWidth,this.cellHeight);
	ctx.stroke();
	ctx.restore;
}

Arena.generateLevel = function(balloonType) {
	entityManager.generateBalloon(balloonType);
}

Arena.isLegalTile = function(x, y) {
	var pos = this.posToIndex(x, y);
	var row = pos.row;
	var column = pos.column;
	return this.grid[row][column] === 0;
}
