'use strict'

function Enemy (canvasElement) {
  this.x = canvasElement.width - 100;
  this.y = 100;
  this.size = 10;
  this.speed = 3;
  this.direction = 1;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Enemy.prototype.update = function () {

  this.checkCollisionWithLimits();
  
  this.y += this.speed * this.direction;

}

Enemy.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
  this.ctx.fillStyle = 'red';
  this.ctx.fill();

}

Enemy.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
}

// Brick.prototype.setSpeed = function (speedVariation) {
//   this.speed += speedVariation;
// }

// Brick.prototype.setLength = function (lengthVariation) {
//   this.sizeY += lengthVariation;
// }

Enemy.prototype.checkCollisionWithLimits = function () {
  if (this.y <= this.size) {
    this.setDirection(1);
  }
  if (this.y >= this.canvasElement.height - this.size) {
    this.setDirection(-1);
  }
}