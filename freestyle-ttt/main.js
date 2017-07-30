document.addEventListener('DOMContentLoaded', () => {
  const els = {
    gameContainer: document.querySelector('#game-container'),
    message: document.querySelector('#message'),
    newGame: document.querySelector('#new-game'),
    score: document.querySelector('#score'),
  };

  const player1 = new Player('p1');
  const player2 = new Player('p2');
  const board = new Board(els);

  const game = new TicTacToe(board, player1, player2);
  game.start();

  document.body.addEventListener('keyup', (evt) => {
    if(evt.keyCode === 13) {
      game.reset();
    }
  });
});

// /*
// # Tic Tac Toe Pseudocode
// ## This is a description of the flow of the game.

// The game starts with scores at 0, and displays 'tic tac toe'

// The game gets either a 'x' or 'o' for each player and decides
// which gets the first turn.

// When a cell is clicked, the game will know which player clicked
// by assigned each player to either a odd or even number.

// The cell that is clicked will then update with the correct 'x' or 'o'

// The game will then compute whether there is a winner when a player
// has clicked 3 threes and more
// */
