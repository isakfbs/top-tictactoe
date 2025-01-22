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
    } else {
      console.log("Invalid Action, Try Again!");
    }
  };

  return { getBoard, printBoard, markCell };
}

function GameController() {
  let currentPlayer = "X";
  let winner = null;
  const board = Gameboard.getBoard();

  const switchPlayer() => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const checkWinner = (board) => {
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
    for(let condition of winConditions){
      if(
        condition[0] !== null && 
        condition[0] === condition[1] && 
        condition[1] === condition[2]
      ){
        return condition[0]}
    }
  }
  return null;
}
