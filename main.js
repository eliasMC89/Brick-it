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
  var levelElement;

  var finalLevel;
  var finalScore;

  var game;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <section class="header container">
          <h1 class="title">Brick it</h1>
        </section>
        <section class="buttons container">
          <div class="play">
            <button class="play-btn button">Play</button>
          </div>
          <div class="other-options">
            <button class="instructions-btn button">How to Play</button>
            <button class="high-scores-btn button">High Scores</button>
          </div>
        </section>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.play');

    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);

    buildGameScreen(3);
  }

  function buildGameScreen(lives) {
    gameScreen = buildDOM(`
      <main>
        <section class="info container">
          <p class="lives">Bullets: <span class="lives-value"></span></p>
          <p class="level">Level: <span class="level-value">1</span></p>
          <p class="score">Score: <span class="score-value">0</span></p>
        </section>
        <section class="game container">
          <canvas width="900px" height="500px"></canvas>
        </section>  
      </main>
    `);

    document.body.prepend(gameScreen);
    
    var canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('span.lives-value');
    scoreElement = document.querySelector('span.score-value');
    levelElement = document.querySelector('span.level-value');


    
    livesElement.innerText = lives;
    
    game = new Game (canvasElement, lives);
    game.play();

    game.gameOverCallback(destroyGameScreen);
    game.livesUpdateCallback(updateLives);
    game.scoreUpdateCallback(updateScore);
    game.levelUpdateCallback(updateLevel);

  }

  function updateLives() {
    livesElement.innerText = game.lives;
  }

  function updateScore() {
    scoreElement.innerText = game.score;
  }

  function updateLevel() {
    levelElement.innerText = game.level;
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main>
        <section id="game-over" class="header container">
          <h1 class="title">Game Over</h1>
        </section>
        <section class="game-over-score">
          <p class="level">Level: <span class="level-value">1</span></p>
          <p class="score">Final score: <span class="score-value">0</span></p>
        </section>
        <section class="buttons container">
          <div class="play">
            <button class="restart button">Try Again</button>
          </div>
          <div class="other-options">
            <button class="backToMenu button">Back to Main Menu</button>
            <button class="button">High Scores</button>
          </div>
        </section>
      </main>  
    `);
    

    document.body.prepend(gameOverScreen);

    scoreElement = document.querySelector('span.score-value');
    levelElement = document.querySelector('span.level-value');

    game.scoreUpdateCallback(updateScore);
    game.levelUpdateCallback(updateLevel);

    restartButton = document.querySelector('.restart');
    backToMenuButton = document.querySelector('.backToMenu');

    restartButton.addEventListener('click', destroyGameOverScreen);
    backToMenuButton.addEventListener('click', destroyGameOverScreen);

  }

  function destroyGameOverScreen(event) {
    gameOverScreen.remove();

    if (event.target.className === "restart button"){
      buildGameScreen(3);
    }else{
      buildSplash();
    }
  }

  buildSplash();

}

window.addEventListener('load', main);