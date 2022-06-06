var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ship, shipImg, shipLeft, shipRight;
var space, spaceImg;
var asteroid, asteroidGroup, asteroidImg;
var score;
var gameOver, gameOverImg;
var restart, restartImg;

function preload()
{
  shipImg = loadImage('ship3.png');
  shipLeft = loadAnimation('ship3.png', 'ship2.png', 'ship1.png');
  shipRight = loadAnimation('ship3.png', 'ship4.png', 'ship5.png');

  spaceImg = loadImage('background.jpg');

  asteroidImg = loadImage('asteroid.png');

  gameOverImg = loadImage('gameOver.png');
  restartImg = loadImage('restart.png');
}

function setup()
{
  createCanvas(windowWidth, windowHeight);

  ship = createSprite(width / 2, height - 70);
  ship.addImage(shipImg);
  
  ship.scale = 0.6;
  ship.setCollider('rectangle', 0, 0, 140, 210);

  asteroidGroup = createGroup();

  gameOver = createSprite(width / 2, height / 2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  
  restart = createSprite(width / 2, gameOver.height + 40);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  

  score = 0

}

function draw()
{
  background(spaceImg);
  text("Score: " + score, 40, 20);

  if(gameState == PLAY)
  {
    score = score + Math.round(frameRate() / 60)

    gameOver.visible = false;
    restart.visible = false;

    if(keyDown(LEFT_ARROW))
    {
      ship.x -= 8;
    }

    if(keyDown(RIGHT_ARROW))
    {
      ship.x += 8;
    }

    if(ship.x < 40)
    {
      ship.x = 40;
    }

    if(ship.x > width - 40)
    {
      ship.x = width - 40;
    }

    spawnAsteroid();

    if(asteroidGroup.isTouching(ship))
    {
      gameState = END;
    }
  }

  else if(gameState == END)
  {
    
    gameOver.visible = true;
    restart.visible = true;

    ship.x = width / 2;
    asteroidGroup.setVelocityYEach(0);
    

    asteroidGroup.setLifetimeEach(-1);
    
  }

  if(mousePressedOver(restart))
    {
      reset();
    }
  

  drawSprites();  
}

function spawnAsteroid()
{
  if(frameCount % 80 == 0)
  {
    asteroid = createSprite(Math.round(random(0, width)), height - (height - 5), 50, 50);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.3;
    asteroid.velocityY = score/30;
    asteroid.lifetime = 200

    asteroidGroup.add(asteroid);
  }
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  asteroidGroup.destroyEach();
  score = 0;
}