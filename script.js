document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const platforms = document.querySelectorAll('.platform');

  let isJumping = false;
  let gravity = 0.9;
  let jumpCount = 0;

  function jump() {
      let jumpInterval = setInterval(function () {
          let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
          if (playerBottom >= 200) {
              clearInterval(jumpInterval);
              let fallInterval = setInterval(function () {
                  player.style.bottom = (parseInt(player.style.bottom) - gravity) + 'px';
                  if (parseInt(player.style.bottom) <= 0) {
                      clearInterval(fallInterval);
                      player.style.bottom = '0px';
                      isJumping = false;
                  }
              }, 10);
          } else {
              player.style.bottom = (playerBottom + 15) + 'px';
              jumpCount++;
              if (jumpCount >= 15) {
                  clearInterval(jumpInterval);
                  jumpCount = 0;
              }
          }
      }, 30);
  }

  document.addEventListener('keydown', function (event) {
      if (event.key === ' ' && !isJumping) {
          isJumping = true;
          jump();
      }
  });
});
