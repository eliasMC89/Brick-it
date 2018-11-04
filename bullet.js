'use strict'

function Bullet (canvasElement) {
  this.x = 5;
  this.y = canvasElement.height / 2;
  this.size = 5;
  this.angle = 0;
  //this.initialSpeed = 20;
  this.speed = {
    x: 20,
    y: 0
  }
  this.startMove = 0;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Bullet.prototype.update = function () {

  this.x += this.speed.x * this.startMove;
  this.y += this.speed.y * this.startMove;

}

Bullet.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2,true);
  this.ctx.fill();

}

Bullet.prototype.startMovement = function (move) {
  this.startMove = move;
}

Bullet.prototype.setSpeedAngle = function (angleVariation) {

  this.angle += 5*angleVariation;
  
  this.speed.x = 20 * Math.cos(this.angle * Math.PI/180);
  this.speed.y = 20 * Math.sin(this.angle * Math.PI/180);
}


Bullet.prototype.checkCollisionWithMiss = function () {

  if (this.x >= this.canvasElement.width - this.size){
    return true;
  } else{
    return false;
  }
}

Bullet.prototype.checkCollisionWithBrick = function (brick) {

  var distX = Math.abs(this.x - brick.x-brick.sizeX/2);
  var distY = Math.abs(this.y - brick.y-brick.sizeY/2);

  if (distX > (brick.sizeX/2 + this.size)) { return false; }
  if (distY > (brick.sizeY/2 + this.size)) { return false; }

  if (distX <= (brick.sizeX/2)) { return true; } 
  if (distY <= (brick.sizeY/2)) { return true; }

  var dx=distX-brick.sizeX/2;
  var dy=distY-brick.sizeY/2;
  return (dx*dx+dy*dy<=(this.size*this.size));

}

Bullet.prototype.checkCollisionWithEnemy = function (enemy) {
 
  return (Math.sqrt((enemy.x-this.x)*(enemy.x-this.x)+(enemy.y-this.y)*(enemy.y-this.y))<(this.size+enemy.size));

}

Bullet.prototype.checkCollisionWithExtraLife = function (extraLife) {
 
  return (Math.sqrt((extraLife.x-this.x)*(extraLife.x-this.x)+(extraLife.y-this.y)*(extraLife.y-this.y))<(this.size+extraLife.size));

}

