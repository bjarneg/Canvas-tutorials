function ShapeBallPlayer(x, y, fill) {
  this.x = x || 0;
  this.y = y || 0;
  this.type = "ballplayer";
  this.fill = fill || '#ABABAB';
}

ShapeBallPlayer.prototype.draw = function(ctx) {
    var x = this.x;
    var y = this.y;

    var img = new Image();
    
    img.onload = function(){
      ctx.drawImage(img,x,y)
    };
    img.src = 'img/ballplayer.png?v=1';
    img.className = 'hej';
    // ctx.beginPath();
    // ctx.arc(x, y, 24, 0, Math.PI * 2, true); 
    // ctx.moveTo(x-2,y+2);
    // ctx.lineTo(x+12, y+12);
    // ctx.closePath();
    //ctx.lineTo(x+50, y);
   ctx.fillStyle = this.fill;
  ctx.fill();
}


ShapeBallPlayer.prototype.remove = function(ctx) {
    var x = this.x;
    var y = this.y;
    console.log(ctx);
   var img = new Image();
    
    img.onload = function(){
      ctx.drawImage(img,x,y)
    };
    img.src = 'img/reset.png?v=1';
    img.className = 'hejda';

    // ctx.save();
    // ctx.globalCompositeOperation = "destination-out";
    //  var img = new Image();
    
    // img.onload = function(){
    //   ctx.drawImage(img,x,y)
    // };
    // img.src = '';
    // ctx.restore();
    
}


ShapeBallPlayer.prototype.contains = function(mx, my) {
           
  var dx = mx - this.x;
  var dy = my - this.y;
  var isInCity = (dx * dx + dy * dy) < (24 * 24);
                
  return isInCity;
  

}