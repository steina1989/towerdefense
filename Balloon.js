// ====
// Balloon stuff.
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

function Balloon(descr){
	this.setup(descr);
	this.balloonType;
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.redbloon;
    
    var firstCell = Arena.getIndexOfCellNumber(1);
    var pos = Arena.indexToPos(this.firstCell.row, this.firstCell.column);
    this.cx = pos.x;
    this.cy = pos.y;

    this.direction = Arena.getDirection(this.cx, this.cy);

};

Balloon.prototype = new Entity();

Balloon.prototype.currentCellNumber = 1;
Balloon.prototype.firstCell = Arena.getIndexOfCellNumber(1);
Balloon.prototype.currentCell = this.firstCell;
Balloon.prototype.cx = 0;
Balloon.prototype.cy = 0; 

Balloon.prototype.velX;
Balloon.prototype.velY;
Balloon.prototype.direction;


Balloon.init = function() {
	this.balloonType = {
		RED : 1,
		BLUE : 2,
		GREEN : 3,
		YELLOW : 4,

		properties: {
			1: {name: "red", penalty: 1, speed: 1.5, timeToNextOne: 20, sprite: g_sprites.redbloon, type: "balloon"},
			2: {name: "blue", penalty: 2, speed: 1.5, timeToNextOne: 20, sprite: g_sprites.bluebloon, type: "balloon"},
			3: {name: "green", penalty: 3, speed: 2, timeToNextOne: 30, sprite: g_sprites.greenbloon, type: "balloon"},
			4: {name: "yellow", penalty: 4, speed: 2.5, timeToNextOne: 50, sprite: g_sprites.yellowbloon, type: "balloon"}
		}
	};
};


Balloon.prototype.update = function(du) {

	spatialManager.unregister(this);

	if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
	}

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
    	playerInfo.lives -= this.penalty;
    }

    this.velX *= newDirection[0];
    this.velY *= newDirection[1];

    this.direction = newDirection;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    if (this.isColliding()) {
    	this.takeBulletHit();
    	this._isDeadNow = true;
    }

    spatialManager.register(this);
};

Balloon.prototype.findDirection = function(){
    var dir = Arena.nextCellInPath.nextY(this.cx,this.cy);
    this.nextX = dir.nextY;
    this.nextY = dir.nextX;
};

Balloon.prototype.render = function(ctx) {
	if (this._isDeadNow) 
		return;

	var newPosIndex = Arena.posToIndex(this.cx, this.cy);
	if (newPosIndex != currentCell) {
		this.currentCellNumber++;
	}
	var currentCell = Arena.getIndexOfCellNumber(this.currentCellNumber);
	var pos = Arena.indexToPos(currentCell);

	var origScale = this.sprite.scale;
    this.sprite.drawCentredAt(ctx, this.cx,this.cy,0);
};

//This function checks if there is another balloon inside the balloon that dies
Balloon.prototype.takeBulletHit = function(){
	if (this.name != "red") {
	if (this.name === "blue") {
		var newBalloon = new Balloon(Balloon.balloonType.properties[Balloon.balloonType.RED]);
		newBalloon.cx = this.cx, newBalloon.cy = this.cy;
		newBalloon.velX = this.velX, newBalloon.velY = this.velY;
        //Red balloon is inside blue
		entityManager._balloons.push(newBalloon);
	}

	else if (this.name === "green") {
		var newBalloon = new Balloon(Balloon.balloonType.properties[Balloon.balloonType.BLUE]);
		newBalloon.cx = this.cx, newBalloon.cy = this.cy;
		newBalloon.velX = this.velX, newBalloon.velY = this.velY;
        //Blue balloon is inside green
		entityManager._balloons.push(newBalloon);
	}

	else if (this.name === "yellow") {
		var newBalloon = new Balloon(Balloon.balloonType.properties[Balloon.balloonType.GREEN]);
		newBalloon.cx = this.cx, newBalloon.cy = this.cy;
		newBalloon.velX = this.velX, newBalloon.velY = this.velY;
        //Green balloon is inside yellow
		entityManager._balloons.push(newBalloon);
	}}

	this.kill();
};

Balloon.prototype.getRadius = function() {
    return (this.sprite.width/2) * 0.8;
};

