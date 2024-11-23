// Text data
const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile and powerful programming language.",
  "Practice typing every day to improve your speed and accuracy.",
  "Frontend development involves HTML, CSS, and JavaScript.",
  "Typing fast can save you time and increase productivity."
];

// DOM Elements
const textToType = document.getElementById("text-to-type");
const userInput = document.getElementById("user-input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");
const leaderboardBtn = document.getElementById("leaderboard-btn");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const closeLeaderboard = document.getElementById("close-leaderboard");

// State Variables
let timeLeft = 60;
let timer = null; // Ensures the timer variable is properly scoped
let correctChars = 0;
let totalChars = 0;
let isTyping = false;

// Initialize Game
function startGame() {
  const randomText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textToType.textContent = randomText;
  userInput.value = "";
  timeLeft = 60;
  correctChars = 0;
  totalChars = 0;
  isTyping = false;

  // Reset UI
  timerElement.textContent = timeLeft;
  wpmElement.textContent = "0";
  accuracyElement.textContent = "0";

  // Clear any previous interval and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

// Update Timer
function updateTimer() {
  if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
  } else {
      clearInterval(timer); // Stop the timer when it reaches 0
      endGame();
  }
}

// End Game
function endGame() {
  const wpm = Math.round((correctChars / 5) * (60 / (60 - timeLeft + 1)));
  const accuracy = Math.round((correctChars / totalChars) * 100) || 0;

  // Display Results
  wpmElement.textContent = wpm || 0;
  accuracyElement.textContent = accuracy || 0;

  // Save to Leaderboard
  saveToLeaderboard(wpm, accuracy);

  // Notify User
  alert(`Time's up! WPM: ${wpm}, Accuracy: ${accuracy}%`);
}

// Update Stats
function updateStats() {
  const wpm = Math.round((correctChars / 5) * (60 / (60 - timeLeft + 1)));
  const accuracy = Math.round((correctChars / totalChars) * 100) || 0;

  wpmElement.textContent = wpm || 0;
  accuracyElement.textContent = accuracy || 0;
}

// Save to Leaderboard
function saveToLeaderboard(wpm, accuracy) {
  const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.push({ wpm, accuracy });
  scores.sort((a, b) => b.wpm - a.wpm);
  localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
}

// Load Leaderboard
function loadLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardList.innerHTML = scores
      .map(
          (score, index) =>
              `<li>${index + 1}. WPM: ${score.wpm}, Accuracy: ${score.accuracy}%</li>`
      )
      .join("");
}

// Event Listeners
userInput.addEventListener("input", () => {
  const text = textToType.textContent;
  const input = userInput.value;

  totalChars = input.length;

  if (input === text.substring(0, input.length)) {
      correctChars = input.length;
      userInput.classList.remove("error");
  } else {
      userInput.classList.add("error");
  }

  if (input === text) {
      clearInterval(timer); // Stop the timer if typing is completed
      endGame();
  }

  updateStats();
});

restartBtn.addEventListener("click", startGame);
leaderboardBtn.addEventListener("click", () => {
  loadLeaderboard();
  leaderboard.style.display = "block";
});
closeLeaderboard.addEventListener("click", () => {
  leaderboard.style.display = "none";
});

// Start Game on Load
startGame();
