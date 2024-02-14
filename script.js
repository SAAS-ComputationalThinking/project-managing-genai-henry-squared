document.addEventListener('DOMContentLoaded', function () {
  const bird = document.getElementById('bird');
  const pipe = document.getElementById('pipe');
  let score = 0;

  function jump() {
    let jumpCount = 0;
    let jumpInterval = setInterval(function () {
        if (jumpCount >= 15) {
            clearInterval(jumpInterval);
            return;
        }
        bird.style.transition = 'transform 0.3s';
        bird.style.transform = 'translateY(-' + (jumpCount * 4) + 'px)';
        jumpCount++;
    }, 10);

    setTimeout(function () {
        let downCount = 0;
        let downInterval = setInterval(function () {
            if (downCount >= jumpCount) {
                clearInterval(downInterval);
                return;
            }
            bird.style.transition = 'transform 0.3s';
            bird.style.transform = 'translateY(' + (downCount * 4) + 'px)';
            downCount++;
        }, 10);
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
    let pipeBottom = parseInt(window.getComputedStyle(pipe).getPropertyValue('top')) + pipeTop;
    let pipeLeft = parseInt(window.getComputedStyle(pipe).getPropertyValue('left'));
    let birdBottom = birdTop + 40; // Assuming the bird's height is 40px

    if (
        (birdLeft + 40 >= pipeLeft && birdLeft <= pipeLeft + 80) &&
        ((birdTop <= pipeTop || birdBottom >= pipeBottom) ||
        (birdTop + 40 >= pipeTop + 150 || birdBottom <= pipeBottom - 150))
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
          jump();
      }
  });

  document.addEventListener('keyup', function (event) {
      // Add keyup functionality here if needed
  });

  setInterval(function () {
      movePipe();
      checkCollision();
  }, 50);
});
