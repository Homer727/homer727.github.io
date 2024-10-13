var myGamePiece;
var myObstacles = [];
var myScore;
var Paused = false;
var PlayingAudio = true;
var Coins = [];
var collected = 0;
//Initialize needed variables

document.addEventListener("DOMContentLoaded", function() {
    hit_sound = document.getElementById("hit_audio");
    Music = document.getElementById("music");
    start_sound = document.getElementById("start_audio");
    coin_sound = document.getElementById("coin_noise");
});
//Load audio elements to be used as the page loads

function startGame() {
    
    myGamePiece = new gameObject(50, 30, "./game1assets/helicopter.png", 20, 150,"image");
    myScore = new gameObject("30px", "Consolas", "black", 280, 40, "text");
    myCoins = new gameObject("30px", "Consolas", "black", 280, 65, "text");
    
    myCoins.text = "COINS: 0";

    Background = new gameObject(700,320,"./game1assets/Background.jpg",0,0,"background")
    myGameArea.start();

    start_sound.play();
    setTimeout(function()
    {
        Music.play();
    },600)
}
//Starts music after 600ms and creates all needed game objects

var myGameArea = {

    canvas : document.createElement("canvas"),
    //Create canvas
    start : function() {

        if (this.interval)
        {
            clearInterval(this.interval);
        };

        this.canvas.width = 500;

        this.canvas.height = 320;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener("keydown", function(pressed)
        {
            myGameArea.key = pressed.keyCode;
        });
        window.addEventListener("keyup", function(){
            myGameArea.key = false;
        });
        },
        //Initialize canvas and add event listeners for key pressing and unpressing
    stopGame : function()
    {
        clearInterval(this.interval);
        Music.pause();
    },
    //Makes sure game is stopped and cleared when player loses
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //Clears the game area
}

function gameObject(width, height, color, x, y, type) {
    this.type = type;
    if (this.type == "image" || this.type == "background")
    {
        this.image = new Image();
        this.image.src = color;
    }
 
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);

        
        } 
        else if (this.type == "image"|| this.type == "background")
        {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );
            if (this.type == "background")
            {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        }
        else 
        {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //Creates game objects based on width, height, color (or image link), x pos, y pos, and type of object (image, text, background or undefined (rectangle))
    this.newPos = function() {
        //this.gravitySpeed += this.gravity;
        if (this.type == "background") {
            if (this.x <= -this.width) {
                this.x = 0; 
            }}
        this.x += this.speedX;
        this.y += this.speedY //+ this.gravitySpeed;
        this.hitBottom();
    }
    //Sets the position of game objects, if the object is a background then the position should reset when out of frame
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    //Makes sure game piece stays above the bottom of the convas
    this.crashWith = function(otherobj) {
        var crash = false;

        
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        if ((mybottom >= othertop) && (mytop <= otherbottom) && (myright >= otherleft) && (myleft <= otherright)) {
            crash = true;
        }
        
    return crash;
    }
    //If game object collides with another object then this function returns true and if not false
}

function updateGameArea() {
  
    if (Paused === true)
    {
        return;
    }
    //Prevent update if paused
    if (myGameArea.key == false)
    {
        myGamePiece.speedX=0;
        myGamePiece.speedY=0;
        myGamePiece.image.src = "./game1assets/helicopter.png";
    }
    else{
    switch (myGameArea.key)
    {
        case 37:
            myGamePiece.speedX = -4;
            myGamePiece.image.src = "./game1assets/helicopter_backwards.png";
            break;
        case 38:
            myGamePiece.speedY = -4;
            break;
        case 39:
            myGamePiece.speedX = 4;
            myGamePiece.image.src = "./game1assets/helicopter.png";
            break;
        case 40:
            myGamePiece.speedY = 4;
            break;
    }
    }
    //If the helicopter is still or moving right then it faces right, if the helicopter is moving left it faces left
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    var coinChance;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i]))
        {
            hit_sound.play();
            explosion = new gameObject(200, 200, "./game1assets/explosion.png", myGamePiece.x - 50, myGamePiece.y -60,"image");
            explosion.update();
            setTimeout(function()
        {
            myGameArea.stopGame();
        },200)
            document.getElementById("Pause_Button").style.display = "none";
            document.getElementById("Restart_Button").style.display = "block";
            
            return;
        } 
    }
    //Other object to crash with is the obstacles and if the game object does, an explosion is spawned over the player and a hit sound plays while showing the restart button and the game stops 
    for (i = 0; i < Coins.length; i += 1) {
        if (myGamePiece.crashWith(Coins[i]))
        {
            collected +=1;
            myCoins.text ="COINS: " + collected;

            myGameArea.frameNo += 50;
            myScore.text = "SCORE: " + myGameArea.frameNo;


            Coins.splice(i, 1);
            coin_sound.currentTime = 0;
            coin_sound.play();
            i--;


        } 
    }
    //ther object to crash with is the coins and after collision the coins value increases by 1, the coin despawns, and the score is increased by 50
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(50)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
       
        myObstacles.push(new gameObject(10, height, "./game1assets/Pole.png", x, 0,"image"));
        myObstacles.push(new gameObject(10, x - height - gap, "./game1assets/Pole.png", x, height + gap,"image"));
        coinChance = Math.random();
        if(coinChance <= 0.6)
            Coins.push(new gameObject(20, 20, "./game1assets/coin.png", x, height + Math.random() * (gap - 20), "image"));
    }
    //Spawns obstacle and has a 60% chance of spawning a coin every 50 frames

    //Update background to allow it to loop
    Background.speedX = -4;
    Background.newPos();
    Background.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -6;
        myObstacles[i].update();
    }
    for (i = 0; i < Coins.length; i += 1) {
        Coins[i].x += -6;
        Coins[i].update();
    }
    //Update obstacles and coins 
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myCoins.update();
    myGamePiece.newPos();
    myGamePiece.update();  
   
    //Update helicopter, coin text, and score text 
  
   
}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
// Checks if frame number is a multiple of n

function click_start()
{
    startGame();
    document.getElementById("Start_Button").style.display = "none";
    document.getElementById("Pause_Button").style.display = "block";
    
}
//Function that starts the game when the start button is clicked then hides it and displays the pause button
function Pause()
{
    Paused = !Paused;
}
//Pause toggle function for pause button
function Restart()
{
    myObstacles =[];
    Coins = [];
    myScore.text = "SCORE: 0"
    myCoins.text = "COINS: 0"
    collected = 0;
    myGameArea.frameNo = 0;
    Paused = false;

    myGameArea.clear();

    document.getElementById("Pause_Button").style.display = "block";
    document.getElementById("Restart_Button").style.display = "none";
    Music.currentTime = 0;
    startGame();

}
//Initialize everything and restart game when restart button is pressed
function PlayingToggle()
{
    PlayingAudio ? Music.pause() : Music.play();

    Music.onplaying = function(){
        PlayingAudio = true;
    };

    Music.onpause = function()
    {
        PlayingAudio = false;
    };

}
//Toggles background-Music when pressing pause button
