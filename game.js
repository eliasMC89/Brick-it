'use strict';

class Game {
  constructor (canvasElement, lives) {
    this.bullet = null;
    this.brick = null;
    this.enemy = null;
    this.enemy2 = null;
    this.extraLife = null;
    this.canvasElement = canvasElement;
    this.gameIsOver = false;
    this.lives = lives;
    this.score = 0;
    this.tempScore = 0;
    this.level = 1;
    this.arrow = null;
    this.wallBottom = null;
    this.wallTop = null;
    // audio
    this.wallSound = document.createElement('audio');
    this.gunShotSound = document.createElement('audio');
    this.gunReloadSound = document.createElement('audio');
    this.missSound = document.createElement('audio');
    this.enemySound = document.createElement('audio');
    this.bulletBounce = document.createElement('audio');
    this.brickSound = document.createElement('audio');
    this.extraLifeSound = document.createElement('audio');
    this.arrowSound = document.createElement('audio');
    this.wallSound.src = './sounds/metal-sound.mp3';
    this.gunShotSound.src = './sounds/smb_fireworks.wav';
    this.gunReloadSound.src = './sounds/gunReload2.mp3';
    this.missSound.src = './sounds/miss1MOD.mp3';
    this.enemySound.src = './sounds/enemy1.mp3';
    this.bulletBounce.src = './sounds/smb_bump.wav';
    this.brickSound.src = './sounds/smb_breakblock.wav';
    this.extraLifeSound.src = './sounds/smb_coin.wav';
    this.arrowSound.src = './sounds/arrowSound.mp3';
  }

  play () {
    this.ctx = this.canvasElement.getContext('2d');
    this.startLoop();
  }

  startLoop () {
    this.bullet = new Bullet(this.canvasElement);
    this.gunReloadSound.play();
    this.brick = new Brick(this.canvasElement);
    this.enemy = new Enemy(this.canvasElement);
    this.enemy2 = new Enemy2(this.canvasElement);
    this.extraLife = new ExtraLife(this.canvasElement);
    this.arrow = new Arrow(this.canvasElement);
    this.wallBottom = new WallBottom(this.canvasElement);
    this.wallTop = new WallTop(this.canvasElement);

    this.shootBullet = (event) => {
      if (event.key === ' ') {
        this.gunShotSound.play();
        this.bullet.startMovement(1);
      }
    };

    this.changeArrowDirection = (event) => {
      if (event.key === 's') {
        this.arrowSound.play();
        this.arrow.moveArrow(1);
        this.bullet.setSpeedAngle(1);
      } else if (event.key === 'w') {
        this.arrowSound.play();
        this.arrow.moveArrow(-1);
        this.bullet.setSpeedAngle(-1);
      }
    };

    document.addEventListener('keydown', this.shootBullet);
    document.addEventListener('keyup', this.changeArrowDirection);

    const loop = () => {
      this.checkAllCollisions();
      this.updateAll();
      this.clearAll();
      this.drawAll();

      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }
    };

