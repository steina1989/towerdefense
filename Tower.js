// ==========
// TOWER STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
// Needs to know and take in "type"
function Tower(descr) {
	this.towerType;
	this.setup(descr);
	this.cx = 300;
	this.cy = 350;

	this.rotation=0;

	this.range *= this.range;
	var d =  new Date();
	this.lastTime = d.getTime();
	this.isPlaced = false;

}


Tower.init = function() {
	this.towerType = {
		BRAIN : 1,
		SPYRO : 2,
		DIAMOND : 3,
		PAT: 4,
		properties: {
			1: {name: "brain", fireDelay: 1000, price: 120, range: 100, bulletDamage: 1, bulletSpeed: 3, sprite: g_sprites.twrHeili, isPlaced: false},
			2: {name: "spyro", fireDelay: 700, price: 200, range: 135, bulletDamage: 2, bulletSpeed: 5, sprite: g_sprites.twrSpyro, isPlaced: false},
			3: {name: "diamond", fireDelay: 500, price: 550, range: 160, bulletDamage: 2, bulletSpeed: 7, sprite: g_sprites.twrDiamond,isPlaced: false},
			4: {name: "pat", fireDelay: 200, price: 2000, range: 180, bulletDamage: 3, bulletSpeed: 9, sprite: g_sprites.twrPat, isPlaced: false}
		}
	};
};

/*
In order to be able to construct different types of towers, 
need to have a constructor that takes in type (which can be
defined in Tower.js as an array/enum/something) and the 
tower then has the properties of the type.
*/

Tower.prototype = new Entity();

// The tower generates bullet (fires) in the direction
// it is facing.
Tower.prototype.findAngle = function(balloon) {
	// Position of balloon
	var posB = {
		x: balloon.cx,
		y: balloon.cy
	};

	// Position of tower
	var posT = {
		x: this.cx,
		y: this.cy
	};

	// Return the angle between these 2 entities in Radians
	return Math.atan2(posT.y - posB.y, posT.x - posB.x) - Math.PI/2;
};

Tower.prototype.inRange = function(balloon){
	if (balloon){
		var dist = util.distSq(balloon.cx, balloon.cy,
	    	 			  this.cx, this.cy);
		if(dist <= this.range) 
			return true;

	}
	return false;
};



Tower.prototype.update = function (du) {    
	//Make sure tower does not shoot if it has not been placed
	if(this.isPlaced){
		// Distance between nearest balloon and tower
	    var nearestBln = this.findNearestBalloon();
	    
	    // If nearest balloon is in range, shoot it
	    if(this.inRange(nearestBln)) {
	    	var damage = this.bulletDamage;
	    	var speed = this.bulletSpeed;
	    	this.rotation = this.findAngle(this.findNearestBalloon());
	    	var dX = +Math.sin(this.rotation);
	        var dY = -Math.cos(this.rotation);
	        var relVelX = dX * speed;
	        var relVelY = dY * speed;
	        var launchDist = this.sprite.width * 1.2;

	    	var now = new Date();
	    	var currentTime = now.getTime();

	    	if (currentTime - this.lastTime > this.fireDelay) {
	    		entityManager.fireBullet(this.cx + dX, this.cy + dY, relVelX, relVelY, 0);
	    		firstTime = false;
	    		this.lastTime = currentTime;
	    	}
	    }
	}
};

Tower.prototype.render = function (ctx) {
	if (this._isDeadNow) 
		return;
	
    this.sprite.drawCentredAt(ctx, 
    	this.cx, 
    	this.cy, 
    	this.rotation
    );

    //Draw a pretty circle around towers to know their range
    if(!this.isPlaced){
    	ctx.strokeStyle = "red";
    	util.strokeCircle(ctx, this.cx, this.cy, Math.sqrt(this.range));
    	ctx.fillStyle = "rgba(240, 80, 100, 0.3)";
    	util.fillCircle(ctx, this.cx, this.cy, Math.sqrt(this.range));
    }
};

//Function that returns the closest balloon
Tower.prototype.findNearestBalloon = function (){

	var numBloons = entityManager._balloons.length;
	var shortestDist = Number.MAX_VALUE;
	var nearestBalloon;

	for(var i = 0; i < numBloons; i++) {
	// balloons[i] is our current balloon
		var dist = util.distSq(entityManager._balloons[i].cx, entityManager._balloons[i].cy,
							this.cx, this.cy);
		if(dist < shortestDist) {
			nearestBalloon = entityManager._balloons[i];
			shortestDist = dist;
		}
	}
	return nearestBalloon;
};
