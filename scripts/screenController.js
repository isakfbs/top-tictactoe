export const ScreenController = (() => {
  const board = document.getElementById("board");
  const statusElement = document.getElementById("status");
  const resetButton = document.getElementById("reset");

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

  const updateStatus = (message) => {
    statusElement.textContent = message;
  };

  const bindCellClick = (callback) => {
    board.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);
        callback(row, col);
      }
    });
  };

  const bindResetButton = (callback) => {
    resetButton.addEventListener("click", callback);
  };

  return { renderBoard, updateStatus, bindCellClick, bindResetButton };
})();
