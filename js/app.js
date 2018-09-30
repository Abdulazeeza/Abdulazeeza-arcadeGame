 const Enemy = function(positionX,positionY) {  // enemy constructor for the bugs that or player must avoid

     this.positionX = positionX;           // takes the X position for the enemy 
     this.positionY = positionY;           // takes the Y position of the enemy
     this.sprite = 'images/enemy-bug.png';  // takes the image of the enemy
     this.distanceRow = 10;                // the highest distance the enemy must cover befor coming back
};

Enemy.prototype.update = function(dt) {   // updates the enemy 
    if(this.positionX < this.distanceRow){ // compares the enemy position to see if it hasnt cover the expected distance
        
        if(player1.level === 1){          // checks if the player level is 1 and muiltiply the speed by 2
           this.positionX += (2 * dt);
        }
        else if(player1.level === 2){     // checks if the player level is 2 and muiltiply the speed by 2.5
            this.positionX += (2.5 * dt);
        }
        else if(player1.level === 3){     // checks if the player level is 3 and muiltiply the speed by 3.5
            this.positionX += (3.5 * dt);
        }
        else if(player1.level === 4){     // checks if the player level is 4 and muiltiply the speed by 4
            this.positionX += (4 * dt);
        }
        else if(player1.level === 5){    // checks if the player level is 5 and muiltiply the speed by 5.5
            this.positionX += (5.5 * dt);
        }
        else if(player1.level === 6){    // checks if the player level is 6 and muiltiply the speed by 6
            this.positionX += (6 * dt);
        }
        else{
          player1.level = 1;        // checks if the player level is not equal any of the above and reset the level to 1
        }
    }
    else{
       this.positionX = -5;        // if the enemy has covered the expected distance reset its X position to -5
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.positionX * 101, this.positionY * 80); // draws the enemy on the screen
};

class Player{      // constructor for the player
    constructor(){ 
        this.playerCol = 2;     // takes the X position of the player and give it a default of 2
        this.playerRow = 6;     // takes the Y position of the player and give it a default of 0
        this.hero = 'images/char-boy.png';  // the player image
        this.level = 1;                   // set the player level to 1 as default
        this.numberOfTimesInLevel = 0;    // set the number of times the player as to reach the water before the level increases
        this.moves = 0;             //set the number of moves of player to zero as default
        this.heart = 0;             // set the number of heart the player gets to 0 as default
        this.star = 0;              // set the number of star the player gets to 0 as default
    }

