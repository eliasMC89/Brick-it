'use strict'

function ExtraLife (canvasElement) {
  this.x = canvasElement.width - 200;
  this.y = 50;
  this.size = 10;
  this.speed = 4;
  this.direction = 1;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

ExtraLife.prototype.update = function () {

  this.checkCollisionWithLimits();
  
  this.y += this.speed * this.direction;

}

ExtraLife.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
  this.ctx.fill();

}

ExtraLife.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
}

// Brick.prototype.setSpeed = function (speedVariation) {
//   this.speed += speedVariation;
// }

// Brick.prototype.setLength = function (lengthVariation) {
//   this.sizeY += lengthVariation;
// }

ExtraLife.prototype.checkCollisionWithLimits = function () {
  if (this.y <= 0 + this.size) {
    this.setDirection(1);
  }
  if (this.y >= this.canvasElement.height - this.size) {
    this.setDirection(-1);
  }
}