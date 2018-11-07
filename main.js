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
  var howToPlayScreen;

  var startButton;
  var howToButton;
  var restartButton;
  var backToMenuButton;
  //var buttons;

  var livesElement;
  var scoreElement;
  var levelElement;

  var finalLevel;
  var finalScore;

  var game;
  
  function buildSplash() {
    splashScreen = buildDOM(`
      <main>
        <section class="splash-header container">
          <h1 class="title">Brick it</h1>
        </section>
        <section class="splash-buttons container">
          <div class="play">
            <button class="play-btn button">PLAY</button>
          </div>
          <div class="other-options">
            <button class="instructions-btn button">How to Play</button>
            <button class="high-scores-btn button">High Scores</button>
          </div>
        </section>
      </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.play-btn');
    howToButton = document.querySelector('.instructions-btn');

    startButton.addEventListener('click', destroySplash);
    howToButton.addEventListener('click', destroySplash);

  }

  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    howToButton.removeEventListener('click', destroySplash);

    if (event.target.className === "play-btn button"){
      buildGameScreen(3);
    }else if (event.target.className === "instructions-btn button") {
      buildHowToPlayScreen();
    }
  }

  function buildGameScreen(lives) {
    gameScreen = buildDOM(`
      <main>
        <section class="info container">
          <div class="player-info">
            <p class="lives">Bullets: <span class="lives-value"></span></p>
            <p class="level">Level: <span class="level-value">1</span></p>
            <p class="score">Score: <span class="score-value">0</span></p>
          </div>
          <div class="shoot-info">
            <p>PRESS <span>"SPACE"</span> TO SHOOT</p>
            <p><span>"w"</span> AND <span>"s"</span> TO AIM</p>
          </div>
        </section>
        <section class="game container">
          <canvas width="800px" height="500px"></canvas>
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
        <section class="game-over-header container">
          <h1 class="title">Game Over</h1>
        </section>
        <section class="game-over-score container">
          <p class="level">Level: <span class="level-value">1</span></p>
          <p class="score">Final score: <span class="score-value">0</span></p>
        </section>
        <section class="game-over-buttons container">
          <div class="play">
            <button class="restart button">Try Again</button>
          </div>
          <div class="other-options">
            <button class="backToMenu button">Back to Menu</button>
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
    restartButton.removeEventListener('click', destroyGameOverScreen);
    backToMenuButton.removeEventListener('click', destroyGameOverScreen);



    if (event.target.className === "restart button"){
      buildGameScreen(3);
    }else{
      buildSplash();
    }
  }

  function buildHowToPlayScreen() {
    howToPlayScreen = buildDOM (`
      <main class="instructions-main">
        <section class="instructions instructions-header container">
          <h1 class="instructions-title">How to Play</h1>
        </section>
        <section class="instructions instructions-body container">
          <ul class="instructions-points">
            <li>Press <span>"SPACE"</span> to shoot the bullet</li>
            <li>Press <span>"w"</span> and <span>"s"</span> to aim the shot</li>
            <li>Breaking the brick gives you <span>10 points</span></li>
            <li>Every bounce made before breaking a brick gives you <span>3 points</span></li>
            <li>Avoid this enemies <img src="" alt=""></li>
            <li>Try to catch this extra bullets <img src="" alt=""></li>
            <li>Try to make the maximum points before running out of ammunition!</li>
          </ul>
        </section>
        <section class="howto-back">
          <button class="back-btn button">Back</button>
        </section>
      </main>`);

    document.body.prepend(howToPlayScreen);

    backToMenuButton = document.querySelector('.back-btn');

    backToMenuButton.addEventListener('click', destroyHowToPlayScreen);




  }

  function destroyHowToPlayScreen () {
    howToPlayScreen.remove();

    backToMenuButton.removeEventListener('click', destroyHowToPlayScreen);

    buildSplash();
  }

  buildSplash();

}

window.addEventListener('load', main);