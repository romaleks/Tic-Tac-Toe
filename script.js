const boardCells = document.querySelectorAll('.grid__item');

const gameBoard = (() => {
   const board = ['', '', '', '', '', '', '', '', ''];

   const displayContent = () => {
      let cellIndex = 0;
      boardCells.forEach(cell => cell.textContent = board[cellIndex++]);
   }

   return {
      board,
      displayContent
   }
})();

const Player = (symbol, gameBoard) => {
   const addSymbol = (cell) => {
      const cellIndex = cell.getAttribute('data-index');
      if (gameBoard.board[cellIndex] === '') {
         gameBoard.board[cellIndex] = symbol;
         gameBoard.displayContent();
      }
   }

   return {
      addSymbol,
   }
}

const game = (() => {
   WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ]
   
   const playGame = () => {
      let step = 0

      boardCells.forEach(cell => {
         cell.addEventListener('click', () => {
            if (step % 2 === 0) firstPlayer.addSymbol(cell);
            else secondPlayer.addSymbol(cell);
            step++;
         });
      });
   }

   return {
      playGame,
   }
})();

const firstPlayer = Player('X', gameBoard);
const secondPlayer = Player('O', gameBoard);

game.playGame()