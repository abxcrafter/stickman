const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let obstacleInterval;
let score = 0;

// Make the player jump
document.addEventListener("keydown", function (e) {
  if (e.key === " " && !isJumping) {
    jump();
  }
});

function jump() {
  let position = 0;
  isJumping = true;

  // Move player up
  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Move player down
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + "px";
      }, 20);
    } else {
      position += 5;
      player.style.bottom = position + "px";
    }
  }, 20);
}

// Spawn Obstacles (Stickmen with Guns)
function spawnObstacle() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameContainer.appendChild(obstacle);

  let obstaclePosition = gameContainer.offsetWidth;
  obstacle.style.left = obstaclePosition + "px";

  const obstacleTimer = setInterval(() => {
    if (obstaclePosition < 0) {
      clearInterval(obstacleTimer);
      gameContainer.removeChild(obstacle);
      score++;
      scoreDisplay.textContent = "Score: " + score;
    } else if (obstaclePosition > 50 && obstaclePosition < 100 && player.offsetTop > 200) {
      alert("Game Over! Your Score: " + score);
      clearInterval(obstacleTimer);
      clearInterval(obstacleInterval);
      location.reload();
    }

    obstaclePosition -= 10;
    obstacle.style.left = obstaclePosition + "px";
  }, 20);
}

// Start Game
function startGame() {
  obstacleInterval = setInterval(spawnObstacle, 2000);
}

startGame();
