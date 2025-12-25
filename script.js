const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const timerDisplay = document.getElementById("timer");
const playButton = document.getElementById("playBtn");
const resetButton = document.getElementById("resetBtn");
const difficultySelect = document.getElementById("difficulty");

let score = 0;
let timeLeft = 40;
let moleTimer;
let countdownTimer;

let highScore = localStorage.getItem("whackJanHighScore2025") || 0;
highScoreDisplay.textContent = `High Score: ${highScore}`;

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    grid.appendChild(hole);
  }
}

function startGame() {
  score = 0;
  timeLeft = 40;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  playButton.disabled = true;

  clearInterval(moleTimer);
  clearInterval(countdownTimer);

  const speed = Number(difficultySelect.value); // 1050 / 850 / 550
  moleTimer = setInterval(randomMole, speed);

  countdownTimer = setInterval(countDown, 1000);
  randomMole();
}

function resetGame() {
  clearInterval(moleTimer);
  clearInterval(countdownTimer);
  score = 0;
  timeLeft = 40;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  const holes = document.querySelectorAll(".hole");
  holes.forEach((h) => (h.innerHTML = ""));
  playButton.disabled = false;
}

function randomMole() {
  const holes = document.querySelectorAll(".hole");
  holes.forEach((h) => (h.innerHTML = ""));
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const mole = document.createElement("div");
  mole.classList.add("mole");
  randomHole.appendChild(mole);
}

function whack(e) {
  if (e.target.classList.contains("mole")) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    e.target.style.transform = "scale(0.7)";
    setTimeout(() => e.target.remove(), 0);
  }
}

function countDown() {
  timeLeft--;

  if (timeLeft < 0) timeLeft = 0;

  timerDisplay.textContent = `Time: ${timeLeft}`;

  if (timeLeft === 0) {
    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    playButton.disabled = false;

    setTimeout(() => {
      alert(`Times up! You've Whacked: ${score} Jans. Do better!`);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("whackJanHighScore2025", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
      }
    }, 50);
  }
}

grid.addEventListener("click", whack);
playButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

createGrid();