    loop();
  }

  updateAll () {
    this.bullet.update();
    this.brick.update();
    if (this.level > 1) {
      this.enemy.update();
    }
    if (this.level > 6) {
      this.enemy2.update();
    }
    if (this.level > 2 && this.isOdd(this.level) && this.extraLife && !(this.lives > 3)) {
      this.extraLife.update();
    }
    if (this.level > 3 && this.level !== 5) {
      if (this.level === 4) {
        this.wallBottom.setHeightAndPosition(90);
      } else {
        this.wallBottom.setHeightAndPosition(10);
      }
    }
    if (this.level > 4) {
      if (this.level === 5) {
        this.wallTop.setHeightAndPosition(90);
      } else {
        this.wallTop.setHeightAndPosition(10);
      }
    }
  }

  clearAll () {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  drawAll () {
    this.bullet.draw();
    this.brick.draw();
    this.arrow.draw();
    if (this.level > 1) {
      this.enemy.draw();
    }
    if (this.level > 6) {
      this.enemy2.draw();
    }
    if (this.level > 2 && this.isOdd(this.level) && this.extraLife && !(this.lives > 3)) {
      this.extraLife.draw();
    }
    if (this.level > 3 && this.level !== 5) {
      this.wallBottom.draw();
    }
    if (this.level > 4) {
      this.wallTop.draw();
    }
  }

  checkAllCollisions () {
    if (this.bullet.checkCollisionWithBounce()) {
      this.bulletBounce.currentTime = 0;
      this.bulletBounce.play();
      this.bullet.speed.y *= -1;
      this.tempScore += 3;
    }
    if (this.bullet.checkCollisionWithMiss()) {
      if (this.lives > 1) {
        this.missSound.play();
        this.lives--;
        this.tempScore = 0;
        this.updateLife();
        this.bullet = new Bullet(this.canvasElement);
        this.gunReloadSound.play();
        this.arrow = new Arrow(this.canvasElement);
        this.extraLife = new ExtraLife(this.canvasElement);
        this.enemy = new Enemy(this.canvasElement);
        this.enemy2 = new Enemy2(this.canvasElement);
      } else {
        this.missSound.play();
        document.removeEventListener('keydown', this.shootBullet);
        document.removeEventListener('keyup', this.changeArrowDirection);
        this.gameIsOver = true;
        this.endGame();
      }
    } else if (this.bullet.checkCollisionWithBrick(this.brick)) {
      this.brickSound.play();
      this.score += 10 + this.tempScore;
      this.level++;
      this.tempScore = 0;
      this.updateScore();
      this.addLevel();
      this.brick.setSpeed(1);
      this.brick.setLength(-10);
      this.bullet = new Bullet(this.canvasElement);
      this.gunReloadSound.play();
      this.arrow = new Arrow(this.canvasElement);
      this.extraLife = new ExtraLife(this.canvasElement);
      this.enemy = new Enemy(this.canvasElement);
      this.enemy2 = new Enemy2(this.canvasElement);
    }
    if (this.level > 1) {
      if (this.bullet.checkCollisionWithEnemy(this.enemy)) {
        if (this.lives > 1) {
          this.enemySound.play();
          this.lives--;
          this.tempScore = 0;
          this.updateLife();
          this.bullet = new Bullet(this.canvasElement);
          this.gunReloadSound.play();
          this.arrow = new Arrow(this.canvasElement);
          this.extraLife = new ExtraLife(this.canvasElement);
          this.enemy = new Enemy(this.canvasElement);
          this.enemy2 = new Enemy2(this.canvasElement);
        } else {
          this.enemySound.play();
          document.removeEventListener('keydown', this.shootBullet);
          document.removeEventListener('keyup', this.changeArrowDirection);
          this.gameIsOver = true;
          this.endGame();
        }
      }
    }
    if (this.level > 6) {
      if (this.bullet.checkCollisionWithEnemy2(this.enemy2)) {
        if (this.lives > 1) {
          this.enemySound.play();
          this.lives--;
          this.tempScore = 0;
          this.updateLife();
          this.bullet = new Bullet(this.canvasElement);
          this.gunReloadSound.play();
          this.arrow = new Arrow(this.canvasElement);
          this.extraLife = new ExtraLife(this.canvasElement);
          this.enemy = new Enemy(this.canvasElement);
          this.enemy2 = new Enemy2(this.canvasElement);
        } else {
          this.enemySound.play();
          document.removeEventListener('keydown', this.shootBullet);
          document.removeEventListener('keyup', this.changeArrowDirection);
          this.gameIsOver = true;
          this.endGame();
        }
      }
    }
    if (this.level > 2 && this.isOdd(this.level) && this.extraLife && !(this.lives > 3)) {
      if (this.bullet.checkCollisionWithExtraLife(this.extraLife)) {
        this.extraLifeSound.play();
        this.lives++;
        this.extraLife = null;
        this.updateLife();
      }
    }
    if (this.level > 3 && this.level !== 5) {
      if (this.bullet.checkCollisionWithWallBottom(this.wallBottom)) {
        if (this.lives > 1) {
          this.wallSound.play();
          this.lives--;
          this.tempScore = 0;
          this.updateLife();
          this.bullet = new Bullet(this.canvasElement);
          this.gunReloadSound.play();
          this.arrow = new Arrow(this.canvasElement);
          this.extraLife = new ExtraLife(this.canvasElement);
          this.enemy = new Enemy(this.canvasElement);
          this.enemy2 = new Enemy2(this.canvasElement);
        } else {
          this.wallSound.play();
          document.removeEventListener('keydown', this.shootBullet);
          document.removeEventListener('keyup', this.changeArrowDirection);
          this.gameIsOver = true;
          this.endGame();
        }
      }
    }
    if (this.level > 4) {
      if (this.bullet.checkCollisionWithWallTop(this.wallTop)) {
        if (this.lives > 1) {
          this.wallSound.play();
          this.lives--;
          this.tempScore = 0;
          this.updateLife();
          this.bullet = new Bullet(this.canvasElement);
          this.gunReloadSound.play();
          this.arrow = new Arrow(this.canvasElement);
          this.extraLife = new ExtraLife(this.canvasElement);
          this.enemy = new Enemy(this.canvasElement);
          this.enemy2 = new Enemy2(this.canvasElement);
        } else {
          this.wallSound.play();
          document.removeEventListener('keydown', this.shootBullet);
          document.removeEventListener('keyup', this.changeArrowDirection);
          this.gameIsOver = true;
          this.endGame();
        }
      }
    }
  }

  restartTempScore () {
    this.tempScore = 0;
  }

  gameOverCallback (callback) {
    this.gameOverCallback = callback;
  }

  livesUpdateCallback (callback) {
    this.lifeLostCallback = callback;
  }

  scoreUpdateCallback (callback) {
    this.scoreUpdateCallback = callback;
  }

  levelUpdateCallback (callback) {
    this.levelUpdateCallback = callback;
  }

  endGame () {
    this.gameOverCallback();
  }

  updateLife () {
    this.lifeLostCallback();
  }

  updateScore () {
    this.scoreUpdateCallback();
  }

  addLevel () {
    this.levelUpdateCallback();
  }

  isOdd (num) {
    return num % 2 === 1;
  }
}
