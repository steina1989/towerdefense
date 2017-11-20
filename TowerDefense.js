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
    //hvaða aðferð? -hugrún
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
var g_renderArenaGrid = false;

var KEY_RENDERARENA_GRID = keyCode('J')
var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');
var KEY_CANCEL = keyCode('C');
var KEY_GEN_BALLOON_RED = keyCode('1');
var KEY_GEN_BALLOON_BLUE = keyCode('2');
var KEY_GEN_BALLOON_GREEN = keyCode('3');
var KEY_GEN_BALLOON_YELLOW = keyCode('4');


var currentBalloon = "red";

function processDiagnostics() {

    // Key toggles for diagnostics
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RENDERARENA_GRID)) g_renderArenaGrid = !g_renderArenaGrid;
    if (eatKey(KEY_CANCEL)) g_cancel();
    
    // Special diagnostic functions (halt balloons, reset )
    if (eatKey(KEY_GEN_BALLOON_RED)) entityManager._balloons.push(new Balloon(Balloon.balloonType.properties[Balloon.balloonType.RED]));
    if (eatKey(KEY_GEN_BALLOON_BLUE)) entityManager._balloons.push(new Balloon(Balloon.balloonType.properties[Balloon.balloonType.BLUE]));
    if (eatKey(KEY_GEN_BALLOON_GREEN)) entityManager._balloons.push(new Balloon(Balloon.balloonType.properties[Balloon.balloonType.GREEN]));
    if (eatKey(KEY_GEN_BALLOON_YELLOW)) entityManager._balloons.push(new Balloon(Balloon.balloonType.properties[Balloon.balloonType.YELLOW]));

}

function g_cancel(){
    console.log(tower._isDeadNow);
    tower.kill();
    if(tower._isDeadNow){
        tower = entityManager.KILL_ME_NOW;
    }
    console.log(tower._isDeadNow);
    console.log(tower);

}
function popSound(){
    var pop = new Audio("pop.wav");
    pop.play();

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
        menuBackground : "images/ground.jpg"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

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
    g_sprites.menuBackground = new Sprite(g_images.menuBackground);
    g_sprites.menuBackground.scale = 1
    Tower.init();
    Balloon.init();
    entityManager.init();


    main.init();
}

// Kick it off
requestPreloads();