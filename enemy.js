'use strict';

class Enemy {
  constructor (canvasElement) {
    this.x = (canvasElement.width / 2 + 90) + (Math.random() * (150));// canvasElement.width - 100;
    this.y = 100;
    this.size = 15;
    this.speed = 3;
    this.direction = 1;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.image = new Image();
    this.image.src = './images/modern-15-skull.svg.png';
  }

  update () {
    this.checkCollisionWithLimits();
    this.y += this.speed * this.direction;
  }

  draw () {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.ctx.drawImage(this.image, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
  }

  setDirection (newDirection) {
    this.direction = newDirection;
  }

  checkCollisionWithLimits () {
    if (this.y <= this.size) {
      this.setDirection(1);
    }
    if (this.y >= this.canvasElement.height - this.size) {
      this.setDirection(-1);
    }
  }
}
