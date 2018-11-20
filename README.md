# Brick it

## Description

A static bullet is placed on the center left part of the screen and a brick with a certain size and a certain speed will move up and down on the right part of the screen. The player presses the "shoot bullet" key and the bullet moves towards the brick. If the bullet reaches the brick, the player's score increases and advances to the next level, where the brick's speed increases and it's size decreases. If the bullet doesn't reach the brick, one life is removed from the player. When the player misses the shot and has no lives remaining, the game is over.

## MVP

A bullet is shot towards a moving brick.

## Backlog

- High Scores
- Clean code (Inheritance)
- More levels
- Background image

## Data Structure

main.js
```
buildSplash();
destroySplash();
buildGameScreen();
destroyGameScreen();
buildGameOverScreen();
destroyGameOverScreen();
```

game.js
```
Game () {
  this.bullet
  this.brick
  this.ctx
}

start();
starLoop();
updateAll();
clearAll();
drawAll();
checkAllCollisions();
finishGame();
```

bullet.js
```
Bullet() {
  this.position
  this.size
  this.lives
  this.score
  this.direction
  this.ctx
}

update()
draw()
checkCollisionWithBrick()
checkCollisionWithMiss()
```

brick.js
```
Brick() {
  this.position
  this.size
  this.speed
  this.ctx
}

update()
draw()
checkCollisionWithLimits()
[*setSize()
setDirection()
setSpeed()
increaseSpeed()*]
```

## States and State Transitions

SplashScreen
- buildSplash
- destroyGameOver
- addEventListener (start game)

GameScreen
- buildGameScreen
- destroySplash
- destroyGameOverScreen
- new Game
- start.Game

GameOverScreen
- buildGameOverScreen
- destroyGameScreen
- addEventListener (start game) 

## Task

- create files
- build main
- 3 states transition
- build game
- build loop
- build bullet
- build brick
- move bullet
- move brick
- check miss collisions
- check brick collisions
- check score collisions
- backlog

## Link

https://eliasmc89.github.io/Brick-it/
