const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const index = e.target.dataset.index;

  if (board[index] === "" && isGameActive) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
};

const checkWinner = () => {
  let roundWon = false;

  for (let condition of winningCombinations) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    alert(`Player ${currentPlayer} wins!`);
    isGameActive = false;
  } else if (!board.includes("")) {
    alert("It's a draw!");
    isGameActive = false;
  }
};

const restartGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

document.getElementById("theme-change").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});
