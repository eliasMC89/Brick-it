'use strict'

function Game (canvasElement) {
  this.bullet = null;
  this.brick = null;
  this.canvasElement = canvasElement;
  this.initialBulletPosition = {
    x: 0,
    y: this.canvasElement.height / 2
  }
  this.initialBrickPosition = {
    x: this.canvasElement.width,
    y: this.canvasElement.height / 2
  }
  this.gameIsOver = false;
}

Game.prototype.play = function() {

  this.ctx = this.canvasElement.getContext('2d');

  this.startLoop();
}

Game.prototype.startLoop = function () {

  var loop = function () {

    console.log ('looping');

    if (!this.gameIsOver){
      requestAnimationFrame(loop);
    }
  }.bind(this);

  loop();

}

Game.prototype.updateAll = function () {

}

Game.prototype.clearAll = function () {

}

Game.prototype.updateAll = function () {

}

Game.prototype.drawAll = function () {

}

Game.prototype.checkAllCollisions = function () {

}

Game.prototype.finishGame = function () {

}
