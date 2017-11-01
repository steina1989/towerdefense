// ====
// Arena stuff.
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var Arena = function()
{

	// Upper left coordinates
	this.ORIGINX = 0;
	this.ORIGINY = 0;

	this.WIDTH = 500;
	this.HEIGHT = 500;

	this.numRows = 10;
	this.numColumns = 10;

	this.cellWidth = this.width/this.numColumns;
	this.cellHeight = this.height/this.numRows

	this.START = 1;
	this.STOP = 14;

	var a = this.START;
	var b = this.STOP;

  
  
function posToIndex(x,y){
	var column = Math.floor((x - this.ORIGINX) / this.cellWidth);
	var row = Math.floor((y - this.ORIGINY) / this.cellHeight);
	return {
		column : column,
		row : row
	}
}

	this.grid = 
	[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	 [a, 2, 3, 0, 0, 0, 0, 0, 0, 0],
	 [0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
	 [0, 0, 5, 6, 7, 8, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, 9, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, 10, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, 11, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, 12, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, 13, 0, 0, 0, 0],
	 [0, 0, 0, 0, 0, b, 0, 0, 0, 0]];	


	 /**
	  cx and cy is the current position of a balloon
	  the function will return a two-tuple object containing
	  the direction that the balloon should be travelling  in, 
	  in order to reach the next cell in its path.
	 **/
	function nextCellInPath(cx,cy){
	var index = posToIndex(cx,cy);
    var cellNumber = this.array[index.row][index.column]
    // find index of the next
	}


}

