document.addEventListener('DOMContentLoaded', function () {
  const bird = document.getElementById('bird');
  const pipe = document.getElementById('pipe');
  let score = 0;

  function jump() {
      bird.style.transition = 'transform 0.3s';
      bird.style.transform = 'translateY(-60px)';
      setTimeout(function () {
          bird.style.transform = 'translateY(0)';
      }, 300);
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
      let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
      let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue('left'));
      let pipeTop = parseInt(window.getComputedStyle(pipe).getPropertyValue('height'));
      let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'));
      if (birdLeft + 40 >= pipeLeft && birdLeft <= pipeLeft + 80) {
          if (birdTop <= pipeTop || birdTop + 40 >= pipeTop + 150) {
              endGame();
          }
      }
  }

  function endGame() {
      alert('Game Over! Your score: ' + score);
      location.reload();
  }

  document.addEventListener('keydown', function (event) {
      if (event.key === ' ' || event.keyCode === 38) {
          jump();
      }
  });

  setInterval(function () {
      movePipe();
      checkCollision();
  }, 50);
});
