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
function Balloon(){
	//this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    //this.sprite = this.sprite || g_sprites.rock;
    //this.scale  = this.scale  || 1;
    this.sprite = g_sprites.balloon;
    this._scale = 1;
};

Balloon.prototype=new Entity();

Balloon.prototype.firstCell = Arena.getIndexOfCellNumber(1);
Balloon.prototype.cx = Arena.indexToPos(firstCell).x;
Balloon.prototype.cy = Arena.indexToPos(firstCell).y;
//Balloon.prototype.velX = ...
//Balloon.prototype.velY = ...

Balloon.prototype.update = function(du) {

};

Balloon.prototype.render = function(ctx) {
	// temporary drawing only in cell no. 1
	var currentCell = Arena.getIndexOfCellNumber(1);
	var pos = Arena.indexToPos(currentCell);

	//this.cx = pos.x;
	//this.cy = pos.y

	var origScale = this.sprite.scale;
    // draw scaled sprite
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};

Balloon.prototype.findDirection = function(){
	this.nextX = Arena.nextCellInPath.nextY(this.cx,this.cy);
	this.nextY = Arena.nextCellInPath.nextX(this.cx.this.cy);
};

Balloon.prototype.takeBulletHit = function(){
	this.isDeadNow = true;
	//play sound?

};


var redBloon = new Balloon({
	cx: 50,
	cy: 0,

	isDeadNow: false,
	hitPoints: 1,
	reward: 5,
	speed: 
	direction: 
});

var blueBloon = new Balloon({
	cx: 50,
	cy: 0,

	isDeadNow: false,
	hitPoints: 2,
	reward: 5,
	speed:
	direction: 
});

var greenBloon = new Balloon({
	cx: 50,
	cy: 0,

	isDeadNow: false,
	hitPoints: 3,
	reward: 5,
	speed: 
	direction:
});

var yellowBloon = new Balloon({
	cx: 50,
	cy: 0,
	isDeadNow: false,
	hitPoints: 4,
	reward: 5,
	speed:
	direction: 
});

var whiteBloon = new Balloon({
	cx: 50,
	cy: 0,

	isDeadNow: false,
	hitPoints: 5,
	reward: 5,
	speed:
	direction:
});

var blackBloon = new Balloon({
	cx: 50,
	cy: 0,

	isDeadNow: false,
	hitPoints: 6,
	reward: 5,
	speed:
	direction:
});

