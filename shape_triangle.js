function ShapeTriangle(x, y, fill) {
  this.x = x || 0;
  this.y = y || 0;
  this.type = "cone";
  this.fill = fill || '#ABABAB';
}

ShapeTriangle.prototype.draw = function(ctx) {
    var x = this.x;
    var y = this.y;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x-5, y+10);
    ctx.lineTo(x+5, y+10);
    ctx.closePath();
    //ctx.lineTo(x+50, y);
    ctx.fillStyle = this.fill;
    ctx.fill()
}

ShapeTriangle.prototype.remove = function(ctx) {
    var x = this.x;
    var y = this.y;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x-10, y+14);
    ctx.lineTo(x+10, y+14);
    ctx.closePath();
    //ctx.lineTo(x+50, y);
    ctx.fillStyle = this.fill;
    ctx.fill()
    ctx.restore();
    
}

ShapeTriangle.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Width) and its Y and (Y + Height)
  
  return (((mx >= (this.x-10)) && (mx <= (this.x+10))) && ((my >= (this.y-20)) && (my <= (this.y+20))))
  

}