    update(){   // updates the players properties
      
        for(let enemy of allEnemies){    // loop through all enemies
              
            if((this.playerRow) === (enemy.positionY) && Math.round((this.playerCol) - (enemy.positionX)) == 0 ){  // compare the enemy position with players if the are the same 
                 if(soundEffect === true){ //if the sound effect is allowed call the killsound 
                    killSound.play();
                 }
                 this.playerCol = 2;    //resets the player position to default
                 this.playerRow = 5;
                 this.numberOfTimesInLevel -= 1; // minus 1 from the number of times the player reaches the water
            }

         }

         if((this.playerCol)  === (gamepro.xstar) && (this.playerRow) === (gamepro.ystar)){   // checks if the star and the player are in the same position
              gamepro.time = 0;  // sets the time for gamepro properties back to zero which removes the star from the position
             if(soundEffect === true){    //if the sound effect is allowed call the eat sound 
                eat.play();
             }
              gamepro.numStar++;   // increase the number of star
              star.innerHTML = gamepro.numStar;   //display the number of star on screen
         }

         if((this.playerCol)  === (gamepro.xheart) && (this.playerRow) === (gamepro.yheart)){  // checks if the heart and the player are in the same position
              gamepro.time = 1199;   // sets the time for gamepro properties back to 1199 which removes the heart from the position
              if(soundEffect === true){  //if the sound effect is allowed call the eat sound 
                eat.play();
             }
              gamepro.numHeart++;          // increase the number of heart
              heart.innerHTML = gamepro.numHeart;   //display the number of hearton screen
              this.numberOfTimesInLevel++;   //increase the numberOfTimesInLevel which automaticall increases the player life
         }

        if(this.playerRow === 0){    // if the player Y position is at the first row 
                 
                  if(soundEffect === true){  //if the sound effect is allowed call the gamepoint sound 
                      Gamepoint.play();
                  }
                  setTimeout(function(){   // wait for 0.001second before reseting the player position
                  player1.playerCol = 2;   // set the player position to default
                  player1.playerRow = 5;
             
             },1);
               
                 player1.numberOfTimesInLevel += 1; //increase the number of times the player as reach the water
                
                   if(this.numberOfTimesInLevel === 5){  //check if the number of times is 5 
                      
                      if(this.level === 6){    //check if the number of level is 6 
                            modal2.style.display = 'inline-block';  // display the congratulation message
                           if(soundEffect === true){ //if the sound effect is allowed call the congrats sound 
                            congrat.play();
                          }

                      }else{   //check if the number oflevel is not equal to 6
                            this.level += 1;     //increament the level by 1
                            level.innerHTML = this.level;   // display the level on the screen
                            this.numberOfTimesInLevel = 0;  //reset the number of times in level to 0
                      }
                  }
             
            }

            if(this.numberOfTimesInLevel === -3){  //check if the number of times in a level is -3
                
                modal3.style.display = 'inline-block';  //display game over
                  if(soundEffect === true){ //if the sound effect is allowed call the gameover  sound 
                   gameover.play();
              }
             }

} 
    render(){
       ctx.drawImage(Resources.get(this.hero), this.playerCol * 101, this.playerRow * 80);  // draw the hero
    }

    handleInput(playerPosition){  //checks of the requested position of the player
       
      if(playerPosition === 'up' && this.playerRow >= 1){   // check if the position is up and the player Y position is gerater or equal to 1
             
            if((this.playerCol)  === (gamepro.xrock) && (this.playerRow) - 1 === (gamepro.yrock) ){ //check if the rock is on top of the player
                 //do nothing  
            }else{     // if the rock is not on top  allow the player to move up
              this.playerRow-=1;  
            }
       }
       else if(playerPosition === 'down' && this.playerRow <= 4){  // check if the position is down and the player Y position is less or equal to 4
          
           if((this.playerCol)  === (gamepro.xrock) && (this.playerRow) + 1 === (gamepro.yrock) ){ //check if the rock is below of the player
                   //do nothing
            }else{   //if the rock is not below  allow the player to move down
              this.playerRow+=1;
            }
       }
       else if(playerPosition === 'right' && this.playerCol <= 3){ // check if the position is right and the player X position is less or equal to 3
          
          if((this.playerRow) === (gamepro.yrock) && (this.playerCol) + 1  === (gamepro.xrock)){  //check if the rock is by the right of the player
               //do nothing
          }else{    //if the rock is not by the right allow the player to move right
             this.playerCol+=1;
          }
       }
       else if(playerPosition === 'left' && this.playerCol >= 1){   // check if the position is left and the player X position is greater or equal to 1
         
           if((this.playerRow) === (gamepro.yrock) && (this.playerCol) - 1  === (gamepro.xrock)){ //check if the rock is by the left of the player
               //do nothing
          }else{
            this.playerCol-=1;   //if the rock is not by the left allow the player to move left
            
          }
       }
       
       if(this.playerRow != 0){   //check if theplayer Y position is not equal to zero. 
            if(soundEffect === true){  //if the sound effect is allowed call the movesound  sound 
                MoveSound.play();
            } 
        }
        this.moves+=1;  //increament the moves of player by 1
    }
}
 
