import { GameController } from "./gameController.js";
import { ScreenController } from "./screenController.js";

export const AppController = (() => {
  const gameController = GameController();

  const initialize = () => {
    ScreenController.renderBoard(gameController.getBoard());
    ScreenController.updateStatus(
      `Player ${gameController.getCurrentPlayer()}'s turn`
    );

    ScreenController.bindResetButton(() => {
      gameController.resetGame();
      ScreenController.renderBoard(gameController.getBoard());
      ScreenController.updateStatus(
        `Player ${gameController.getCurrentPlayer()}'s turn`
      );
    });

    ScreenController.bindCellClick((row, col) => {
      gameController.playRound(row, col);
      ScreenController.renderBoard(gameController.getBoard());

      const winner = gameController.checkWinner();
      if (winner) {
        ScreenController.updateStatus(`Player ${winner} wins!`);
      } else if (gameController.isDraw()) {
        ScreenController.updateStatus(`It's a draw!`);
      } else {
        const currentPlayer = gameController.getCurrentPlayer();
        ScreenController.updateStatus(
          `Player ${gameController.getCurrentPlayer()}'s turn`
        );
      }
    });
  };

  return { initialize };
})();
