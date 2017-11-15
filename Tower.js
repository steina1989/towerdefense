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

}

/*
The three different types of towers available.
rateOfFire and bulletSpeed are measured in "per second".
range is measured in pixels
*/
//var towerType;


Tower.init = function() {
	this.towerType = {
		BRAIN : 1,
		SPYRO : 2,
		DIAMOND : 3,
		properties: {
			1: {name: "brain", rateOfFire: 500, price: 5, range: 130, bulletDamage: 1, bulletSpeed: 3, sprite: g_sprites.twrHeili},
			2: {name: "spyro", rateOfFire: 300, price: 15, range: 165, bulletDamage: 2, bulletSpeed: 3, sprite: g_sprites.twrSpyro},
			3: {name: "diamond", rateOfFire: 200, price: 25, range: 190, bulletDamage: 3, bulletSpeed: 8, sprite: g_sprites.twrDiamond},
		}
	};
};

// ASDF Debug fall, eyða út 
/*
Tower.generateTower = function() {
	//
	var twr = new Tower(towerType.properties[towerType.BRAIN]);
	twr.cx = 250;
	twr.cy = 250;
	twr.rotation = 0;
	//twr.render(ctx);

	entityManager._towers.push(twr);
	//console.log(entityManager._towers[0]);
	//return twr;
	//Teiknast í 0.00000000000sek ókei

};

*/

//kallað á í TowerDefense

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
    	//var velX = this.properties.bulletSpeed;

    	var now = new Date();
    	var currentTime = now.getTime();

    	if (currentTime - this.lastTime > this.rateOfFire) {
    		entityManager.fireBullet(this.cx + dX, this.cy + dY, relVelX, relVelY, 0);
    		firstTime = false;
    		this.lastTime = currentTime;
    	}


        //var launchDist = this.getRadius() * 1.2;
        
        //var relVel = this.launchVel;
        

        //entityManager.fireBullet(
          // this.cx + dX * launchDist, this.cy + dY * launchDist,
           //this.velX + relVelX, this.velY + relVelY,
           //this.rotation);
		//this.generateBullet(speed, damage, this.rotation); ASDF dót
	}
};


// ASDF kalla á generate bullet


Tower.prototype.render = function (ctx) {
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    util.strokeCircle(ctx, this.cx, this.cy, Math.sqrt(this.range)); // ASDF
};

Tower.prototype.findNearestBalloon = function (){
	// Skilar blöðru hlut í minnstri fjarlægð
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

