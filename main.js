'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashScreen;
  var gameScreen;
  var gameOverScreen;

  var startButton;
  var restartButton;
  var backToMenuButton;

  var livesElement;
  var scoreElement;

  var game;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>Brick it</h1>
        <button class="play">Play</button>
        <button class="instructions">How to Play</button>
        <button class="high-scores">High Scores</button>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.play');

    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);

    buildGameScreen(3, 0);
  }

  function buildGameScreen(lives) {
    gameScreen = buildDOM(`
      <main>
        <p class="lives">Lives: <span class="value"></span></p>
        <p class="score-label">Score: <span class="score">0</span></p>
        <canvas width="800px" height="400px"></canvas>  
      </main>
    `);

    document.body.prepend(gameScreen);
    
    var canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('span.value');
    scoreElement = document.querySelector('span.score');

    
    livesElement.innerText = lives;
    
    
    
    game = new Game (canvasElement, lives);
    game.play();

    game.gameOverCallback(destroyGameScreen);
    game.lifeLostCallback(updateLives);
    game.scoreUpdateCallback(updateScore);

  }

  function updateLives() {
    livesElement.innerText = game.lives;
  }

  function updateScore() {
    scoreElement.innerText = game.score;
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <h1>Game Over</h1>
        <button class="restart">Try Again</button>
        <button class="backToMenu">Back to Main Menu</button>
        <button>High Scores</button>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('.restart');
    backToMenuButton = document.querySelector('.backToMenu');

    restartButton.addEventListener('click', destroyGameOverScreen);
    backToMenuButton.addEventListener('click', destroyGameOverScreen);

  }

  function destroyGameOverScreen(event) {
    gameOverScreen.remove();

    if (event.target.className === "restart"){
      buildGameScreen(3, 0);
    }else{
      buildSplash();
    }
  }

  buildSplash();

}

window.addEventListener('load', main);