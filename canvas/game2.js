var myGamePiece;
var myObstacles = [];
var myScore;
var background;
var isPaused = false;
var backgroundMusic;
var explosionImage;
var explosionSound;

function startGame() {
    // Create the game elements
    myGamePiece = new component(50, 50, "image", 10, 120, "Spaceship.png");
    background = new component(480, 270, "background", 0, 0, "Background.jpeg");
    myObstacles = []; // Reset obstacles when the game starts
    loadExplosionResources(); // Load explosion resources

    // Hide the Start button and show the Pause/Restart buttons
    document.getElementById('Start_Button').style.display = 'none';
    document.getElementById('Pause_Button').style.display = 'inline-block';
    document.getElementById('Restart_Button').style.display = 'inline-block';

    myGameArea.start();
    playBackgroundMusic(); // Start music when the game starts
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");

        // Insert canvas before the score display
        var buttonDiv = document.getElementById('scoreDisplay').nextSibling;
        document.body.insertBefore(this.canvas, buttonDiv);

        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        });
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
        stopBackgroundMusic();
    },
    pause: function() {
        if (!isPaused) {
            clearInterval(this.interval);
            pauseBackgroundMusic();
            isPaused = true;
        } else {
            this.interval = setInterval(updateGameArea, 20);
            playBackgroundMusic();
            isPaused = false;
        }
    },
    reset: function() {
        this.stop();
        startGame(); // Restart the game
    }
};

function loadExplosionResources() {
    explosionImage = new Image();
    explosionImage.src = "Explosion.png";

    explosionSound = new Audio("Explosion Sound Effect.mp3");
}

function component(width, height, type, x, y, src) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;

    if (type === "image" || type === "background") {
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.loaded = true;
        };
        this.update = function() {
            if (this.loaded) {
                ctx = myGameArea.context;

                if (src === "Laser-Beam-PNG-HD-Image.png") {
                    // Rotate the laser image only
                    ctx.save();
                    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(this.image, -this.height / 2, -this.width / 2, this.height, this.width);
                    ctx.restore();
                } else {
                    // For all other images, including the spaceship and background
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                }
            }
        };
    } else {
        this.update = function() {
            ctx = myGameArea.context;
            ctx.fillStyle = src;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (type === "background") {
            if (this.x <= -this.width) {
                this.x = 0;
            }
        }
    };

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
}

function updateGameArea() {
    if (isPaused) return;

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;

    // Check for collisions
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            playExplosionEffect();
            myGameArea.stop();
            return;
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;

    background.speedX = -1;
    background.newPos();
    background.update();

    // Generate new obstacles at intervals
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        
        // Create upper and lower obstacles with the laser beam image
        var upperObstacle = new component(40, height, "image", x, 0, "Laser-Beam-PNG-HD-Image.png");
        var lowerObstacle = new component(40, myGameArea.canvas.height - height - gap, "image", x, height + gap, "Laser-Beam-PNG-HD-Image.png");
        
        // Add obstacles to the array
        myObstacles.push(upperObstacle);
        myObstacles.push(lowerObstacle);
    }

    // Move and update obstacles
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1; // Move obstacles left
        myObstacles[i].update();
    }

    // Handle game piece movement
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1; } // Left arrow
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1; }  // Right arrow
    if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -1; } // Up arrow
    if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 1; }  // Down arrow

    myGamePiece.newPos();
    myGamePiece.update();

    // Update the score display
    document.getElementById('scoreDisplay').textContent = "SCORE: " + myGameArea.frameNo;
}

function everyinterval(n) {
    return (myGameArea.frameNo / n) % 1 === 0;
}

function playBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = new Audio("Local Forecast - Elevator.mp3");
        backgroundMusic.loop = true;
    }
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

function pauseBackgroundMusic() {
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
}

function playExplosionEffect() {
    if (explosionSound) {
        explosionSound.play();
    }

    myGameArea.context.drawImage(explosionImage, myGamePiece.x - 25, myGamePiece.y - 25, 100, 100);
}
