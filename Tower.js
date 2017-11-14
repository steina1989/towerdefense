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
			1: {name: "brain", rateOfFire: 1, price: 5, range: 100, bulletDamage: 1, bulletSpeed: 90, sprite: g_sprites.twrHeili},
			2: {name: "spyro", rateOfFire: 3, price: 15, range: 170, bulletDamage: 2, bulletSpeed: 120, sprite: g_sprites.twrSpyro},
			3: {name: "diamond", rateOfFire: 6, price: 25, range: 250, bulletDamage: 3, bulletSpeed: 180, sprite: g_sprites.twrDiamond},
		}
	};
};

// ASDF Debug fall, eyða út 
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
Tower.prototype.rotation = function(balloon) {
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
	return Math.atan2(posT.y - posB.y, posT.x - posB.x);
};

Tower.prototype.inRange = function(balloon){
	var dist = util.distSq(balloon.cx, balloon.cy,
    	 			  this.cx, this.cy);
	if(dist <= this.range) {
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
    	var rotation = this.rotation(findNearestBalloon());
		generateBullet(speed, damage, rotation);
	}
};


Tower.prototype.generateBullet = function(speed, damage, rotation) {

    var velX = speed * Math.cos(rotation);
    var velY = speed * Math.sin(rotation);

    this._bullets.push(new Bullet({
            cx: this.cx,
            cy: this.cy,
            velX: velX,
            velY: velY,

            rotation: this.rotation
        }));
};

Tower.prototype.render = function (ctx) {
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};

Tower.prototype.findNearestBalloon = function (){
	// Skilar blöðru hlut í minnstri fjarlægð
	var numBloons = entityManager._balloons.length;
	var shortestDist = Number.MAX_VALUE;

	for(var i = 0; i < numBloons; i++) {
	// balloons[i] is our current balloon
		var dist = util.distSq(entityManager._balloons[i].cx, entityManager._balloons[i].cy,
							this.cx, this.cy);
		var nearestBalloon = entityManager._balloons[i];
		if(dist < shortestDist) {
			nearestBalloon = entityManager._balloons[i];
		}
	}
	return nearestBalloon;
};

