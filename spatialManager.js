/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

    // "PRIVATE" DATA

    _nextSpatialID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _entities: [],

    // PUBLIC METHODS

    getNewSpatialID: function() {

        // TODO: YOUR STUFF HERE!
        return ++this._nextSpatialID;

    },

    register: function(entity) {
        var pos = entity.getPos();
        var spatialID = entity.getSpatialID();

        // TODO: YOUR STUFF HERE!
        this._entities[spatialID] = {
            posX: pos.posX,
            posY: pos.posY,
            radius: entity.getRadius(),
            entity: entity
        }
    },

    unregister: function(entity) {
        var spatialID = entity.getSpatialID();
        this._entities[spatialID] = null;
    },

    findEntityInRange: function(posX, posY, radius, entity) {
        for (var ID in this._entities) {
            var e = this._entities[ID];

            if (e != null) {
                if (e.name === "blue" && entity.name === "blue") {
                continue;
            }
                var limitSq = util.square(e.radius + radius);
                var dsquared = util.distSq(e.posX, e.posY, posX, posY);
                if (dsquared < limitSq) {
                    return e.entity;
                }
            }
        }
    },

    render: function(ctx) {
        var oldStyle = ctx.strokeStyle;
        ctx.strokeStyle = "red";

        for (var ID in this._entities) {
            var e = this._entities[ID];
            if (e != null) {
                util.strokeCircle(ctx, e.posX, e.posY, e.radius);
            }
        }
        ctx.strokeStyle = oldStyle;
    }

}