// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
}

Bullet.prototype = new Entity();
    
// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// ASDF MÁ TAKA ÚT ? Convert times from milliseconds to "nominal" time units.
// ASDF MÁ TAKA ÚT? Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

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

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        hitEntity.kill();
        playerInfo.coins+=23;

        // If there exists such a function then call takeBulletHit(hitEntity)
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }

    // put back in the grid at the new place
    spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
    return g_images.bullet.width/2;
};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
};

Bullet.prototype.render = function (ctx) {
    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

var firstTime = true;