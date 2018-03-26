// ENEMY
let Enemy = function (x, y, speed) {

    // SET UP ENEMY'S X/Y AXIS & SPEED
    this.x = x;
    this.y = y;
    this.speed = speed;

    // ENEMY IMAGE
    this.sprite = 'images/enemy-bug.png';
};

// UPDATE ENEMY POSITION (DT ---> TIME DELTA)
Enemy.prototype.update = function (dt) {

    // ON THE X-AXIS ---> MULTIPLY SPEED BY DT
    this.x += this.speed * dt;

    // MAKE ENEMIES RE-APPEAR AFTER THEY LEAVE THE CANVAS, RANDOMIZE SPEED
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // HANDLES COLLISIONS
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// RENDER ENEMY
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER
let Player = function (x, y) {

    // X/Y AXIS FOR PLAYER
    this.x = x;
    this.y = y;

    // PLAYER IMAGE
    this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function (dt) {

};

// RENDER USER IMAGE
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// SET UP ARROW KEY FUNCTIONALITY
Player.prototype.handleInput = function (keyPress) {

    // LEFT
    // SET GAME BOUNDARIES
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // RIGHT
    // SET GAME BOUNDARIES
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // UP
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // DOWN
    // SET GAME BOUNDARIES
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // ONCE PLAYER REACHES WATER, ALERT & RESET
    if (this.y < 0) {
        alert('Congrats! You have won the game!');
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};


// ENEMY ARRAY
let allEnemies = [];

// ENEMY LOCATION (Y-AXIS)
let enemyLocation = [63, 147, 230];


// MOVE ENEMY (SPEED OF 200)
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// PLAYER STARTING LOCATION
let player = new Player(202, 405);

// SEND KEYPRESS EVENTS TO PLAYER'S HANDLEINPUT METHOD
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
