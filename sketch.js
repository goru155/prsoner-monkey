var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;
var monkey , monkey_running,fallingmonkey_img;
var banana ,bananaImage, rock, rockImage;
var FoodGroup, rockGroup;
var forest,forest_img;
var invisiGround;
var score;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  
  forest_img=loadImage("forest.png");

fallingmonkey_img=loadAnimation("monkey2.png","monkey1.png")
  
}



function setup() {
  createCanvas(400,400);
  
  forest=createSprite(200,200,10,10);
  forest.addImage("forest",forest_img);
  forest.scale=2.3;
  
  monkey=createSprite(60,355,10,10);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.scale=0.1;
  
  invisiGround=createSprite(0,395,900,10);
  invisiGround.velocityX=-8;
  
  FoodGroup=new Group();
  rockGroup=new Group();
  
}


function draw() {
  background("black");
  
  if (invisiGround.x < 0){
    invisiGround.x = invisiGround.width/2;
  }
  
  spawnFood();
  spawnObstacles();
  
  invisiGround.visible=false;
    
  if(gameState===PLAY){
  
  if(keyDown("space") ) {
    monkey.velocityY = -14 ;
  }
    
  if(monkey.isTouching(FoodGroup)){
  FoodGroup.destroyEach();
  }
    
  if(rockGroup.isTouching(monkey)){
    gameState = END;
  }
  
  }else if(gameState===END){
    
  monkey.changeImage("monkeyfelldown",fallingmonkey_img);
    FoodGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    
  }
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisiGround);
  drawSprites(); 
  
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
}

function spawnFood(){
    if (frameCount % 80 === 0) {
      banana=createSprite(350,350,10,10);
      banana.y = Math.round(random(190,280));
      banana.addImage("banana",bananaImage);
      banana.velocityX=-(3+(survivalTime/100));
      banana.scale=0.1;
      banana.lifetime=390;
      
      FoodGroup.add(banana);
    }
}

function spawnObstacles(){  
  if (frameCount % 200 === 0) {
      rock=createSprite(350,370,10,10);
      rock.x = Math.round(random(350,400));
      rock.addImage("rock",rockImage);
      rock.scale=0.1;
      rock.velocityX=-(5+(survivalTime/100));
      rock.lifetime=200;
      
      rockGroup.add(rock);
  }
}
