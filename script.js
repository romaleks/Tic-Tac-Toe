const boardCells = document.querySelectorAll('.grid__item');
const form = document.querySelector('form');

const gameBoard = (() => {
   const board = ['', '', '', '', '', '', '', '', ''];

   const displayContent = () => {
      let cellIndex = 0;
      boardCells.forEach(cell => cell.textContent = gameBoard.board[cellIndex++]);
   }

   return {
      board,
      displayContent
   }
})();

const Player = (symbol, gameBoard) => {
   const addSymbol = (cellIndex) => {
      gameBoard.board[cellIndex] = symbol;
      gameBoard.displayContent();
   }

   return {
      symbol,
      score: 0,
      addSymbol
   }
}

const game = (() => {
   const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
   ]
   const boardGrid = document.querySelector('.board__grid');
   const restartBtn = document.querySelector('.board__restart-btn');
   const newRoundBtn = document.querySelector('.round-btn');
   let step = 0

   const restartGame = () => {
      gameBoard.board = ['', '', '', '', '', '', '', '', ''];
      gameBoard.displayContent();
      boardGrid.classList.remove('active')
      step = 0;
      document.querySelectorAll('.player__score').forEach(score => {
         score.textContent = '0';
      })
   }

   const beginNewGame = () => {
      gameBoard.board = ['', '', '', '', '', '', '', '', ''];
      gameBoard.displayContent();
      boardGrid.classList.remove('active')
   }

   const checkWinning = (symbol) => {
      return WINNING_COMBINATIONS.some(combination => {
         return combination.every(index => {
            return boardCells[index].textContent === symbol;
         })
      })
   }

   const endGame = (winner) => {
      const winnerScore = document.querySelector('#' + winner.symbol).textContent = ++winner.score;
      setTimeout(() => {
         boardGrid.classList.add('active')
      }, 1500)
   }

   const playGame = () => {
      boardCells.forEach(cell => {
         cell.addEventListener('click', () => {
            const cellIndex = cell.getAttribute('data-index');
            if (gameBoard.board[cellIndex] === '') {
               if (step % 2 === 0) {
                  firstPlayer.addSymbol(cellIndex);
                  if (checkWinning(firstPlayer.symbol)) endGame(firstPlayer);
               } else {
                  secondPlayer.addSymbol(cellIndex);
                  if (checkWinning(secondPlayer.symbol)) endGame(secondPlayer);
               }
               step++;
            }
         });
      });
   }

   return {
      restartBtn,
      newRoundBtn,
      playGame,
      restartGame,
      beginNewGame
   }
})();

const firstPlayer = Player('X', gameBoard);
const secondPlayer = Player('O', gameBoard);

form.addEventListener('submit', (e) => {
   const popup = document.querySelector('.popup');
   const main = document.querySelector('main');
   const firstPlayerInput = document.querySelector('#first_name');
   const secondPlayerInput = document.querySelector('#second_name');
   const firstPlayerName = document.querySelector('#first_player');
   const secondPlayerName = document.querySelector('#second_player');

   popup.classList.add('inactive');
   main.classList.add('active');
   firstPlayerName.textContent = firstPlayerInput.value;
   secondPlayerName.textContent = secondPlayerInput.value;
   e.preventDefault();
   game.playGame();
   game.restartBtn.onclick = game.restartGame;
   game.newRoundBtn.onclick = game.beginNewGame;
})