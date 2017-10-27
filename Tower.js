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

};

Tower.prototype = new Entity();

Tower.prototype.update = function (du) {    
    spatialManager.unregister(this);
    // To do
    spatialManager.register(this);
};


Tower.prototype.render = function (ctx) {
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};
