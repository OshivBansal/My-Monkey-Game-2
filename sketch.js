var jungleimg, jungle;
var monkey, monkey_running;
var banana, bananaImage;
var obstacle,obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameover,gameoverimg
 
function preload() {

  monkey_running =  loadAnimation("sprite_0.png", "sprite_1.png",  "sprite_2.png", "sprite_3.png",  "sprite_4.png", "sprite_5.png",  "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  jungleimg = loadImage("jungle.jpg");
  
  gameoverimg=loadImage("gameOver.png")
}
function setup() {
  createCanvas(600,430);
  background(200);
   
  jungle=createSprite(300,200,600,400);
  jungle.addImage(jungleimg)
  jungle.scale=0.7;

  monkey = createSprite(170, 315, 20, 20)
  monkey.addAnimation("moving", monkey_running)
  monkey.scale = 0.1 
  // monkey.debug=true;
  ground = createSprite(300, 350, 600, 10)
  ground.visible=false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  gameover=createSprite(300,180);
  gameover.addImage(gameoverimg)
  gameover.scale=0.6;
  
  score=0
}
function draw() {
  background(200);
  
  if (gameState===PLAY){
    gameover.visible=false;
    
    jungle.velocityX=-2;
    if(jungle.x<250){
      jungle.x=300
    }
     ground.velocityX = -7;
  if (ground.x < 300) {
     ground.x = ground.width / 2          
    }
  if (keyDown("space")&& monkey.y>283) {
     monkey.velocityY = -15;
    }
    // console.log(monkey.y)
    monkey.velocityY = monkey.velocityY + 0.8
  // console.log(monkey.y)
  if(monkey.isTouching(bananaGroup)){
      score=score+1;
      bananaGroup.destroyEach();
    }     
     bananas();
     obstacles();
     scales();
  if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
}
  monkey.collide(ground);
  if(gameState===END){
    gameover.visible=true;
    
    monkey.destroy();
    jungle.velocityX=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  drawSprites();
  stroke("white")
  fill("white")
  textSize(20);
  text("Score: " + score,480, 50);
}

function bananas() {
  if (frameCount % 90 === 0) {
    banana = createSprite(600, random(120, 200), 10, 10);
    banana.velocityX = -5;
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }

}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 315, 10, 10);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

function scales() {
  switch (score){
    case 10:monkey.scale=0.14;
    break;
    case 20:monkey.scale=0.16;
    break;
    case 30:monkey.scale=0.18;
    break;
    case 40:monkey.scale=0.20;
    break;
    default:break
  }
}
  