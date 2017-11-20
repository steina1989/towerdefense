"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var menuBar = {
  x: Arena.WIDTH,
  y: 0,
  width: g_canvas.width - Arena.WIDTH,
  height:g_canvas.height
};

//Positions of towers
var origBrainX = 630,
    origBrainY = 230,
    origBrainW = 65,
    origBrainH = 50;

var origPatX = 720,
    origPatY = 200,
    origPatW = 60,
    origPatH = 80;

var origSpyroX = 640,
    origSpyroY = 320,
    origSpyroW = 60,
    origSpyroH = 70;

var origDiamondX = 720,
    origDiamondY = 330,
    origDiamondW = 65,
    origDiamondH = 50;



//Everything drawed
menuBar.render = function(ctx){

  g_sprites.menuBackground.drawAt(ctx, 600, 0, 200, g_canvas.height)
  menuBar.drawButton(buttonX, buttonY, buttonR, ctx);


  g_sprites.twrHeili.drawAt(ctx,
    origBrainX,
    origBrainY,
    origBrainW,
    origBrainH);

  g_sprites.twrPat.drawAt(ctx,
    origPatX,
    origPatY,
    origPatW,
    origPatH);

  g_sprites.twrSpyro.drawAt(ctx,
    origSpyroX,
    origSpyroY,
    origSpyroW,
    origSpyroH);

  g_sprites.twrDiamond.drawAt(ctx,
    origDiamondX,
    origDiamondY,
    origDiamondW,
    origDiamondH);

  playerInfo.write(ctx);
}


var playerInfo = {
  lives:200,
  coins:330
};


var i=-1;

//Function that gets the right tower only if we have enough coins
menuBar.getTower = function (x, y){
  if(x >= origBrainX && x <= origBrainX + origBrainW && 
     y >= origBrainY && y <= origBrainY + origBrainH){

    if(playerInfo.coins > Tower.towerType.properties[Tower.towerType.BRAIN].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.BRAIN], x, y);
      isDragging = true;
      i++;
      return entityManager._towers[i];
  }

  }else if(x >= origPatX && x<= origPatX + origPatW && 
           y >= origPatY && y<= origPatY + origPatH){

    if(playerInfo.coins >= Tower.towerType.properties[Tower.towerType.PAT].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.PAT], x, y);
      isDragging = true;
      i++;
      return entityManager._towers[i];
  }
  
  }else if(x > origSpyroX && x <= origSpyroX + origSpyroW && 
           y > origSpyroY && y < origSpyroY + origSpyroH){
    
    if(playerInfo.coins >= Tower.towerType.properties[Tower.towerType.SPYRO].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.SPYRO], x, y);
      isDragging = true;
      i++;
      return entityManager._towers[i];
  }

  }else if(x > origDiamondX && x <= origDiamondX + origDiamondW && 
           y > origDiamondY && y < origDiamondY + origDiamondH){
    
    if(playerInfo.coins >= Tower.towerType.properties[Tower.towerType.DIAMOND].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.DIAMOND], x, y);
      isDragging = true;
      i++;
      return entityManager._towers[i];
    }
  }
}
 
playerInfo.write = function(ctx){
  ctx.fillStyle = "black";
  ctx.font = "bolder 20px Arial"; //ASDF breyta
  
  ctx.fillText("Yolo's: " + this.lives, 615, 50);
  ctx.fillText("Ca$hMoneyzz: " + this.coins, 615, 70);
  ctx.font = "15px Arial bold";
  ctx.fillText("Cost: " + Tower.towerType.properties[Tower.towerType.PAT].price, 720, 300); //PAT
  ctx.fillText("Cost: " + Tower.towerType.properties[Tower.towerType.BRAIN].price, 630, 300); //BRAIN
  ctx.fillText("Cost: " + Tower.towerType.properties[Tower.towerType.SPYRO].price, 630, 405); //SPYRO
  ctx.fillText("Cost: " + Tower.towerType.properties[Tower.towerType.DIAMOND].price, 720, 405); //DIAMOND
  ctx.fillText("Next wave", 670, 110);
  ctx.font = "30px Arial bold";
  ctx.fillText("Level: " + Arena.level, 615,590)

}

menuBar.drawButton=function(x,y,r,ctx){
  ctx.save();
  ctx.fillStyle = "black";
  util.fillCircle(ctx, x, y, r);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(730, y);
  ctx.lineTo(x-r/2, y - r + 5);
  ctx.lineTo(x-r/2, y + r - 5);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.restore();

}



