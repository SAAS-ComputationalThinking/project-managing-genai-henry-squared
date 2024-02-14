document.addEventListener('DOMContentLoaded', function () {
  const bird = document.getElementById('bird');
  const pipe = document.getElementById('pipe');
  const gameContainer = document.getElementById('game-container');
  let score = 0;
  let jumpHeight = 0;
  let isJumping = false;

  function jump() {
      isJumping = true;
      let jumpCount = 0;
      let jumpInterval = setInterval(function () {
          if (jumpCount >= jumpHeight) {
              clearInterval(jumpInterval);
              isJumping = false;
              return;
          }
          bird.style.transition = 'transform 0.3s';
          bird.style.transform = 'translateY(-' + (jumpCount * 4) + 'px)';
          jumpCount++;
      }, 10);
  }

  function applyGravity() {
      if (!isJumping) {
          let birdRect = bird.getBoundingClientRect();
          let gameRect = gameContainer.getBoundingClientRect();
          if (birdRect.bottom < gameRect.bottom) {
              bird.style.transition = 'transform 0.3s';
              bird.style.transform = 'translateY(' + (4) + 'px)';
          }
      }
  }

  function movePipe() {
      let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'));
      if (pipeLeft <= -80) {
          pipe.style.left = '400px';
          score++;
      } else {
          pipe.style.left = (pipeLeft - 5) + 'px';
      }
  }

  function checkCollision() {
      let birdRect = bird.getBoundingClientRect();
      let pipeRect = pipe.getBoundingClientRect();

      if (
          birdRect.right > pipeRect.left &&
          birdRect.left < pipeRect.right &&
          birdRect.bottom > pipeRect.top &&
          birdRect.top < pipeRect.bottom
      ) {
          endGame();
      }
  }

  function endGame() {
      alert('Game Over! Your score: ' + score);
      location.reload();
  }

  document.addEventListener('keydown', function (event) {
      if (event.key === ' ' || event.keyCode === 38) {
          if (!isJumping) {
              jumpHeight += 15; // Increase jump height
              jump();
          }
      }
  });

  document.addEventListener('keyup', function (event) {
      if (event.key === ' ' || event.keyCode === 38) {
          jumpHeight = 0; // Reset jump height
      }
  });

  setInterval(function () {
      movePipe();
      checkCollision();
      applyGravity(); // Apply gravity continuously
  }, 50);
});
