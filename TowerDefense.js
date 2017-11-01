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
var g_renderArena = false;

var KEY_RENDERARENA = keyCode('J')
var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');
var KEY_GEN_BALLOON = keyCode('0');

function processDiagnostics() {

    // Key toggles for diagnostics
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RENDERARENA)) g_renderArena = !g_renderArena;
    

    // Special diagnostic functions (halt balloons, reset )
    // Ex: if (eatKey(KEY_K)) entityManager.killNearestShip(g_mouseX, g_mouseY);
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

    entityManager.render(ctx);

    entityManager.fireBullet(300,300,5,5,0);

    g_sprites.balloon.drawCentredAt(ctx, 200,200,0);

    g_sprites.tower.drawCentredAt(ctx,300,200,0);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
    if (g_renderArena) Arena.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        tower   : "images/tower.png",
        balloon  : "images/bluebloon.png",
        bullet  : "images/bullet.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.tower  = new Sprite(g_images.tower);
    g_sprites.balloon = new Sprite(g_images.balloon);
    g_sprites.bullet = new Sprite(g_images.bullet);
    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();