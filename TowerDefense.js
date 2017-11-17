"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL TOWER FOR TESTING
// ====================

function createInitialTower() {

    entityManager.generateTower({ 
    // ASDF á eftir að búa til aðferðina í entityManager.
        cx : 200,
        cy : 200
    });
    
    
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    entityManager.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_renderSpatialDebug = false;
var g_renderArenaGrid = true;

var KEY_RENDERARENA_GRID = keyCode('J')
var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');
var KEY_GEN_BALLOON = keyCode('1');

var d = new Date();
var lastTime = d.getTime();
var countRed = 0;
var countBlue = 0;

var currentBalloon = "red";

function processDiagnostics() {

    // Key toggles for diagnostics
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RENDERARENA_GRID)) g_renderArenaGrid = !g_renderArenaGrid;

    
    // Special diagnostic functions (halt balloons, reset )
    if (eatKey(KEY_GEN_BALLOON)) entityManager.generateBalloon();
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    Arena.render(ctx);
    menuBar.render(ctx);
    entityManager.render(ctx);

    var now = new Date();
    var currentTime = now.getTime();

    if (currentTime - lastTime > 500 && countRed < Arena.balloons1[0] 
        && currentBalloon === "red") {
        Arena.generateLevel("red");
        lastTime = currentTime;
        countRed++;
        if (countRed === Arena.balloons1[0])
            currentBalloon = "blue";
        return;
    }

    else if (currentTime - lastTime > 300 && countBlue < Arena.balloons1[1]
        && currentBalloon === "blue") {
        Arena.generateLevel("blue");
        lastTime = currentTime;
        countBlue++;
        return;
    }

    


    //entityManager.fireBullet(300,300,5,5,0);

    //g_sprites.balloon.drawCentredAt(ctx, 200,200,0);

    //g_sprites.tower.drawCentredAt(ctx,400,200,0);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
    if (g_renderArenaGrid) Arena.renderDiagnostics(ctx);

}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        //ASDF þarf að updatea
        twrHeili   : "images/heili.png",
        twrSpyro   : "images/spyro.png",
        twrPat : "images/pat.png",
        twrDiamond : "images/diamond.png",
        balloon  : "images/bluebloon.png",
        bullet  : "images/bullet.png",
        background : "images/level01.png",
        redbloon  : "images/redbloon.png",
        bluebloon  : "images/bluebloon.png",
        greenbloon  : "images/greenbloon.png",
        yellowbloon  : "images/yellowbloon.png",
        whitebloon  : "images/whitebloon.png",
        blackbloon  : "images/blackbloon.png",
        cloud : "images/cloud.png",
        menuBackground : "images/ground.jpg"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    //ASDF þarf að updatea

    g_sprites.twrHeili  = new Sprite(g_images.twrHeili);
    g_sprites.twrSpyro  = new Sprite(g_images.twrSpyro);
    g_sprites.twrPat  = new Sprite(g_images.twrPat);
    g_sprites.twrDiamond = new Sprite(g_images.twrDiamond);
    g_sprites.balloon = new Sprite(g_images.balloon);
    g_sprites.bullet = new Sprite(g_images.bullet);
    g_sprites.bullet.scale = 2;
    g_sprites.redbloon = new Sprite(g_images.redbloon);
    g_sprites.bluebloon = new Sprite(g_images.bluebloon);
    g_sprites.greenbloon = new Sprite(g_images.greenbloon);
    g_sprites.yellowbloon = new Sprite(g_images.yellowbloon);
    g_sprites.whitebloon = new Sprite(g_images.whitebloon);
    g_sprites.blackbloon = new Sprite(g_images.blackbloon);
    g_sprites.cloud = new Sprite(g_images.cloud);
    g_sprites.menuBackground = new Sprite(g_images.menuBackground);
    g_sprites.menuBackground.scale = 1
    Tower.init();
    Balloon.init();
    entityManager.init();


    main.init();
}

// Kick it off
requestPreloads();