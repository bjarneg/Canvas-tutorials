// By Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Last update December 2011
//
// Free to use and distribute at will
// So long as you are nice to people, etc



function CanvasState(canvas) {
  // **** First some setup! ****
  //console.log(canvas);
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  
  this.valid = false; // when set to false, the canvas will redraw everything
  this.shapes = [];  // the collection of things to be drawn
  this.remove_shapes = [];
  this.dragging = false; // Keep track of when we are dragging
  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
  
  // This is an example of a closure!
  // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
  // This is our reference!
  var myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
    var shapes = myState.shapes;
    var l = shapes.length;
    for (var i = l-1; i >= 0; i--) {
      if (shapes[i].contains(mx, my)) {
        var mySel = shapes[i];
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.dragging = true;
        myState.selection = mySel;
        myState.valid = false;
        return;
      }
    }
    // havent returned means we have failed to select anything.
    // If there was an object selected, we deselect it
    if (myState.selection) {
      myState.selection = null;
      myState.valid = false; // Need to clear the old selection border
    }
  }, true);
  canvas.addEventListener('mousemove', function(e) {
    if (myState.dragging){
      var mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;   
      myState.valid = false; // Something's dragging so we must redraw
    }
  }, true);
  canvas.addEventListener('mouseup', function(e) {
    myState.dragging = false;
  }, true);
  // double click for making new shapes
  canvas.addEventListener('dblclick', function(e) {
    var mouse = myState.getMouse(e);
   // myState.addShape(new Shape(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
    //myState.addShape(new ShapeTriangle(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,255,0,.6)'));
    if (thisShape !== null)
    {

        if (thisShape === "cone")
        {
          myState.addShape(new ShapeTriangle(mouse.x-10 , mouse.y-10, "rgba(255,255,255,1)"));
        }
        else if (thisShape === "ball")
        {
          myState.addShape(new ShapeBall(mouse.x-10 , mouse.y-10, "rgba(255,255,255,1)"));
        }
        else if (thisShape === "ballplayer")
        {
          myState.addShape(new ShapeBallPlayer(mouse.x-10 , mouse.y-10, "rgba(255,255,255,1)"));
        }
        else if (thisShape == "playerpath_noball")
        {
          if (playerpath_noball_start_x === 0)
          {
            playerpath_noball_start_x = mouse.x;
            playerpath_noball_start_y = mouse.y;
          }
          else
          {
            myState.addShape(new ShapePlayerPath(playerpath_noball_start_x, playerpath_noball_start_y, mouse.x, mouse.y, "rgba(255,255,255,1)",false,false));
            playerpath_noball_start_x = 0;
            playerpath_noball_start_y = 0;
          }
        }
        else if (thisShape == "ballpath")
        {
          if (playerpath_noball_start_x === 0)
          {
            playerpath_noball_start_x = mouse.x;
            playerpath_noball_start_y = mouse.y;
          }
          else
          {
            myState.addShape(new ShapePlayerPath(playerpath_noball_start_x, playerpath_noball_start_y, mouse.x, mouse.y, "rgba(255,255,255,1)",true,false));
            playerpath_noball_start_x = 0;
            playerpath_noball_start_y = 0;
          }
        }
       
    }
    
  }, true);
  
  // **** Options! ****
  
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;  
  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addShape = function(shape) {
  this.shapes.push(shape);
  this.valid = false;
}


CanvasState.prototype.removeShape = function(shape, sel) {
  //this.remove_shapes.push(shape);
  this.valid = false;
  var shapes = this.shapes;
  var l = shapes.length;
  for (var i = 0; i < l; i++) {
    var zhape = shapes[i];
    if (zhape == sel)
    {
      this.shapes.splice(i,1);
    }
  }
}



CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;
    var shapes = this.shapes;
    this.clear();
    
    var l = this.remove_shapes.length;
    for (var i = 0; i < l; i++) {
      var shape = this.remove_shapes[i];
      // We can skip the drawing of elements that have moved off the screen:
      if (shape.x > this.width || shape.y > this.height ||
          shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
        
          this.remove_shapes[i].remove(ctx);  
        
        
    }

    // ** Add stuff you want drawn in the background all the time here **
    
    // draw all shapes
    var l = shapes.length;
    for (var i = 0; i < l; i++) {
      var shape = shapes[i];
      // We can skip the drawing of elements that have moved off the screen:
      if (shape.x > this.width || shape.y > this.height ||
          shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
      shapes[i].draw(ctx);
    }
    
   


    // draw selection
    // right now this is just a stroke along the edge of the selected Shape
    if (this.selection != null) {

      // ctx.strokeStyle = this.selectionColor;
      // ctx.lineWidth = this.selectionWidth;
      var mySel = this.selection;
      
      if (thisShape === "eraser")
      {
        if (mySel.type === "ball")
        {
          this.removeShape(new ShapeBall(mySel.x, mySel.y), mySel);
        }
        else if (mySel.type === "cone")
        {
          this.removeShape(new ShapeTriangle(mySel.x, mySel.y), mySel);
        }
        else if (mySel.type === "ballplayer")
        {
          this.removeShape(new ShapeBallPlayer(mySel.x, mySel.y), mySel);
        }
      }
      else
      {
         if (mySel.type === "cone")
        {
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#666666';
            ctx.stroke();  
        }
      }
      //ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
    
    // ** Add stuff you want drawn on top all the time here **
    
    this.valid = true;
  }
}


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}

// If you dont want to use <body onLoad='init()'>
// You could uncomment this init() reference and place the script reference inside the body tag
//init();

function init() {
  var s = new CanvasState(document.getElementById('canvas1'));
  // s.addShape(new Shape(40,40,50,50)); // The default is gray
  // s.addShape(new Shape(60,140,40,60, 'lightskyblue'));
  // // Lets make some partially transparent
  // s.addShape(new Shape(80,150,60,30, 'rgba(127, 255, 212, .5)'));
  // s.addShape(new Shape(125,80,30,80, 'rgba(245, 222, 179, .7)'));
}

