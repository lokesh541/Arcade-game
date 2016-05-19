    'use strict';
    
    var score = 0;
    // Enemies our player must avoid
    var Enemy = function(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    };


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x += this.speed * dt;
        if (this.x > ctx.canvas.width) {
            this.x = 0;
        }

         

        if (this.x < player.x + 50 &&
            this.x + 50 > player.x &&
            this.y < player.y + 80 &&
            80 + this.y > player.y) {
            player.gameReset();
            score = 0;
            document.getElementById('score').innerText = score; //score becomes zero on collision
        }
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
        
    };



    // Now write your own player class
    // This class requires an update(), render() and
    // a handleInput() method.
    var Player = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    };
   

    Player.prototype.update = function() {

        if (this.y < 10) { // resets the player position on reaching water
            this.gameReset();
            score++;
            document.getElementById('score').innerText = score;
        }

    };

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    };

    Player.prototype.handleInput = function(key) {


        if (key === 'left' && this.x > 10) {
            this.x -= 40;
        } else if (key === 'up') {
            this.y -= 40;
        } else if (key === 'right' && this.x < ctx.canvas.width - 100) {
            this.x += 40;
        } else if (key === 'down' && this.y < ctx.canvas.height - 200) {
            this.y += 40;
        }



    };

    Player.prototype.gameReset = function() {
    
        this.x = 50;
        this.y = 320;
        
        
};


    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    var player = new Player(50, 320);
    var enemy1 = new Enemy(10, 70, 100);
    var enemy2 = new Enemy(10, 150, 110);
    var enemy3 = new Enemy(10, 230, 120);
    var enemy4 = new Enemy(250, 70, 120);
    var enemy5 = new Enemy(250, 150, 110);
    var enemy6 = new Enemy(250, 230, 100);
    var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


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
