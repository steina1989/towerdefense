// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
}


Bullet.prototype = new Entity();


Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
//Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

    // take out of the grid at the old place
    spatialManager.unregister(this);

    if (this._isDeadNow)
        return entityManager.KILL_ME_NOW;

    if (this.cx > Arena.ORIGINX + Arena.WIDTH ||
        this.cy > Arena.ORIGINY + Arena.HEIGHT) {
        return entityManager.KILL_ME_NOW;
    }

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * du;

    
    // Handle collisions
    //
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        return entityManager.KILL_ME_NOW;
    }

    // put back in the grid at the new place
    spatialManager.register(this);

};

Bullet.prototype.getRadius = function () {
    return 2;
};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
};

Bullet.prototype.render = function (ctx) {


    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    g_sprites.bullet.drawCentredAt(50,50,0);

};