class PlayerGain{   //contructor for the player gains
  constructor(){
       this.starE = 'images/Star.png';   //take the image of the star
       this.heartE = 'images/Heart.png';   // takes the image of the heart
       this.rock = 'images/Rock.png';   // takes the image of the rock
       this.xstar = 10;  //set the initial X position of star to 10
       this.ystar = 1;   //set the initial Y position of star to 1
       this.xheart = 10; //set the initial X position of heart to 10
       this.yheart = 2;   //set the initial Y position of heart to 2
       this.xrock = 10;   //set the initial X position of rock to 10
       this.yrock = 1;   //set the initial Y position of rock to 1
       this.numStar = 0;  // set the number of star the player gets to zero
       this.numHeart = 0;   // set the number of heart the player gets to zero
       this.time = 0;      // set the number of time the star,heart,rock appears on screen to zero
  }
  update(){   //updates the playgain propeties
      
    if(player1.moves % 15 === 0){  //check if the number of moves of player divided by 15 remainder id zero
      player1.moves = 1;   //set the number of move to 1
         this.time = 3000;  //set the time to 3000
    }

    if(this.time > 0){   //check if the time is greater 0 ,then reduce it by 1
        this.time--;
    }

    if(this.time > 0 && this.time < 1000){  //check if the time is greater 0 and less than 1000 set the xstar to 2 and ystar to 3
      this.xstar = 2;   
      this.ystar = 3;
    }
    else{   //else if the time is not greater 0 and less than 1000 set the xstar to 10
        this.xstar = 10;
    }

    if(this.time > 1200 && this.time < 2000){   //check if the time is greater 1200 and less than 2000 set the xheart to 3 and yheart to 1
       this.xheart = 3;
       this.yheart = 1;
    } 
    else{       //else if the time is not greater 200 and less than 1200 set the yheart to 10
      this.yheart = 10;
    }

    if(this.time > 2500 && this.time < 3000){  //check if the time is greater 2500 and less than 3000 set the xrock to 2 and yrock to 3
      this.xrock = 2;
      this.yrock = 3;
    }
    else{  //else if the time is not greater 200 and less than 1200 set the xrock to 10
      this.xrock = 10;
    }

}
  render(){
      
       if(this.time > 0 && this.time < 1000){  // drawImage for star  if the time is greater 0 and less than 1000
             ctx.drawImage(Resources.get(this.starE), this.xstar * 101, this.ystar * 80);
       }
       else if(this.time > 1200 && this.time < 2000){  // drawImage for heart  if the time is greater 1200 and less than 2000
            ctx.drawImage(Resources.get(this.heartE), this.xheart * 101, this.yheart * 80);
       }
       else if(this.time > 2500 && this.time < 3000){   // drawImage for rock  if the time is greater 2500 and less than 3000
            ctx.drawImage(Resources.get(this.rock), this.xrock * 101, this.yrock * 80);
       }
       
     }

}

