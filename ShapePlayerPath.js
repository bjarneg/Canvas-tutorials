function ShapePlayerPath(x, y, xx, yy, fill, is_ball, player_with_ball) {
  this.startx = x || 0;
  this.starty = y || 0;
  this.stopx = xx || 0;
  this.stopy = yy || 0;
  this.ball = is_ball;
  this.player_with_ball = player_with_ball;
  this.type = "ShapePlayerPathNoBall";
  this.fill = fill || '#fff';
}

ShapePlayerPath.prototype.draw = function(ctx) {
    console.log(this)
    ctx.beginPath();
    if (!this.ball)
    {
       ctx.setLineDash([4,6]);  
    }
    
    ctx.moveTo(this.startx,this.starty);
    ctx.lineTo(this.stopx,this.stopy);
    ctx.closePath();
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    var startRadians=Math.atan((this.stopy-this.starty)/(this.stopx-this.startx));
    startRadians+=((this.stopx>=this.startx)?-90:90)*Math.PI/180;

    var endRadians=Math.atan((this.stopy-this.starty)/(this.stopx-this.startx));
    endRadians+=((this.stopx>=this.startx)?90:-90)*Math.PI/180;

    ctx.save();
    ctx.beginPath();
    ctx.translate(this.stopx,this.stopy);
    ctx.rotate(endRadians);
    ctx.moveTo(0,0);
    ctx.lineTo(5,10);
    ctx.lineTo(-5,10);
    ctx.closePath();
    ctx.restore();
    ctx.fillStyle = "#fff";
    ctx.fill();

}

ShapePlayerPath.prototype.remove = function(ctx) {
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

ShapePlayerPath.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Width) and its Y and (Y + Height)
  
  return (((mx >= (this.startx)) && (mx <= (this.stopx))) && ((my >= (this.starty)) && (my <= (this.stopy))))
  

}