'use strict'

function Brick (canvasElement) {
  this.x = canvasElement.width - 50;
  this.y = 0;                              //canvasElement.height / 2;
  this.sizeX = 5;
  this.sizeY = 30;
  this.speed = 5;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Brick.prototype.update = function () {

  if (this.y <= 0) {
    this.setDirection(1);
  }

  if (this.y >= this.canvasElement.height - this.sizeY) {
    this.setDirection(-1);
  }

  this.y += this.speed * this.direction;
  
  //this.y += this.speed * this.direction;

}

Brick.prototype.draw = function () {

  this.ctx.fillRect (this.x, this.y, this.sizeX, this.sizeY);

}

Brick.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
}

Brick.prototype.checkCollisionWithLimits = function () {

}