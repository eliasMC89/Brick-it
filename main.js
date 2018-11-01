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

  var livesElement;
  var scoreElement;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>Goal!</h1>
        <button>Play</button>
        <button>How to Play</button>
        <button>High Scores</button>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');

    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);

    buildGameScreen();
  }

  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main>
        <p class="lives-label">Lives: <span class="lives">3</span></p>
        <p class="score-label">Score: <span class="score">0</span></p> 
        <canvas width="640px" height="480px"></canvas>  
      </main>
    `);

    document.body.prepend(gameScreen);

    var canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('.lives');
    scoreElement = document.querySelector('.score');

  }

  function updateLives(lives) {
    livesElement.innerText = lives;
  }

  function updateScore(score) {
    scoreElement.innerText = score;
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <h1>Game Over</h1>
        <button>Try Again</button>
        <button>Back to Main Menu</button>
        <button>High Scores</button>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyGameOverScreen)

  }

  function destroyGameOverScreen() {
    gameOverScreen.remove();

    restartButton.removeEventListener('click', destroyGameOverScreen);

    buildGameScreen();
  }

  buildSplash();

}

window.addEventListener('load', main);