function ShapeBall(x, y, fill) {
  this.x = x || 0;
  this.y = y || 0;
  this.type = "ball";
  this.fill = fill || '#ABABAB';
}

ShapeBall.prototype.draw = function(ctx) {
    var x = this.x;
    var y = this.y;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2, true); 
    ctx.closePath();
    //ctx.lineTo(x+50, y);
   ctx.fillStyle = this.fill;
  ctx.fill();
}


ShapeBall.prototype.remove = function(ctx) {
    var x = this.x;
    var y = this.y;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2, true); 
    ctx.closePath();
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.restore();
    
}


ShapeBall.prototype.contains = function(mx, my) {
           
  var dx = mx - this.x;
  var dy = my - this.y;
  var isInCity = (dx * dx + dy * dy) < (12 * 12);
                
  return isInCity;
  

}