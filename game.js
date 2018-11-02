'use strict'

function Game (canvasElement, lives) {
  this.bullet = null;
  this.brick = null;
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
  this.lives = lives;
}

Game.prototype.play = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function () {
  
  this.bullet = new Bullet (this.canvasElement);
  this.brick = new Brick (this.canvasElement);
  
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

Game.prototype.updateAll = function () {
  this.bullet.update();
  this.brick.update();
}

Game.prototype.clearAll = function () {

  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

}

Game.prototype.drawAll = function () {
  this.bullet.draw();
  this.brick.draw();
}

Game.prototype.checkAllCollisions = function () {
  if (this.bullet.checkCollisionWithMiss()){
    if (this.lives > 1){
      this.lives--;
      this.removeLife();
      this.bullet = new Bullet (this.canvasElement);
    } else{
      this.gameIsOver = true;
      this.finishGame();

    }
  }
}

Game.prototype.gameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.lifeLostCallback = function(callback) {
  this.lifeLostCallback = callback;
}

Game.prototype.removeLife = function () {
  this.lifeLostCallback();
}

Game.prototype.finishGame = function() {
  this.gameOverCallback();
}
