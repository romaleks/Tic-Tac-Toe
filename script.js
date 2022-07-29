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
   const addSymbol = () => {
      boardCells.forEach(cell => cell.addEventListener(('click'), () => {
         const cellIndex = cell.getAttribute('data-index');
         if (gameBoard.board[cellIndex] === '') {
            gameBoard.board[cellIndex] = symbol;
            gameBoard.displayContent();
         }
      }))
   }

   return {
      addSymbol,
   }
}

const firstPlayer = Player('X', gameBoard);
firstPlayer.addSymbol()