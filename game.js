'use strict'

function Game (canvasElement, lives) {
  this.bullet = null;
  this.brick = null;
  this.enemy = null;
  this.extraLife = null;
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
  this.lives = lives;
  this.score = 0;
  this.level = 1;
  this.arrow = null;
}

Game.prototype.play = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function () {
  
  this.bullet = new Bullet (this.canvasElement);
  this.brick = new Brick (this.canvasElement);
  this.enemy = new Enemy (this.canvasElement);
  this.extraLife = new ExtraLife (this.canvasElement);
  this.arrow = new Arrow (this.canvasElement);

  this.shootBullet = function(event) {
    if (event.key === ' ') {
      this.bullet.startMovement(1);
    } 
    
  }.bind(this);

  this.changeArrowDirection = function (event) {
    if (event.key === 's'){
      this.arrow.moveArrow(1);
      this.bullet.setSpeedAngle(1);
    } else if (event.key === 'w'){
      this.arrow.moveArrow(-1);
      this.bullet.setSpeedAngle(-1);
    }
  }.bind(this);

  document.addEventListener ('keydown', this.shootBullet);
  document.addEventListener ('keyup', this.changeArrowDirection);
  
  var loop = function () {
    
    this.checkAllCollisions();
    this.updateAll();
    this.clearAll();
    this.drawAll();

    if (!this.gameIsOver){
      requestAnimationFrame(loop);
    }
  }.bind(this);

  loop();

}

Game.prototype.updateAll = function (event) {
  this.bullet.update();
  this.brick.update();
  this.enemy.update();
  this.extraLife.update();
}

Game.prototype.clearAll = function () {

  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

}

Game.prototype.drawAll = function () {
  this.bullet.draw();
  this.brick.draw();
  this.enemy.draw();
  this.extraLife.draw();
  this.arrow.draw();
}

Game.prototype.checkAllCollisions = function () {
  if (this.bullet.checkCollisionWithMiss()){
    if (this.lives > 1){
      this.lives--;
      this.updateLife();
      this.bullet = new Bullet (this.canvasElement);
    } else{
      this.gameIsOver = true;
      this.endGame();

    }
  }else if (this.bullet.checkCollisionWithBrick(this.brick)){
    this.score += 5;
    this.level++;
    this.updateScore();
    this.addLevel();
    this.brick.setSpeed(2);
    this.brick.setLength(-10);
    this.bullet = new Bullet (this.canvasElement);

  }else if (this.bullet.checkCollisionWithEnemy(this.enemy)){
    if (this.lives > 1){
      this.lives--;
      this.updateLife();
      this.bullet = new Bullet (this.canvasElement);
    } else{
      this.gameIsOver = true;
      this.endGame();
    } 
  } else if (this.bullet.checkCollisionWithExtraLife(this.extraLife)){
      this.lives++;
      this.updateLife();
      this.bullet = new Bullet (this.canvasElement);
  }
  
}

Game.prototype.gameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.livesUpdateCallback = function(callback) {
  this.lifeLostCallback = callback;
}

Game.prototype.scoreUpdateCallback = function (callback){
  this.scoreUpdateCallback = callback;
}

Game.prototype.levelUpdateCallback = function (callback){
  this.levelUpdateCallback = callback;
}

Game.prototype.endGame = function() {
  this.gameOverCallback();
}

Game.prototype.updateLife = function () {
  this.lifeLostCallback();
}

Game.prototype.updateScore = function () {
  this.scoreUpdateCallback();
}

Game.prototype.addLevel = function () {
  this.levelUpdateCallback();
}

