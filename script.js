function Gameboard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    return board
      .map((row) => row.map((cell) => (cell === null ? "_" : cell)).join(" | "))
      .join("\n----------\n");
  };

  const markCell = (row, col, token) => {
    if (board[row][col] === null) {
      board[row][col] = token;
      return true;
    }
    console.log("Invalid Action, Try Again!");
    return false;
  };

  return { getBoard, printBoard, markCell };
}

function GameController() {
  const gameboard = Gameboard();
  let currentPlayer = "X";
  let winner = null;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const checkWinner = () => {
    const board = gameboard.getBoard();
    //Define all winning conditions
    const winConditions = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      //columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    // biome-ignore lint/style/useConst: <explanation>
    for (let condition of winConditions) {
      if (
        condition[0] !== null &&
        condition[0] === condition[1] &&
        condition[1] === condition[2]
      ) {
        return condition[0];
      }
    }
    return null;
  };

  const isDraw = () => {
    const board = gameboard.getBoard();
    return board.every((row) => row.every((cell) => cell !== null));
  };

  const playRound = (row, col) => {
    if (winner || isDraw()) {
      console.log("Game over. Please reset the board to play again.");
      return;
    }

    if (gameboard.markCell(row, col, currentPlayer)) {
      winner = checkWinner();

      if (winner) {
        console.log(gameboard.printBoard());
        console.log(`Player ${winner} wins!`);
      } else if (isDraw()) {
        console.log(gameboard.printBoard());
        console.log("It's a draw!");
      } else {
        switchPlayer();
      }
    }
  };

  const resetGame = () => {
    winner = null;
    currentPlayer = "X";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameboard.getBoard()[i][j] = null;
      }
      console.log("Game has been reset!");
    }
  };

  return { playRound, resetGame, printBoard: gameboard.printBoard };
}

const ScreenController = (() => {
  const board = document.getElementById("board");
  const statusElement = document.getElementById("status");

  const renderBoard = (gameboard) => {
    board.innerHTML = "";
    gameboard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.row = rowIndex;
        cellElement.dataset.col = colIndex;
        cellElement.textContent = cell !== null ? cell : "";
        if (cell !== null) {
          cellElement.classList.add("taken");
        }
        board.appendChild(cellElement);
      });
    });
  };
  return { renderBoard };
})();

const mockBoard = [
  ["X", null, "O"],
  [null, "X", null],
  ["O", null, null],
];

ScreenController.renderBoard(mockBoard);
console.log(document.getElementById("board").innerHTML);
