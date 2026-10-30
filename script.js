
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent =
                "Player " + currentPlayer + " Wins! 🎉";

            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a Draw! 🤝";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        statusText.textContent =
            "Player " + currentPlayer + "'s Turn";
    });
});

// Check winner
function checkWinner() {

    for (let pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            return true;
        }
    }

    return false;
}

// Restart game
restartBtn.addEventListener("click", () => {

    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    statusText.textContent = "Player X's Turn";
});
