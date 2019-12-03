// in this project will used strict mood for better securty
"use strict";


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
     this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
 Enemy.prototype.update = function(dt) {
    // You should multiply any movement by this  parameter

    this.x = this.x + this.speed * dt;

     if (this.x > 600) {
        this.x = -50;
    }

     if (player.x > (this.x - 50) && player.x < (this.x + 50) && player.y > (this.y - 50) && player.y < (this.y + 50)) {
        player.resetPlayer();
    }
};

 Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class


var INITIAL_PLAYER_X = 200;
var INITIAL_PLAYER_Y = 404;

var Player = function() {
    // set player initial location
    this.x = INITIAL_PLAYER_X;
    this.y = INITIAL_PLAYER_Y;

    // load player image
    this.sprite = 'images/char-boy.png';
};

// alert when player reach water and reset player position
Player.prototype.update = function() {
    if (this.y <= 0) {
        alert("You won!");
        this.resetPlayer();
    }
};

// draw the player to show
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var LEFT_WALL = 0;
var RIGHT_WALL = 400;
var TOP_WALL = 0;
var BOTTOM_WALL = 404;
var PLAYER_HEIGHT = 101;
var PLAYER_WIDTH = 83;

// moves the player  to Different directions
Player.prototype.handleInput = function(keyUp) {
    if (keyUp === 'left' && this.x > LEFT_WALL) {
        this.x = this.x - PLAYER_HEIGHT;
    } else if (keyUp === 'right' && this.x < RIGHT_WALL) {
        this.x = this.x + PLAYER_HEIGHT;
    } else if (keyUp === 'up' && this.y > TOP_WALL) {
        this.y = this.y - PLAYER_WIDTH;
    } else if (keyUp === 'down' && this.y < BOTTOM_WALL) {
        this.y = this.y + PLAYER_WIDTH;
    }
};

Player.prototype.resetPlayer = function() {
    this.x = INITIAL_PLAYER_X;
    this.y = INITIAL_PLAYER_Y;
};

var allEnemies = [];

 for (var i = 0; i < 3; i++) {
    var randomSpeed = Math.floor(Math.random() * 5 + Math.random() * 5) * 100;
    allEnemies.push(new Enemy(-50, (85 * i) + 60, randomSpeed));
}

 var player = new Player();


 document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
