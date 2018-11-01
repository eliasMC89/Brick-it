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
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <h1>Goal!</h1>
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

    buildGameScreen();
  }

  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main>
        <p class="lives-label">Lives: <span class="lives">3</span></p>
        <p class="score-label">Score: <span class="score">0</span></p>
        <button class="toGameOver">GameOver</button>
        <canvas width="800px" height="400px"></canvas>  
      </main>
    `);

    document.body.prepend(gameScreen);

    var canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('.lives');
    scoreElement = document.querySelector('.score');


    /// test
    var buttonGameOver = document.querySelector('.toGameOver');

    buttonGameOver.addEventListener ('click', destroyGameScreen);

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
      buildGameScreen();
    }else{
      buildSplash();
    }
  }

  buildSplash();

}

window.addEventListener('load', main);