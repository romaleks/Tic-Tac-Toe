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

const firstPlayer = Player('X', gameBoard);
const secondPlayer = Player('O', gameBoard);
let step = 0

boardCells.forEach(cell => {
   cell.addEventListener('click', () => {
      if (step % 2 === 0) firstPlayer.addSymbol(cell);
      else secondPlayer.addSymbol(cell);
      step++;
   })
})