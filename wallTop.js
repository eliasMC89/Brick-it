'use strict'

function WallTop (canvasElement) {
  this.sizeX = 25;
  this.sizeY = canvasElement.height/2 + 10;
  this.x = canvasElement.width / 2 + 55;
  this.y = 0;                              
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
  this.image = new Image();
  this.image.src = './images/muroMetal.jpg';
}

WallTop.prototype.draw = function () {

  this.ctx.fillRect (this.x, this.y, this.sizeX, this.sizeY);
  this.ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);

}