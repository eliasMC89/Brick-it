# Goal!

## Description

A static ball is placed on the center left part of the screen and a goal with a certain size and a certain speed will move up and down on the right part of the screen. The player presses the "shoot ball" key and the ball moves towards the goal. If the ball gets in the goal, the player's score increases and advances to the next level, where the goal's speed increases and it's size decreases. If the ball doesn't get in the goal, one life is removed from the player. When the player misses the shot and has no lives remaining, the game is over.

## MVP (canvas)

A ball is shot towards a moving goal.

## Backlog

- Instructions
- Ball direction
- Bouncing
- Enemies
- Extra Lives
- High Scores
- Sprites
- Sounds
- Music

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
  this.ball
  this.goal
}

start();
starLoop();
updateAll();
clearAll();
drawAll();
checkAllCollisions();
finishGame();
```

ball.js
```
Ball() {
  this.position
  this.size
  this.lives
  this.score
  this.direction
}

update()
draw()
checkCollisionWithWall()
checkCollisionWithGoal()
```

goal.js
```
Goal() {
  this.position
  this.size
  this.speed
}

update()
draw()
checkCollisionWithLimits()
setSize()
setDirection()
setSpeed()
increaseSpeed()
```



## States and State Transitions

## Task

## Links

### Trello

### Link

### Slides
