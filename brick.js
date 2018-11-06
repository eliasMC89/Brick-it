'use strict'

function Brick (canvasElement) {
  this.x = canvasElement.width - 25;
  this.y = 0;                              
  this.sizeX = 25;
  this.sizeY = 100;
  this.speed = 5;
  this.direction = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
  // image test
  this.image = new Image();
  this.image.src = './images/brickBackground.jpg';
}

Brick.prototype.update = function () {

  this.checkCollisionWithLimits();
  
  this.y += this.speed * this.direction;

}

Brick.prototype.draw = function () {

  //this.ctx.fillStyle = '#750000';
  this.ctx.fillRect (this.x, this.y, this.sizeX, this.sizeY);
  this.ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);

}

Brick.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
}

Brick.prototype.setSpeed = function (speedVariation) {
  this.speed += speedVariation;
}

Brick.prototype.setLength = function (lengthVariation) {
  this.sizeY += lengthVariation;
}

Brick.prototype.checkCollisionWithLimits = function () {
  if (this.y <= 0) {
    this.setDirection(1);
  }
  if (this.y >= this.canvasElement.height - this.sizeY) {
    this.setDirection(-1);
  }
}