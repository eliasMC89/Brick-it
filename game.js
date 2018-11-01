'use strict'

function Game () {
  this.ball = null;
  this.goal = null;
  this.canvasElement = canvasElement;
  this.initialBallPosition = {
    x: 0,
    y: this.canvasElement.height / 2
  }
  this.initialGoalPosition = {
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
