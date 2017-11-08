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
        //this._generateRocks();
        //this._generateShip();
        var cellIndex = Arena.getIndexOfCellNumber(1);
        var pos = Arena.indexToPos(cellIndex.row, cellIndex.column);
        // Push 10 balloons into queue
        console.log(pos);
        for (var x = 0; x<10; x++){
            this._balloonQueue.push(new Balloon({
                cx: pos.x,
                cy: pos.y,
                speed: 5
            }))
        }
        this._balloons.push(this._balloonQueue.pop());
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

    generateBalloon: function(descr) {
        this._balloons.push(new Balloon(descr));
    },

    generateTower: function(descr) {
        this._towers.push(new Tower(descr));
    },


    /*killNearestShip: function(xPos, yPos) {
        var theShip = this._findNearestShip(xPos, yPos).theShip;
        if (theShip) {
            theShip.kill();
        }
    },*/

    /*yoinkNearestShip: function(xPos, yPos) {
        var theShip = this._findNearestShip(xPos, yPos).theShip;
        if (theShip) {
            theShip.setPos(xPos, yPos);
        }
    },*/

    placeTower: function(xPos, yPos) {
    	// ASDF þarf að breyta, er á byrjunarstigi
    	var tower = this.generateTower({ // ASDF á eftir að búa til aðferðina hér.
        	cx : xPos,
        	cy : yPos
    	});

    	tower.setPos(xPos, yPos);
    },

    /*resetShips: function() {
        this._forEachOf(this._ships, Ship.prototype.reset);
    },

    haltShips: function() {
        this._forEachOf(this._ships, Ship.prototype.halt);
    },

    toggleRocks: function() {
        this._bShowRocks = !this._bShowRocks;
    },*/

    update: function(du) {

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

        //if (this._rocks.length === 0) this._generateRocks();

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