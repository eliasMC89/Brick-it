'use strict'

function Arrow (canvasElement) {
  this.x = 5;
  this.y = canvasElement.height / 2;
  this.length = 1;
  this.width = 100;
  //this.angle = ;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Arrow.prototype.update = function () {

  

}

Arrow.prototype.draw = function () {

  this.ctx.fillRect (this.x, this.y, this.width, this.length);
}