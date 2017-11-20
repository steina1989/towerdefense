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
var countRed = 0,
    countBlue = 0,
    countGreen = 0,
    countYellow = 0,
    countWhite = 0,
    countBlack = 0;

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


    generateBalloon: function(balloonType) {

        if (balloonType === 0) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.RED]);
        if (balloonType === 1) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.BLUE]);
        if (balloonType === 2) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.GREEN]);
        if (balloonType === 3) 
            return new Balloon(Balloon.balloonType.properties[Balloon.balloonType.YELLOW]);
    },

    generateTower: function(descr,xPos, yPos) {
        var tower = new Tower(descr);
        tower.setPos(xPos,yPos);
        this._towers.push(tower);
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
        var debugX = 10,
            debugY = 100;

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];

            for (var i = 0; i < aCategory.length; ++i) {

                aCategory[i].render(ctx);
            }
            
            debugY += 10;
        }
    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();