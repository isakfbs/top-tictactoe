export function GameBoard() {
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
