// ====
// Balloon stuff.
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

//function Balloon(descr){
function Balloon(descr){
	this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.balloon;
    //this.scale  = this.scale  || 1;
    //this._scale = 1;
    
    var firstCell = Arena.getIndexOfCellNumber(1);
    var pos = Arena.indexToPos(this.firstCell.row, this.firstCell.column);
    this.cx = pos.x;
    this.cy = pos.y;

    this.direction = Arena.getDirection(this.cx, this.cy);

    
    //console.log(this.cy);
    //console.log(this.firstCell);
    //console.log(Arena.indexToPos(this.firstCell.row, this.firstCell.column));

};

Balloon.prototype = new Entity();

Balloon.prototype.currentCellNumber = 1;
Balloon.prototype.firstCell = Arena.getIndexOfCellNumber(1);
Balloon.prototype.currentCell = this.firstCell;
//Balloon.prototype.pos = Arena.indexToPos(this.firstCell.row, this.firstCell.column);
Balloon.prototype.cx = 0; //Arena.indexToPos(this.firstCell).x;
Balloon.prototype.cy = 0; //Arena.indexToPos(this.firstCell).y;
//Balloon.prototype.cx = this.pos.x;
//Balloon.prototype.cy = this.pos.y;
Balloon.prototype.velX;
Balloon.prototype.velY;
Balloon.prototype.direction;

Balloon.prototype.update = function(du) {


	if (this._isDeadNow)
        return entityManager.KILL_ME_NOW;

    this.velX = this.speed;
    this.velY = this.speed;

    var newX = this.cx;
    var newY = this.cy;

    if (this.direction[0] === 1) {
    	newX = this.cx-Arena.cellWidth/2;
    }
    if (this.direction[0] === -1) {
    	newX = this.cx+Arena.cellWidth/2;
    }
    if (this.direction[1] === 1) {
    	newY = this.cy-Arena.cellHeight/2;
    }
    if (this.direction[1] === -1) {
    	newY = this.cy+Arena.cellHeight/2;
    }

    var newDirection = Arena.getDirection(newX, newY);
    if (newDirection === entityManager.KILL_ME_NOW){
    	this._isDeadNow = true;
    }

    this.velX *= newDirection[0];
    this.velY *= newDirection[1];

    this.direction = newDirection;

    this.cx += this.velX * du;
    this.cy += this.velY * du;



};

Balloon.prototype.render = function(ctx) {
	if (this._isDeadNow) 
		return

	var newPosIndex = Arena.posToIndex(this.cx, this.cy);
	if (newPosIndex != currentCell) {
		this.currentCellNumber++;
	}
	var currentCell = Arena.getIndexOfCellNumber(this.currentCellNumber);
	var pos = Arena.indexToPos(currentCell);

	var origScale = this.sprite.scale;
    // draw scaled sprite
    //this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(ctx, this.cx,this.cy,0);
    //this.sprite.scale = origScale;
};

Balloon.prototype.findDirection = function(){
	this.nextX = Arena.nextCellInPath.nextY(this.cx,this.cy);
	this.nextY = Arena.nextCellInPath.nextX(this.cx,this.cy);
};

Balloon.prototype.takeBulletHit = function(){
	this.isDeadNow = true;
	//play sound?

};

/*
var redBloon = new Balloon({
	cx: 50,
	cy: 0,

	hitPoints: 1,
	reward: 5,
	speed: 5
});

var blueBloon = new Balloon({
	cx: 50,
	cy: 0,

	hitPoints: 2,
	reward: 5,
	speed: 5
});

var greenBloon = new Balloon({
	cx: 50,
	cy: 0,

	hitPoints: 3,
	reward: 5,
	speed: 5
});

var yellowBloon = new Balloon({
	cx: 50,
	cy: 0,
	hitPoints: 4,
	reward: 5,
	speed: 5
});

var whiteBloon = new Balloon({
	cx: 50,
	cy: 0,

	hitPoints: 5,
	reward: 5,
	speed: 5
});

var blackBloon = new Balloon({
	cx: 50,
	cy: 0,

	hitPoints: 6,
	reward: 5,
	speed: 5
});

*/