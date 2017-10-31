// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Tower(descr) {
	this.setup(descr);
};

Tower.prototype = new Entity();

Tower.prototype.bulletDirection = function(balloon) {
	// Position of balloon
	var posB = {
		x: balloon.cx,
		y: balyloon.cy
	};

	// Position of tower
	var posT = {
		x: this.cx,
		y: this.cy
	};

	// Return the angle between these 2 entities in Radians
	return Math.atan2(posT.y - posB.y, posT.x - posB.x);
}

Tower.prototype.inRange = function(balloon){
	var dist = utils.distSq(balloon.cx, balloon.cy,
    	 			  this.cx, this.cy);
	if(dist <= this.range) {
		return true;
	}
	return false;
}

Tower.prototype.update = function (du) {    

	// Distance between nearest balloon and tower
    var nearestBln = this.findNearestBalloon();
    
    // If nearest balloon is in range, shoot it
    if(inRange(nearestBln)) {
    	var damage = this.bulletDamage;
    	var speed = this.bulletSpeed;
    	var direction = this.bulletDirection;
		generateBullet(speed, damage, direction);
		// hraði blaðranna er hunsanlegur
	}
}

Tower.prototype.generateBullet(damage, speed, direction, balloon) {
	
	// Initiates bullet with correct direction
    var dirn = this.bulletDirection(balloon); 
    bullet.velX = speed * Math.cos(dirn);
    bullet.velY = speed * Math.sin(dirn);
    // í Bullet.update verður að uppfæra posX og posY
    // með því að nota velX og velY.
}

Tower.prototype.render = function (ctx) {
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};

Tower.prototype.findNearestBalloon() {
	// Leitar gegn um allar blöðrurnar (fylki)
	// Skilar blöðru hlut í minnstri fjarlægð
	var shortestDist = Number.MAX_VALUE;
	// for all balloons:
	// balloons[i] er blaðran sem við erum að skoða "núna"
		var dist = utils.distSq(balloons[i].cx, balloons[i].cy,
							this.cx, this.cy);
		//var nearestBalloon = balloons[i];
		if(dist < shortestDist) {
			nearestBalloon = balloons[i];
		}
	return closestBalloon;
}