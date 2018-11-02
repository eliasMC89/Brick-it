'use strict'

function Brick (canvasElement) {
  this.x = canvasElement.width - 50;
  this.y = canvasElement.height / 2;
  this.sizeX = 5;
  this.sizeY = 30;
  // this.speed = 5;
  // this.direction = 1;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Brick.prototype.update = function () {

}

Brick.prototype.draw = function () {

  this.ctx.fillRect (this.x, this.y, this.sizeX, this.sizeY);

}

Brick.prototype.checkCollisionWithLimits = function () {

}