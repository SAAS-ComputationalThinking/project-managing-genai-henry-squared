document.addEventListener("DOMContentLoaded", function() {
    const car = document.getElementById("car");
  
    // Movement controls
    document.addEventListener("keydown", function(event) {
      const speed = 5;
      switch(event.key) {
        case "ArrowLeft":
          car.style.left = Math.max(0, parseInt(car.style.left || 0) - speed) + "px";
          break;
        case "ArrowRight":
          car.style.left = Math.min(window.innerWidth - parseInt(car.style.width), parseInt(car.style.left || 0) + speed) + "px";
          break;
      }
    });
  });
  