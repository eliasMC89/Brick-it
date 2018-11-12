'use strict';

class WallBottom {
  constructor (canvasElement) {
    this.sizeX = 25;
    this.sizeY = null;
    this.x = canvasElement.width / 2 - 100;
    this.y = null;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.image = new Image();
    this.image.src = './images/muroMetal.jpg';
  }

  draw () {
    this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    this.ctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
  }

  setHeightAndPosition (size) {
    this.sizeY = this.canvasElement.height / 2 + size;
    this.y = this.canvasElement.height - this.sizeY;
  }
}
