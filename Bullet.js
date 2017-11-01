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

    // Make a noise when I am created (i.e. fired)
    this.fireSound.play();
    
/*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
*/

}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(
    "sounds/bulletFire.ogg");
Bullet.prototype.zappedSound = new Audio(
    "sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
=======
}


Bullet.prototype = new Entity();


>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

<<<<<<< HEAD
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

=======
    // take out of the grid at the old place
    spatialManager.unregister(this);

    if (this._isDeadNow)
        return entityManager.KILL_ME_NOW;
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * du;
<<<<<<< HEAD
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    this.wrapPosition();

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        // If there exists such a function then call takeBulletHit(hitEntity)
        if (canTakeHit) canTakeHit.call(hitEntity); 
        return entityManager.KILL_ME_NOW;
    }
    
=======

    
    // Handle collisions
    //
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        return entityManager.KILL_ME_NOW;
    }

    // put back in the grid at the new place
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
    spatialManager.register(this);

};

Bullet.prototype.getRadius = function () {
<<<<<<< HEAD
    return 4;
=======
    return 2;
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
<<<<<<< HEAD
    // Make a noise when I am zapped by another bullet
    this.zappedSound.play();
=======
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
};

Bullet.prototype.render = function (ctx) {

    var fadeThresh = Bullet.prototype.lifeSpan / 3;

<<<<<<< HEAD
=======
    //ASDF ekki fade - deyja þegar þau fara útaf arena
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
    if (this.lifeSpan < fadeThresh) {
        ctx.globalAlpha = this.lifeSpan / fadeThresh;
    }

<<<<<<< HEAD
    g_sprites.bullet.drawWrappedCentredAt(
=======
    // Arena.ORIGINX + Arena.WIDTH
    // Arena.ORIGINY + Arena.HEIGHT

    g_sprites.bullet.drawCentredAt(
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
<<<<<<< HEAD
};
=======
};
>>>>>>> 00b65fec14ec868029c839abff4360b5846700aa
