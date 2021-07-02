var NUM_INITIAL_SECTIONS = 3;
// Directions
var UP = 0;
var UP_KEY_CODE = 38;
var DOWN = 1;
var DOWN_KEY_CODE = 40;
var LEFT = 2;
var LEFT_KEY_CODE = 37;
var RIGHT = 3;
var RIGHT_KEY_CODE = 39;

function Snake() {
  this.img = document.createElement('img');
  this.img.src = 'images/snake2.png';
  this.sections = [];
}

Snake.prototype = new SnakeWorldObject();

Snake.prototype.setupSnake = function(maxX, maxY) {
  // Set snake's starting coordinates
    this.setX((maxX/2));
    this.setY((maxY/2));
//   create initial number of snake sections (snake length)
for(let i=0;i<NUM_INITIAL_SECTIONS;i++){
    this.sections.unshift(new SnakeSection(this.getX(),(maxY/2)+(i+1)));
    // this.sections[i].draw(context, this.spacing);
}
};
Snake.prototype.hasCollided = function(maxX, maxY) {
  // Check if snake has collided with itself or board boundaries.
  for(let i=0;i<this.sections.length;i++){
        //   if(this.getX()===this.sections[i].getX()
        //   &&this.getY()===this.sections[i].getY()){
        //       return true;
        //   }
         if (this.isSameLocation(this.sections[i]))
            return true;
  }
  if(this.getX()>=maxX || this.getY()>=maxY||this.getX()<0||this.getY()<0){
      return true;
  }
  else
    return false;
};

Snake.prototype.endMove = function(didGrow) {
  if (!didGrow) {
    this.sections.shift();
  }
};

Snake.prototype.startMove = function() {
  this.direction = this.nextDirection;
  // Move snake here
  var xx=this.getX();
  var yy=this.getY();
  this.sections.push(new SnakeSection(xx,yy));
  if(this.direction===UP){
      this.setX((this.getX()+0));
      this.setY((this.getY()-1));
  }
  else if(this.direction===RIGHT){
      this.setX((this.getX()+1));
      this.setY((this.getY()+0));
  }
  else if(this.direction===DOWN){
      this.setX((this.getX()+0));
      this.setY((this.getY()+1));
  }
  else if(this.direction===LEFT){
      this.setX((this.getX()-1));
      this.setY((this.getY()+0));
  }
};

Snake.prototype.draw = function(context, spacing) {
  // Draw the complete snake
  DrawUtil.drawImage(
      context,
      this.img,
      spacing * this.getX(),
      spacing * this.getY(),
      spacing,
      spacing
  );
  for(let i=0;i<this.sections.length;i++){
    this.sections[i].draw(context, spacing);
  }
};

Snake.prototype.init = function(maxX, maxY) {
  this.setupListeners();
  this.setupSnake(maxX, maxY);
};

Snake.prototype.setupListeners = function() {
  this.direction = UP;
  this.nextDirection = UP;
  var hi = this;
  document.addEventListener('keydown', function(e) {
    // Set snake's nextDirection based on keypress.
    if(e.code===UP_KEY_CODE&&hi.direction!=DOWN){
        hi.nextDirection = UP;
    }
    else if(e.code===DOWN_KEY_CODE&&hi.direction!=UP){
        hi.nextDirection = DOWN;
    }
    else if(e.code===RIGHT_KEY_CODE&&hi.direction!=LEFT){
        hi.nextDirection = RIGHT;
    }
    else if(e.code===LEFT_KEY_CODE&&hi.direction!=RIGHT){
        hi.nextDirection = LEFT;
    }
    else{
        return;
    }
    
    e.preventDefault();
  });
};
