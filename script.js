//Basic version of the "Chase the Button" game
// const gameArea = document.getElementById("gameArea");
// const scoreDisplay = document.getElementById("score");
// const restartBtn = document.getElementById("restart");

// let score = 0;
// let ballInterval;

// function createBall() {
//   const ball = document.createElement("div");
//   ball.classList.add("ball");

//   const maxX = gameArea.clientWidth - 40;
//   const maxY = gameArea.clientHeight - 40;

//   const randomX = Math.floor(Math.random() * maxX);
//   const randomY = Math.floor(Math.random() * maxY);

//   ball.style.left = randomX + "px";
//   ball.style.top = randomY + "px";

//   ball.addEventListener("click", () => {
//     score++;
//     scoreDisplay.textContent = `Score: ${score}`;
//     ball.remove();
//   });

//   gameArea.appendChild(ball);

//   // Remove ball after 2 seconds if not clicked
//   setTimeout(() => {
//     if (gameArea.contains(ball)) {
//       ball.remove();
//     }
//   }, 2000);
// }

// function startGame() {
//   score = 0;
//   scoreDisplay.textContent = `Score: ${score}`;
//   clearInterval(ballInterval);

//   ballInterval = setInterval(createBall, 1500);
// }

// restartBtn.addEventListener("click", startGame);

// // start automatically
// startGame();

// //Game over version of the same game
// const gameArea = document.getElementById("gameArea");
// const scoreDisplay = document.getElementById("score");
// const restartBtn = document.getElementById("restart");

// let score = 0;
// let missed = 0;
// let maxMissed = 1; // Game over if missed 5 balls
// let ballInterval;
// let gameOver = false;

// function createBall() {
//   if (gameOver) return;

//   const ball = document.createElement("div");
//   ball.classList.add("ball");

//   const maxX = gameArea.clientWidth - 40;
//   const maxY = gameArea.clientHeight - 40;

//   const randomX = Math.floor(Math.random() * maxX);
//   const randomY = Math.floor(Math.random() * maxY);

//   ball.style.left = randomX + "px";
//   ball.style.top = randomY + "px";

//   // Click to score
//   ball.addEventListener("click", () => {
//     if (!gameOver) {
//       score++;
//       scoreDisplay.textContent = `Score: ${score}`;
//       ball.remove();
//     }
//   });

//   gameArea.appendChild(ball);

//   // Remove ball after 2 seconds if not clicked
//   setTimeout(() => {
//     if (gameArea.contains(ball)) {
//       ball.remove();
//       if (!gameOver) {
//         missed++;
//         if (missed >= maxMissed) {
//           endGame();
//         }
//       }
//     }
//   }, 2000);
// }

// function startGame() {
//   score = 0;
//   missed = 0;
//   gameOver = false;
//   scoreDisplay.textContent = `Score: ${score}`;
//   restartBtn.style.display = "none";
//   clearInterval(ballInterval);
//   ballInterval = setInterval(createBall, 1500);
// }

// function endGame() {
//   gameOver = true;
//   clearInterval(ballInterval);
//   alert(`Game Over! Your score: ${score}`);
//   restartBtn.style.display = "inline-block";
// }

// // Restart button
// restartBtn.addEventListener("click", startGame);

// // Start automatically
// startGame();

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let missed = 0;
let maxMissed = 2; // Game over if missed 5 balls
let gameOver = false;

function createBall() {
  if (gameOver) return;

  const ball = document.createElement("div");
  ball.classList.add("ball");

  const maxX = gameArea.clientWidth - 40;
  const maxY = gameArea.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  ball.style.left = randomX + "px";
  ball.style.top = randomY + "px";

  // click → score
  ball.addEventListener("click", () => {
    if (!gameOver) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      ball.remove();
    }
  });

  gameArea.appendChild(ball);

  // missed ball → remove + count
  setTimeout(() => {
    if (gameArea.contains(ball)) {
      ball.remove();
      if (!gameOver) {
        missed++;
        if (missed >= maxMissed) {
          endGame();
        }
      }
    }
  }, 2000);
}

function spawnBall() {
  if (gameOver) return;

  createBall();

  // Base delay + random jitter
  let delay = 1500 - score * 50;
  if (delay < 500) delay = 500;
  delay += Math.floor(Math.random() * 500); // add randomness

  setTimeout(spawnBall, delay);
}

function startGame() {
  score = 0;
  missed = 0;
  gameOver = false;
  scoreDisplay.textContent = `Score: ${score}`;
  restartBtn.style.display = "none";
  spawnBall();
}

function endGame() {
  gameOver = true;
  alert(`Game Over! Your score: ${score}`);
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", startGame);

// start automatically
startGame();
