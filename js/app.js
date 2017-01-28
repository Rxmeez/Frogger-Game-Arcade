//Global variable for movement for Player defined as char and Enemey defined as enemy
var charXMove = 101;
var charYMove = 83;
var enemyXPosition = [101, 150, 221];
var enemyYPosition = [60, 140, 220];
var charEnemyWidth = 80;
var charEnemyHeight = 50;
var defaultCharPosition = [200, 400];

// Every Enemy has this basic starting point
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -enemyXPosition[Math.floor(Math.random() * 3)];
    this.y = enemyYPosition[Math.floor(Math.random() * 3)];
    this.width = charEnemyWidth;
    this.height = charEnemyHeight;
    this.speed = Math.floor((Math.random() * 100) + 200);
};

//Enemy object as time continues
Enemy.prototype.update = function(dt) {

    if (this.x > 500) {
        this.x = -enemyXPosition[Math.floor(Math.random() * 3)];
        this.y = enemyYPosition[Math.floor(Math.random() * 3)];
    } else {
        this.x = this.x + (dt * this.speed);
    }

};

// drawing Enemy on the canvas, with this.x and this.y position
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

//Basic Settings for Player when its spawned
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = defaultCharPosition[0];
    this.y = defaultCharPosition[1];
    this.width = charEnemyWidth;
    this.height = charEnemyHeight;
    this.score = 0;
    document.getElementById('score').innerHTML = this.score;

};

Player.prototype.update = function(keypress) {

};

//Player being rendered on the canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

    switch (keys) {
        case 'left':
            var leftPosition = this.x - charXMove;
            if (leftPosition >= -2) { //canvas max left position
                this.x = leftPosition;
            }
            break;
        case 'right':
            var rightPosition = this.x + charXMove;
            if (rightPosition <= 402) { //canvas max right position
                this.x = rightPosition;
            }
            break;
        case 'up':
            var upPosition = this.y - charYMove;
            if (upPosition >= -83) { //canvas max top position
                this.y = upPosition;
            }
            break;
        case 'down':
            var downPosition = this.y + charYMove;
            if (downPosition <= 450) { //canvas max bottom postion
                this.y = downPosition;
            }
            break;
        default:
            console.log("Can't go that way");
    }
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
    if (this.y < 0) {
        this.score += 20;
        console.log("Win!");
        console.log(this.score);
        this.x = defaultCharPosition[0];
        this.y = defaultCharPosition[1];

        //Adding Score to HTML DOM
        document.getElementById('score').innerHTML = this.score;
    } else {
        this.score = this.score;
    }
};

Player.prototype.reset = function() {
    this.x = defaultCharPosition[0];
    this.y = defaultCharPosition[1];
    this.score = 0;
    document.getElementById('score').innerHTML = this.score;
    console.log("reset");
};

Player.prototype.checkCollisions = function() {

    for (i = 0; i < allEnemies.length; i++)
        if ((this.x <= allEnemies[i].x + allEnemies[i].width) && (this.x + this.width >= allEnemies[i].x) && (this.y < allEnemies[i].y + allEnemies[i].height) && (this.y + this.height > allEnemies[i].y)) {
            console.log("COLLISION");
            this.reset();
        }

};
