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

menuBar.render = function(ctx){
  //this.drawMenuBar(ctx);
   // this.drawButton(600,0,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);
 // this.drawButton(600,g_canvas.height/2,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);

  g_sprites.menuBackground.drawAt(ctx,600,0,200,g_canvas.height)

  g_sprites.twrHeili.drawAt(ctx,origBrainX,origBrainY,origBrainW,origBrainH);
  g_sprites.twrPat.drawAt(ctx,origPatX,origPatY,origPatW,origPatH);
  g_sprites.twrSpyro.drawAt(ctx,origSpyroX,origSpyroY,origSpyroW,origSpyroH);
  g_sprites.twrDiamond.drawAt(ctx,origDiamondX,origDiamondY,origDiamondW,origDiamondH);


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
  coins:0
};


var i=-1;

menuBar.getTower = function (x,y){
  console.log("fer inn í getTower aðferð")
  console.log(x,y)
  console.log(origBrainX,origBrainY);
  if((x>=origBrainX && x<=origBrainX+origBrainW) && (y>=origBrainY && y<=origBrainY+origBrainH)){
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.BRAIN],x,y);
    //console.log(Tower.towerType.properties[Tower.towerType.BRAIN]);
    isDragging=true;
    console.log("brain");
    i++;
    return entityManager._towers[i];
    //entityManager.generateTower(towerType.BRAIN);
    //return 'images/heili.png';
    //heili
  }else if(x>=origPatX && x<=origPatX+origPatW && y>=origPatY && y<=origPatY+origPatH){
    console.log("pat");
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.PAT],x,y);
    isDragging=true;
    i++;

    return entityManager._towers[i];
    //return 'images/pat.png';
    //pat
  }else if(x>origSpyroX && x<=origSpyroX+origSpyroW && y>origSpyroY && y<origSpyroY+origSpyroH){
    console.log("spyro")
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.SPYRO],x,y);
    isDragging=true;
    i++;
    return entityManager._towers[i];
    //return 'images/spyro.png';
    //spyro
  }else if(x>origDiamondX && x<=origDiamondX+origDiamondW && y>origDiamondY && y<origDiamondY+origDiamondH){
    console.log("diamoon")
    entityManager.generateTower(Tower.towerType.properties[Tower.towerType.DIAMOND],x,y);
    isDragging=true;
    i++;
    return entityManager._towers[i];
    //diamond
    //return 'images/diamond.png';
  }else{
    console.log("for hingað")
    return;
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

}



menuBar.drawButton=function(x,y,width,height,sprite,ctx){
  ctx.save();
  ctx.drawImage(sprite,x,y,width,height);
  ctx.restore();

}



