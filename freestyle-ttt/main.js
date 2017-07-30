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


// class TicTacToe {
//   constructor(els) {
//     this.state = {
//       els,
//       players: this.createPlayers(2),
//       symbols: ['cross', 'circle'],
//       turns: 8,
//       bestOfGames: 3,
//       winConditions: [
//         '1/2/3',
//         '4/5/6',
//         '7/8/9',
//         '1/4/7',
//         '2/5/8',
//         '3/6/9',
//         '1/5/9',
//         '3/5/7',
//       ],
//     };

//     this.handleCellClick = this.handleCellClick.bind(this);
//     this.reset = this.reset.bind(this);
//   }

//   createPlayers(amount) {
//     let players = {};
//     for (var i = 0; i < amount; i++) {
//       players[`player${i+1}`] = {
//         name: `player${i+1}`,
//         score: 0,
//         picks: [],
//       };
//     }

//     return players;
//   }

//   init() {
//     this.state.els.gameContainer.addEventListener('click', this.handleCellClick);
//     this.state.els.newGame.addEventListener('click', () => { this.end(); this.reset(); });
//   }

//   end() {
//     for (let player in this.state.players) {
//       this.state.players[player].score = 0;
//       this.state.players[player].picks = [];
//     }
//   }

//   reset() {
//     let symbols = document.querySelectorAll('.cross, .circle');
//     for (var i = 0; i < symbols.length; i++) {
//       symbols[i].remove();
//     }

//     // this.state.symbols.reverse();
//     this.state.turns = 8;
//   }

//   updateGame(cellClicked) {
//     // determines player based on if the turn is even.
//     let whosTurnIsIt = this.state.turns % 2 === 0;
//     let player = whosTurnIsIt ? 'player1' : 'player2';
//     let symbol = whosTurnIsIt ? this.state.symbols[0] : this.state.symbols[1];

//     this.state.players[player].picks.push(cellClicked);
//     this.updateDOM(cellClicked, symbol);
//     /*
//     * Start checking game status when the turns left is 4.
//     * that is when 3 matches can occur and it reaches 4 and after.
//     */

//     //code can go into new function
//     if (this.state.turns <= 4) {
//       let winner = this.getWinner();
//       if (winner) this.handleGameOver(winner);
//       console.log('is checking game state and is game over is: ' + !!winner);
//     }

//     if (this.state.turns === 0) {
//       console.log('Game is a draw');
//       console.log('reseting board...');
//       setTimeout(this.reset, 1000);
//     }

//     // update the turns left
//     this.state.turns -= 1;
//   }

//   updateDOM(cell, symbol) {
//     const cellSymbol = document.createElement('div');
//     cellSymbol.setAttribute('class', symbol);
//     document.querySelectorAll('.game-cell')[cell - 1].appendChild(cellSymbol);
//   }

//   getWinner() {
//     let cellRow;
//     for (let key in this.state.players) {
//       let player = this.state.players[key];

//       for (var i = 0; i < this.state.winConditions.length; i++) {
//         cellRow = this.state.winConditions[i].split('/').map(cell => {
//           return player.picks.filter(cellPick => cell === cellPick).toString();
//         });

//         if (cellRow.join('').length === 3) return player;
//       }
//     }
//   }

//   handleGameOver(winner) {
//     let nameOfWinner = winner.name;
//     this.state.players[nameOfWinner].score += 1;

//     if (this.state.players[nameOfWinner].score >= 3) {
//       console.log(`${nameOfWinner} won the series!!!`);
//       this.end();
//       console.log('reseting board...');
//       setTimeout(this.reset, 1000);
//     }

//     console.log(`${winner.name} won!!!`);
//     console.log('reseting board...');
//     this.end();
//     setTimeout(this.reset, 1000);
//   }

//   handleCellClick(evt) {
//     evt.stopPropagation();
//     if (!evt.target.attributes['clicked']) {
//       this.updateGame(evt.target.attributes[1].value);
//     }
//   }
// }


// /*
// # Tic Tac Toe Pseudocode
// ## This is a description of the flow of the game.

// The game starts with scores at 0, and displays 'good luck'

// The game picks either a 'x' or 'o' for each player and decides
// which gets the first turn.

// When a cell is clicked, the game will know which player clicked
// by assigned each player to either a odd or even number.

// The cell that is clicked will then update with the correct 'x' or 'o'

// The game will then compute whether there is a winner when a player
// has clicked 3 threes and more.


// */
