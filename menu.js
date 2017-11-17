"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var menuBar = {
  color: "white",
  x: Arena.WIDTH,
  y:0,
  width: g_canvas.width - Arena.WIDTH,
  height:g_canvas.height
};

var getImage = function(image){
  var img = new Image(50, 50);
  img.src = image;
  return img;
}

var origBrainX = 630;
var origBrainY = 230;
var origBrainW = 65;
var origBrainH = 50;

var origPatX = 720;
var origPatY = 200;
var origPatW = 60;
var origPatH = 80;

var origSpyroX = 640;
var origSpyroY = 320;
var origSpyroW = 60;
var origSpyroH = 70;

var origDiamondX = 720;
var origDiamondY = 330;
var origDiamondW = 65;
var origDiamondH = 50;

var origCloudX = 670;
var origCloudY = 430;
var origCloudW = 70;
var origCloudH = 50;


menuBar.render = function(ctx){
  //this.drawMenuBar(ctx);
   // this.drawButton(600,0,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);
 // this.drawButton(600,g_canvas.height/2,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);

  g_sprites.menuBackground.drawAt(ctx,600,0,200,g_canvas.height)
  menuBar.drawButton(700,150,30,2*Math.PI,ctx);


  g_sprites.twrHeili.drawAt(ctx,origBrainX,origBrainY,origBrainW,origBrainH);
  g_sprites.twrPat.drawAt(ctx,origPatX,origPatY,origPatW,origPatH);
  g_sprites.twrSpyro.drawAt(ctx,origSpyroX,origSpyroY,origSpyroW,origSpyroH);
  g_sprites.twrDiamond.drawAt(ctx,origDiamondX,origDiamondY,origDiamondW,origDiamondH);
  g_sprites.cloud.drawAt(ctx,origCloudX,origCloudY,origCloudW,origCloudH);


  playerInfo.write(ctx);

}
/*
menuBar.drawMenuBar=function(ctx){
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  ctx.restore();
}*/


var playerInfo = {
  lives:200,
  coins:5000
};


var i=-1;

menuBar.getTower = function (x,y){
  if((x>=origBrainX && x<=origBrainX+origBrainW) && (y>=origBrainY && y<=origBrainY+origBrainH)){
    if(playerInfo.coins>Tower.towerType.properties[Tower.towerType.BRAIN].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.BRAIN],x,y);
      isDragging=true;
      i++;
      return entityManager._towers[i];
  }

  }else if(x>=origPatX && x<=origPatX+origPatW && y>=origPatY && y<=origPatY+origPatH){
    if(playerInfo.coins>=Tower.towerType.properties[Tower.towerType.PAT].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.PAT],x,y);
      isDragging=true;
      i++;
      return entityManager._towers[i];
  }
  
  }else if(x>origSpyroX && x<=origSpyroX+origSpyroW && y>origSpyroY && y<origSpyroY+origSpyroH){
    if(playerInfo.coins>=Tower.towerType.properties[Tower.towerType.SPYRO].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.SPYRO],x,y);
      isDragging=true;
      i++;
      return entityManager._towers[i];
  }

  }else if(x>origDiamondX && x<=origDiamondX+origDiamondW && y>origDiamondY && y<origDiamondY+origDiamondH){
    if(playerInfo.coins>=Tower.towerType.properties[Tower.towerType.DIAMOND].price){
      entityManager.generateTower(Tower.towerType.properties[Tower.towerType.DIAMOND],x,y);
      isDragging=true;
      i++;
      return entityManager._towers[i];
  }
  }else if(x>origCloudX && x<=origCloudX+origCloudW && y>origCloudY && y<origCloudY+origCloudH){
    if(playerInfo.coins>=1000){


  }
  }
}

 
playerInfo.write = function(ctx){
  ctx.fillStyle="black";
  ctx.font="bold 20px Arial"; //ASDF breyta
  
  ctx.fillText("Yolo's: " + this.lives,615,50);
  ctx.fillText("Ca$hMoneyzz: " + this.coins,615,70);
  ctx.font="15px Arial bold";
  ctx.fillText("Cost: 100",720,300); //PAT
  ctx.fillText("Cost: 100",630,300); //HEILI
  ctx.fillText("Cost: 100",630,405); //SPYRO
  ctx.fillText("Cost: 100",720,405); //DIAMOND
  ctx.fillText("Cost: 1000",670,495); //CLOUD
  ctx.fillText("Next wave",670,110);

}



menuBar.drawButton=function(x,y,r,angle,ctx){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle ="black";
  ctx.arc(x,y,r,0,angle);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(730, y);
  ctx.lineTo(x-r/2, y-r+5);
  ctx.lineTo(x-r/2, y+r-5);
  ctx.fillStyle = "red";
  ctx.fill();

  ctx.restore();

}