class sound{   //constructor for sound
  constructor(src){   // the argument of sound 
    this.sound = document.createElement("audio");  //craete the audio element in html file
    this.sound.src = src;   //pass the sound argument to the sound src
    this.sound.setAttribute("controls", "none");// set controls to none
    this.sound.style.display = "none";  //hide the audio display
    document.body.appendChild(this.sound);   //add the audio element to html document
     
     this.play = function(){  //plays the sound
        this.sound.play();
    }
  }
} 
class Reset{      // resets the various properties to their default and display on screen
   constructor(){

   }
   update(){
   player1.level = 0;
   player1.numberOfTimesInLevel = 0;
   player1.heart = 0;
   player1.star = 0;
   level.innerHTML = player1.level;
   star.innerHTML = 0;
   heart.innerHTML = 0;
   player1.moves = 1;
   gamepro.time = 0;
  }
}

    const gameover = new sound('sound/gameover.wav');
    const MoveSound = new sound('sound/move.wav');   //create and inheriatamce for sound class
    const killSound = new sound('sound/dead.wav');     //create and inheriatamce for sound class
    const Gamepoint = new sound('sound/gamepoint.wav');   //create and inheriatamce for sound class
    const congrat = new sound('sound/congratulation.wav');    //create and inheriatamce for sound class
    const eat = new sound('sound/eat.wav');                    //create and inheriatamce for sound class
    const player1 = new Player();   //create and inheriatamce for player class
    const gamepro = new PlayerGain();  //create and inheriatamce for playergain class

    const enemy1 = new Enemy(-5,1);   //create and inheriatamce for enemy class with the X position and Y position pass
    const enemy2 = new Enemy(-3,2);  
    const enemy3 = new Enemy(2,3);
    const enemy4 = new Enemy(-1,1);
    const enemy5 = new Enemy(3,2);
    const enemy6 = new Enemy(3,3);
    const enemy7 = new Enemy(6,1);
    const enemy8 = new Enemy(6,2);
    const enemy9 = new Enemy(5,3);
    const enemy10 = new Enemy(7,1);
    const enemy11 = new Enemy(7,2);
    const enemy12 = new Enemy(9,3);
    const enemy13 = new Enemy(9,1);
    const enemy14 = new Enemy(10,2);
    const enemy15 = new Enemy(10,3);

    const ResetGame = new Reset();
    const startgame = document.querySelector('.start');  // gets the class nameof the start button
    const modal1 = document.querySelector('#myModal');   // gets the id of the modal1 
    const modal2 = document.querySelector('#secondModal'); // gets the id of the modal2 
    const modal3 = document.querySelector('#thirdModal');// gets the id of the modal3
    const level = document.querySelector('.level');  //get the class name of level
    const star = document.querySelector('.numstar');   //get the class name of star
    const heart = document.querySelector('.numheart');   //get the class name of heart
    const playAgain = document.querySelector('.playAgain');   //get the class name of playagin
    const play = document.querySelector('.play');   //get the class name of play
    let soundEffect = true;  //set sound to true as default
    const volumeUp = document.querySelector('.volume-up');   //get the class name of volume up
    const volumeOff = document.querySelector('.volume-off');   //get the class name of volume off
    const allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8,enemy9,enemy10,enemy11,enemy12,enemy13,enemy14,enemy15]; //pass the inherited enemy classes into an array
    player1.handleInput('up');  //pass the up key as argument to the input handler in our player class
    modal2.style.display = 'none';  //display none for modal2
    modal3.style.display = 'none';  // display none for modal3

    document.addEventListener('keyup', function(e) { //listen to the keyup event
    const allowedKeys = {  //create a key object and passes various position to their keycode
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
     
     if(modal1.style.display === 'none' && modal2.style.display === 'none' && modal3.style.display === 'none' ){ //check if all the modal are at display none
     
     if(allowedKeys[e.keyCode] === 'up' || allowedKeys[e.keyCode] === 'down' || allowedKeys[e.keyCode] === 'left' || allowedKeys[e.keyCode] === 'right'){ // check if any of the position are clicked
       player1.handleInput(allowedKeys[e.keyCode]); // pass the position to handle inputs
    }
  }
});

   startgame.addEventListener('click', function() {  //listen to click event for start game
         modal1.style.display = 'none';  //display none for modal1
    }, false);    

   volumeUp.addEventListener('click', function(){   //listen to click event for volume up 
       volumeUp.style.display = 'none';   //display none for volume up
       volumeOff.style.display = 'inline-block';  //display volume off
       soundEffect = false;
   }, false);
 
   volumeOff.addEventListener('click', function(){   //listen to click event for volume off 
       volumeUp.style.display = 'inline-block';   //display  volume up
       volumeOff.style.display = 'none';     //display none for volume off
       soundEffect = true;
   });

   playAgain.addEventListener('click', function(){   //listen to click event for play again
        modal3.style.display = 'none';     //display none for modal3
        ResetGame.update();                     //reset app.js
     
   });

   play.addEventListener('click', function(){    //listen to click event for play 
        modal2.style.display = 'none';   //display none for modal2
        ResetGame.update();                       //reset app.js
   });