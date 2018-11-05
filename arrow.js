'use strict'

function Arrow (canvasElement) {
  this.xi = 5;
  this.yi = canvasElement.height / 2;
  this.xf = 100;
  this.yf = (canvasElement.height / 2);
  this.angle = 0;
  this.length = 100;
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
}

Arrow.prototype.moveArrow = function (angleVariation) {
  
  if (this.angle < 70 && this.angle > -70){
    this.angle += angleVariation*5;
  }
  
}

Arrow.prototype.draw = function () {

  this.ctx.beginPath();
  this.ctx.save();
  this.ctx.translate(this.xi, this.yi);
  this.ctx.rotate(this.angle*Math.PI/180);
  this.ctx.setLineDash([5, 15]);
  this.ctx.moveTo(0, 0);
  this.ctx.lineTo(150, 0);
  this.ctx.stroke();
  this.ctx.restore();
  
}
