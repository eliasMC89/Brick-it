'use strict'

function Wall (canvasElement) {
  this.sizeX = 25;
  this.sizeY = 200;
  this.x = canvasElement.width / 2;
  this.y = canvasElement.height - this.sizeY;                              
  this.canvasElement = canvasElement;
  this.ctx = this.canvasElement.getContext('2d');
  // this.image = new Image();
  // this.image.src = './images/brickBackground.jpg';
}

Wall.prototype.draw = function () {

  this.ctx.fillRect (this.x, this.y, this.sizeX, this.sizeY);
  // this.ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);

}