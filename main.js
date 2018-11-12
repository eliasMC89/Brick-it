'use strict';

const buildDOM = html => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
};

function main () {
  let splashScreen = null;
  let gameScreen = null;
  let gameOverScreen = null;
  let howToPlayScreen = null;

  let startButton = null;
  let howToButton = null;
  let restartButton = null;
  let backToMenuButton = null;

  let livesElement = null;
  let scoreElement = null;
  let levelElement = null;

  let game = null;

  // audio
  const buttonSound = document.createElement('audio');
  buttonSound.src = './sounds/buttonClick.mp3';

  const gameOverSound = document.createElement('audio');
  const gameSound = document.createElement('audio');
  gameOverSound.src = './sounds/smb_gameover.wav';
  gameSound.src = './sounds/backMusic-puzzleQuest.mp3';

  const gameOverSoundPlay = () => {
    gameOverSound.play();
  };

  const gameSoundPlay = () => {
    gameSound.volume = 0.3;
    gameSound.play();
  };

  const gameOverSoundStop = () => {
    gameOverSound.pause();
    gameOverSound.currentTime = 0.0;
  };

  const gameSoundStop = () => {
    gameSound.pause();
    gameSound.currentTime = 0.0;
  };

  const buttonClick = () => {
    buttonSound.play();
  };

  const buildSplash = () => {
    splashScreen = buildDOM(`
      <main class="splash-main">
        <section class="splash-header container">
          <h1 class="title">Brick it</h1>
        </section>
        <section class="splash-buttons container">
          <div class="play">
            <button class="play-btn button">PLAY</button>
          </div>
          <div class="other-options">
            <button class="instructions-btn button">How to Play</button>
          </div>
        </section>
      </main>
    `);

    document.body.prepend(splashScreen);

    startButton = document.querySelector('.play-btn');
    howToButton = document.querySelector('.instructions-btn');

    startButton.addEventListener('click', destroySplash);
    howToButton.addEventListener('click', destroySplash);
  };

  const destroySplash = () => {
    buttonClick();
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    howToButton.removeEventListener('click', destroySplash);

    if (window.event.target.className === 'play-btn button') {
      buildGameScreen(3);
    } else if (window.event.target.className === 'instructions-btn button') {
      buildHowToPlayScreen();
    }
  };

  const buildGameScreen = lives => {
    gameScreen = buildDOM(`
      <main class="game-main">
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

    gameSoundPlay();

    var canvasElement = document.querySelector('canvas');
    livesElement = document.querySelector('span.lives-value');
    scoreElement = document.querySelector('span.score-value');
    levelElement = document.querySelector('span.level-value');

    livesElement.innerText = lives;

    game = new Game(canvasElement, lives);
    game.play();

    game.gameOverCallback(destroyGameScreen);
    game.livesUpdateCallback(updateLives);
    game.scoreUpdateCallback(updateScore);
    game.levelUpdateCallback(updateLevel);
  };

  const updateLives = () => {
    livesElement.innerText = game.lives;
  };

  const updateScore = () => {
    scoreElement.innerText = game.score;
  };

  const updateLevel = () => {
    levelElement.innerText = game.level;
  };

  const destroyGameScreen = () => {
    gameSoundStop();
    gameScreen.remove();
    buildGameOverScreen();
  };

  const buildGameOverScreen = () => {
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

    gameOverSoundPlay();
  };

  const destroyGameOverScreen = even => {
    gameOverSoundStop();
    buttonClick();
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen);
    backToMenuButton.removeEventListener('click', destroyGameOverScreen);

    if (window.event.target.className === 'restart button') {
      buildGameScreen(3);
    } else if (window.event.target.className === 'backToMenu button') {
      buildSplash();
    }
  };

  const buildHowToPlayScreen = () => {
    howToPlayScreen = buildDOM(`
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
            <li>Avoid this enemies <img src="./images/modern-15-skull.svg.png" alt="enemy"> and metallic walls<img src="" alt=""></li>
            <li>Try to catch this extra bullets <img src="./images/modern-15-star.svg.png" alt="star"></li>
            <li>Try to make the maximum points before running out of ammunition!</li>
          </ul>
        </section>
        <section class="howto-back">
          <button class="back-btn button">Back to Menu</button>
        </section>
      </main>`);

    document.body.prepend(howToPlayScreen);

    backToMenuButton = document.querySelector('.back-btn');

    backToMenuButton.addEventListener('click', destroyHowToPlayScreen);
  };

  const destroyHowToPlayScreen = () => {
    buttonClick();
    howToPlayScreen.remove();

    backToMenuButton.removeEventListener('click', destroyHowToPlayScreen);

    buildSplash();
  };

  // High scores

  // function buildHighScoresScreen () {
  //   highScoresScreen = buildDOM (`
  //     <main class="instructions-main">
  //       <section class="instructions instructions-header container">
  //         <h1 class="instructions-title">High Scores</h1>
  //       </section>
  //       <section class="instructions instructions-body container">
  //         <ol class="instructions-points">
  //         </ol>
  //       </section>
  //       <section class="howto-back">
  //         <button class="back-btn button">Back to Menu</button>
  //       </section>
  //     </main>`);

  //     // read high scores from ls
  //     // append list with highScores to highScoresScreen

  //     document.body.prepend(highScoresScreen);

  //     backToMenuButton = document.querySelector('.back-btn');

  //     backToMenuButton.addEventListener('click', destroyHighScoresScreen);
  // }

  // function destroyHighScoresScreen (){
  //   buttonClick();
  //   highScoresScreen.remove();
  //   backToMenuButton.removeEventListener('click', destroyHighScoresScreen);
  //   buildSplash();

  // }

  buildSplash();
}

window.addEventListener('load', main);
