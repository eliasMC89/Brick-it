'use strict'

function Game (canvasElement) {
  this.bullet = null;
  this.brick = null;
  this.canvasElement = canvasElement;
  this.gameIsOver = false;
}

Game.prototype.play = function() {

  this.ctx = this.canvasElement.getContext('2d');

  
  this.startLoop();
}

Game.prototype.startLoop = function () {
  
  this.bullet = new Bullet (this.canvasElement);
  this.brick = new Brick (this.canvasElement);
  
  var loop = function () {
    
    console.log ('looping');
    
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

}

Game.prototype.finishGame = function () {

}
