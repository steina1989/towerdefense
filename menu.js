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

var origBrainX = 660
var origBrainY = 250

var origPatX = 750 
var origPatY = 250

var origSpyroX = 660
var origSpyroY = 360

var origDiamondX = 750
var origDiamondY = 360


menuBar.render = function(ctx){
 // this.drawButton(600,0,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);
 // this.drawButton(600,g_canvas.height/2,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);

  g_sprites.menuBackground.drawAt(ctx,600,0)

  g_sprites.twrHeili.drawCentredAt(ctx,origBrainX,origBrainY);
  g_sprites.twrPat.drawCentredAt(ctx,origPatX,origPatY);
  g_sprites.twrSpyro.drawCentredAt(ctx,origSpyroX,origSpyroY);
  g_sprites.twrDiamond.drawCentredAt(ctx,origDiamondX,origDiamondY);

  playerInfo.write(ctx);

}

/*menuBar.drawMenuBar=function(ctx){
  ctx.save;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  ctx.restore;
}
*/

var playerInfo = {
  lives:200,
  coins:0
};
var i=-1;

menuBar.getTower = function (x,y){
  if(x>=origBrainX && x<=origBrainX+g_sprites.twrHeili.scaledWidth && y>=origBrainY && y<=origBrainY+g_sprites.twrHeili.scaledHeight){
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.BRAIN],x,y);
    //console.log(Tower.towerType.properties[Tower.towerType.BRAIN]);
    isDragging=true;
    console.log("brain");
    i++;
    return entityManager._towers[i];
    //entityManager.generateTower(towerType.BRAIN);
    //return 'images/heili.png';
    //heili
  }else if(x>=origPatX && x<=origPatX+g_sprites.twrPat.scaledWidth && y>=origPatY && y<=origPatY+g_sprites.twrPat.scaledHeight){
    console.log("pat");
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.PAT],x,y);
    isDragging=true;
    i++;

    return entityManager._towers[i];
    //return 'images/pat.png';
    //pat
  }else if(x>origSpyroX && x<=origSpyroX+g_sprites.twrSpyro.scaledWidth && y>origSpyroY && y<origSpyroY+g_sprites.twrSpyro.scaledHeight){
    console.log("spyro")
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.SPYRO],x,y);
    isDragging=true;
    i++;
    return entityManager._towers[i];
    //return 'images/spyro.png';
    //spyro
  }else if(x>origDiamondX && x<=origDiamondX+g_sprites.twrDiamond.scaledWidth && y>origDiamondY && y<origDiamondY+g_sprites.twrDiamond.scaledHeight){
    console.log("diamoon")
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.DIAMOND],x,y);
    isDragging=true;
    i++;
    return entityManager._towers[i];
    //diamond
    //return 'images/diamond.png';

  
  
  }
  else return
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

}



menuBar.drawButton=function(x,y,width,height,sprite,ctx){
  ctx.save();
  ctx.drawImage(sprite,x,y,width,height);
  ctx.restore;

}

