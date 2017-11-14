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
  var img = new Image(400, 400);
  img.src = image;
  return img;
}


menuBar.render = function(ctx){
  //this.drawMenuBar(ctx);
  this.drawButton(600,0,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);
  this.drawButton(600,g_canvas.height/2,200,g_canvas.height/2, getImage('images/ground.jpg'),ctx);
  this.drawButton(620,220,80,60,getImage('images/heili.png'),ctx);
  this.drawButton(620,330,80,60,getImage('images/spyro.png'),ctx);
  this.drawButton(715,180,60,100,getImage('images/pat.png'),ctx);
  this.drawButton(710,320,80,80,getImage('images/diamond.png'),ctx);
  this.drawButton(650,420,120,60,getImage('images/cloud.png'),ctx);
  playerInfo.write(ctx);

}

menuBar.drawMenuBar=function(ctx){
  ctx.save;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  ctx.restore;
}


var playerInfo = {
  lives:200,
  coins:0
};

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
  //ctx.fillStyle="black";
  //ctx.fillRect(x,y,width,height);

  ctx.drawImage(sprite,x,y,width,height);
  ctx.restore;

}




   
/*
    // draw the 3 states: default, hover, active
    var defaultButton = new Button(0, 0, 100, 50, {
      'background': '#1879BD',
      'top': '#43A4BD',
      'bottom': '#084D79'
    });

    var hoverButton = new Button(100, 0, 100, 50, {
      'background': '#093905',
      'top': '#88A964',
      'bottom': '#678834'
    });

    var activeButton = new Button(200, 0, 100, 50, {
      'background': '#A80000',
      'top': '#FCFC15',
      'bottom': '#EB7723'
    });
*/

