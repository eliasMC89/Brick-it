'use strict';

class Bullet {
  constructor (canvasElement) {
    this.x = 5;
    this.y = canvasElement.height / 2;
    this.size = 5;
    this.angle = 0;
    this.speed = {
      x: 15,
      y: 0
    };
    this.startMove = 0;
    this.bounce = null;
    this.canvasElement = canvasElement;
    this.ctx = this.canvasElement.getContext('2d');
  }

  update () {
    this.x += this.speed.x * this.startMove;
    this.y += this.speed.y * this.startMove;
  }

  draw () {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.ctx.fillStyle = '#262626';
    this.ctx.fill();
  }

  startMovement (move) {
    this.startMove = move;
  }

  setSpeedAngle (angleVariation) {
    if (this.angle < 70 && this.angle > -70) {
      this.angle += angleVariation * 5;
    } else if (this.angle === -70 && angleVariation > 0) {
      this.angle += angleVariation * 5;
    } else if (this.angle === 70 && angleVariation < 0) {
      this.angle += angleVariation * 5;
    }

    this.speed.x = 15 * Math.cos(this.angle * Math.PI / 180);
    this.speed.y = 15 * Math.sin(this.angle * Math.PI / 180);
  }

  checkCollisionWithMiss () {
    if (this.x >= this.canvasElement.width - this.size) {
      return true;
    } else {
      return false;
    }
  }

  checkCollisionWithBrick (brick) {
    const distX = Math.abs(this.x - brick.x - brick.sizeX / 2);
    const distY = Math.abs(this.y - brick.y - brick.sizeY / 2);

    if (distX > (brick.sizeX / 2 + this.size)) { return false; }
    if (distY > (brick.sizeY / 2 + this.size)) { return false; }

    if (distX <= (brick.sizeX / 2)) { return true; }
    if (distY <= (brick.sizeY / 2)) { return true; }

    const dx = distX - brick.sizeX / 2;
    const dy = distY - brick.sizeY / 2;
    return (dx * dx + dy * dy <= (this.size * this.size));
  }

  checkCollisionWithEnemy (enemy) {
    return (Math.sqrt((enemy.x - this.x) * (enemy.x - this.x) + (enemy.y - this.y) * (enemy.y - this.y)) < (this.size + enemy.size));
  }

  checkCollisionWithEnemy2 (enemy2) {
    return (Math.sqrt((enemy2.x - this.x) * (enemy2.x - this.x) + (enemy2.y - this.y) * (enemy2.y - this.y)) < (this.size + enemy2.size));
  }

  checkCollisionWithExtraLife (extraLife) {
    return (Math.sqrt((extraLife.x - this.x) * (extraLife.x - this.x) + (extraLife.y - this.y) * (extraLife.y - this.y)) < (this.size + extraLife.size));
  }

  checkCollisionWithBounce () {
    if (this.y <= this.size) {
      this.bounce = 'top';
      return true;
    }
    if (this.y >= this.canvasElement.height - this.size) {
      this.bounce = 'bottom';
      return true;
    }
  }

  checkCollisionWithWallBottom (wallBottom) {
    const distX = Math.abs(this.x - wallBottom.x - wallBottom.sizeX / 2);
    const distY = Math.abs(this.y - wallBottom.y - wallBottom.sizeY / 2);

    if (distX > (wallBottom.sizeX / 2 + this.size)) { return false; }
    if (distY > (wallBottom.sizeY / 2 + this.size)) { return false; }

    if (distX <= (wallBottom.sizeX / 2)) { return true; }
    if (distY <= (wallBottom.sizeY / 2)) { return true; }

    const dx = distX - wallBottom.sizeX / 2;
    const dy = distY - wallBottom.sizeY / 2;
    return (dx * dx + dy * dy <= (this.size * this.size));
  }

  checkCollisionWithWallTop (wallTop) {
    const distX = Math.abs(this.x - wallTop.x - wallTop.sizeX / 2);
    const distY = Math.abs(this.y - wallTop.y - wallTop.sizeY / 2);

    if (distX > (wallTop.sizeX / 2 + this.size)) { return false; }
    if (distY > (wallTop.sizeY / 2 + this.size)) { return false; }

    if (distX <= (wallTop.sizeX / 2)) { return true; }
    if (distY <= (wallTop.sizeY / 2)) { return true; }

    const dx = distX - wallTop.sizeX / 2;
    const dy = distY - wallTop.sizeY / 2;
    return (dx * dx + dy * dy <= (this.size * this.size));
  }
}
