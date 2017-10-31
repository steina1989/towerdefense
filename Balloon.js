// ====
// Balloon stuff.
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
/*
function Balloon(descr){
	this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.rock;
    this.scale  = this.scale  || 1;
}*/

Balloon.prototype.findDirection(){
	this.nextX = Arena.nextCellInPath.nextY(this.cx,this.cy);
	this.nextY = Arena.nextCellInPath.nextX(this.cx.this.cy);
}

Balloon.prototype.takeBulletHit(){
	this.isDeadNow = true;
	//play sound?

}

Balloon.prototype=new Entity();

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

