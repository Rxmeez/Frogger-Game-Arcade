// Enemies our player must avoid
var charXMove = 101;
var charYMove = 83;
var enemyXPosition = 101;
var enemyYPosition = [60, 140, 220];


var Enemy = function() {

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -enemyXPosition;
  this.y = enemyYPosition[Math.floor(Math.random()*3)];
  this.width = 80;
  this.height= 50;
  this.speed = Math.floor(Math.random()*20)+200
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  if (this.x > 500){
    this.x = -enemyXPosition;
    this.y = enemyYPosition[Math.floor(Math.random()*3)];
  }else{
    this.x = this.x + (dt*this.speed)
  }


  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite ='images/char-boy.png';
  this.x = 200;
  this.y = 400;
  this.width = 80;
  this.height = 50;

};

Player.prototype.update = function(keypress){

};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(keys) {

  switch(keys){
    case 'left':
    var leftPosition = this.x - 100;
    if (leftPosition >= 0){
      this.x = leftPosition;
    };
    break;
    case 'right':
    var rightPosition = this.x + 100;
    if (rightPosition <= 400){
      this.x = rightPosition;
    };
    break;
    case 'up':
    var upPosition = this.y - 82;
    if (upPosition >= -82){
      this.y = upPosition;
    };
    break;
    case 'down':
    var downPosition = this.y + 82;
    if (downPosition <= 400){
      this.y = downPosition;
    };
    break;
    default:
    console.log("Can't go that way");
  };
};

Player.prototype.update = function(dt){
  this.checkCollisions();

  this.score();
}

Player.prototype.reset = function(){
  this.x = 400/2;
  this.y = 400;

  console.log("reset");
}

Player.prototype.checkCollisions = function(){

for(i = 0; i < allEnemies.length; i++)
  if ((this.x <= allEnemies[i].x + allEnemies[i].width) && (this.x + this.width >= allEnemies[i].x) && (this.y < allEnemies[i].y + allEnemies[i].height) && (this.y + this.height > allEnemies[i].y)){
    console.log("COLLISION");

    this.reset();
  };

}

Player.prototype.score = function(){
  if (this.y < 0){
  console.log("Win!");
};

}
