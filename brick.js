'use strict';

class Brick {
  constructor (canvasElement) {
    this.x = canvasElement.width - 25;
    this.y = 0;
    this.sizeX = 25;
    this.sizeY = 200;
    this.speed = 5;
    this.direction = 0;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.image = new Image();
    this.image.src = './images/brickWall2.jpeg';
    this.brickLimitSound = document.createElement('audio');
    this.brickLimitSound.src = './sounds/brickLimit.mp3';
  }

  update () {
    this.checkCollisionWithLimits();
    this.y += this.speed * this.direction;
  }

  draw () {
    this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    this.ctx.drawImage(this.image, this.x, this.y, this.sizeX + 10, this.sizeY + 10);
  }

  setDirection (newDirection) {
    this.direction = newDirection;
  }

  setSpeed (speedVariation) {
    this.speed += speedVariation;
  }

  setLength (lengthVariation) {
    this.sizeY += lengthVariation;
  }

  checkCollisionWithLimits () {
    if (this.y <= 0) {
      this.brickLimitSound.play();
      this.setDirection(1);
    }
    if (this.y >= this.canvasElement.height - this.sizeY) {
      this.brickLimitSound.play();
      this.setDirection(-1);
    }
  }
}
