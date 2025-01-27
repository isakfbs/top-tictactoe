import { GameBoard } from "./gameBoard.js";

export function GameController() {
  const gameboard = GameBoard();
  let currentPlayer = "X";
  let winner = null;

  const getCurrentPlayer = () => currentPlayer;

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

  return {
    checkWinner,
    isDraw,
    playRound,
    getCurrentPlayer,
    resetGame,
    getBoard: gameboard.getBoard,
  };
}
