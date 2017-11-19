/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var d = new Date();
var lastTime = d.getTime();
var countRed = 0;
var countBlue = 0;
var countGreen = 0;
var countYellow = 0;
var countWhite = 0;
var countBlack = 0;

var entityManager = {

    // "PRIVATE" DATA
    _balloonQueue: [],
    _balloons: [],
    _bullets: [],
    _towers: [], 


    _forEachOf: function(aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    lastTime : 0,
    timeToNext : 0,

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW: -1,

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup: function() {
        this._categories = [this._balloons, this._bullets, this._towers];

    },

    init: function() {
        var cellIndex = Arena.getIndexOfCellNumber(1);
        var pos = Arena.indexToPos(cellIndex.row, cellIndex.column);

        this.generateLevel();

        // ASDF taka út þessa ĺínu:

       /* var tower = new Tower(Tower.towerType.properties[Tower.towerType.BRAIN]);
        var pos = Arena.indexToPos(3,6);
        tower.setPos(pos.x, pos.y);
        this._towers.push(tower);
*/

        //HÉR FYRIR OFAN: DEBUG, TAKA ÚT SEINNA

        //this._balloons.push(this._balloonQueue.pop());
    },

    fireBullet: function(cx, cy, velX, velY, rotation) {
        this._bullets.push(new Bullet({
            cx: cx,
            cy: cy,
            velX: velX,
            velY: velY,

            rotation: rotation
        }));
    },
/*
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
};*/

    generateBalloon: function(balloonType) {

        if (balloonType === 0) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.RED]);
        if (balloonType === 1) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.BLUE]);
        if (balloonType === 2) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.GREEN]);
        if (balloonType === 3) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.YELLOW]);
        if (balloonType === 4) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.WHITE]);
        if (balloonType === 5) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.BLACK]);

    },

    generateTower: function(descr,xPos, yPos) {
        var tower = new Tower(descr);
        tower.setPos(xPos,yPos);
        this._towers.push(tower);
        console.log(tower);

    },



    placeTower: function(xPos,yPos) {
    	// ASDF þarf að breyta, er á byrjunarstigi
        // Þarf að taka inn staðsetningu og turninn sem var búinn til
    	var tower = this.generateTower({ // ASDF á eftir að búa til aðferðina hér.
        	cx : xPos,
        	cy : yPos
    	});

    	tower.setPos(xPos, yPos);
    },


    update: function(du) {

        this.lastTime += du;

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    // remove the dead guy, and shuffle the others down to
                    // prevent a confusing gap from appearing in the array
                    aCategory.splice(i, 1);
                } else {
                    ++i;
                }
            }
        }


        if (this.lastTime > this.timeToNext && this._balloonQueue.length > 0) {
            var balloon = this._balloonQueue.pop();
            this.timeToNext = balloon.timeToNextOne;
            this._balloons.push(balloon);
            this.lastTime = 0;
        }

    },

    generateLevel: function() {
        for (var i = Arena.balloons1.length-1; i >= 0; i--) {
            for (var j = 0; j < Arena.balloons1[i]; j++) {
                this._balloonQueue.push(this.generateBalloon(i));
            }
        }
    },

    render: function(ctx) {

        //this._balloonQueue[1].sprite.drawCentredAt(ctx, 50,50,0);



        var debugX = 10,
            debugY = 100;

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];

            /*if (!this._bShowRocks &&
                aCategory == this._rocks)
                continue;*/

            for (var i = 0; i < aCategory.length; ++i) {

                aCategory[i].render(ctx);
                //debug.text(".", debugX + i * 10, debugY);

            }
            debugY += 10;
        }
    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();