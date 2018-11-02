'use strict'

function Bullet (canvasElement) {
  this.x = 5;
  this.y = canvasElement.height / 2;
  this.size = 5;
  this.speed = 5;
  this.direction = 1;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Bullet.prototype.update = function () {
  this.x += this.speed * this.direction;
}

Bullet.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
  this.ctx.fill();

}

Bullet.prototype.checkCollisionWithMiss = function () {

  if (this.x >= this.canvasElement.width - this.size){
    return true;
  } else{
    return false;
  }
}

Bullet.prototype.checkCollisionWithBrick = function () {


}
