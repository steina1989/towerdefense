"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var menuBar = {
  color: "#FF69B4",
  x: Arena.WIDTH,
  y:0,
  width: g_canvas.width - Arena.WIDTH,
  height:g_canvas.height

};
menuBar.render = function(ctx){
  this.drawMenuBar(ctx);
}

menuBar.drawMenuBar=function(ctx){
  ctx.save;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.width,this.height);
  //ctx.fillRect(600,0,200,600);
  ctx.restore;
}

var buttons = { 
};
    /**
     * A complex button background.
     * @param {integer} x     - X coordinate of the button.
     * @param {integer} y     - Y coordinate of the button.
     * @param {integer} w     - Width of the button.
     * @param {integer} h     - Height of the button.
     * @param {object} colors - The colors of the button.
     * @param {string} colors.background - The background color.
     * @param {string} colors.top - Top particle color.
     * @param {string} colors.bottom - Bottom particle color.
     */

    buttons.Button=function(x, y, w, h, colors) {
      var halfHeight = h / 2;

      g_ctx.save();

      // draw the button
      g_ctx.fillStyle = colors.background;

      g_ctx.beginPath();
      g_ctx.rect(x, y, w, h);
      g_ctx.rect(x, y, w, h);
      g_ctx.fill();
      g_ctx.clip();

      // light gradient
      var grad = ctx.createLinearGradient(
        x, y,
        x, y + halfHeight
      );
      grad.addColorStop(0, 'rgb(221,181,155)');
      grad.addColorStop(1, 'rgb(22,13,8)');
      g_ctx.fillStyle = grad;
      g_ctx.globalAlpha = 0.5;
      g_ctx.fillRect(x, y, w, h);

      // draw the top half of the button
      g_ctx.fillStyle = colors.top;

      // draw the top and bottom particles
      for (var i = 0; i < h; i += halfHeight) {

        g_ctx.fillStyle = (i === 0 ? colors.top : colors.bottom);

        for (var j = 0; j < 50; j++) {
          // get random values for particle
          var partX = x + Math.random() * w;
          var partY = y + i + Math.random() * halfHeight;
          var width = Math.random() * 10;
          var height = Math.random() * 10;
          var rotation = Math.random() * 360;
          var alpha = Math.random();

          g_ctx.save();

          // rotate the canvas by 'rotation'
          g_ctx.translate(partX, partY);
          g_ctx.rotate(rotation * Math.PI / 180);
          g_ctx.translate(-partX, -partY);

          // set alpha transparency to 'alpha'
          g_ctx.globalAlpha = alpha;

          g_ctx.fillRect(partX, partY, width, height);

          g_ctx.restore();
        }
      }

      ctx.restore();
    }

   

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

