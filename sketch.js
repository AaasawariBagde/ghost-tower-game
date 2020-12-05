var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage , climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleblockGroup;
var gameState = "play"
//var gameState = "end"
var spookySound;


function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}


function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleblockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  
}

function draw() {
  background(0);
  
  if (gameState === "play") {
    spookySound.play();
  if(tower.y>400) {
    tower.y = 300;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x +3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleblockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
  
  spawnDoors();
  
  drawSprites();
  }
    
    
  if (gameState === "end"){
   stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(200,-50);
    door.addImage(doorImage);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
  
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY= 1;
    
    
    climbersGroup.add(climber);  
    doorsGroup.add(door);
    invisibleblockGroup.add(invisibleBlock);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x
    invisibleBlock.x = door.x

    door.velocityY = 1;
    door.lifetime = 600;
    
    climber.velocityY = 1;
    climber.lifetime = 600;
    
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    
    ghost.depth = door.depth;
    ghost.depth  += 1;
  }
}




