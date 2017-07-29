document.addEventListener('DOMContentLoaded', () => {
  const els = {
    gameContainer: document.querySelector('#game-container'),
    message: document.querySelector('#message'),
    newGame: document.querySelector('#new-game'),
    score: document.querySelector('#score'),
  };

  const game = new TicTacToe(els);
  game.init();
});

class TicTacToe {
  constructor(els) {
    this.state = {
      els,
      players: this.createPlayers(2),
      symbols: ['cross', 'circle'],
      turns: 8,
      winConditions: [
        '1/2/3',
        '4/5/6',
        '7/8/9',
        '1/4/7',
        '2/5/8',
        '3/6/9',
        '1/5/9',
        '3/5/7',
      ],
    };

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  createPlayers(amount) {
    let players = {};
    for (var i = 0; i < amount; i++) {
      players[`player${i+1}`] = {
        name: `player${i+1}`,
        score: 0,
        picks: [],
      };
    }

    return players;
  }

  init() {
    this.state.els.gameContainer.addEventListener('click', this.handleCellClick);
  }

  start() {

  }

  end() {

  }

  reset() {
    // this.state.players = createPlayers(2);
    // this.state.symbols.reverse();
  }

  update(cellClicked) {
    let symbolClass;
    const startGameStateChecking = 4;
    const cellSymbol = document.createElement('div');
    if (this.state.turns % 2 === 0) {
      this.state.players['player1'].picks.push(cellClicked);
      symbolClass = this.state.symbols[0];
    } else {
      this.state.players['player2'].picks.push(cellClicked);
      symbolClass = this.state.symbols[1];
    }

    cellSymbol.setAttribute('class', symbolClass);
    document.querySelectorAll('.game-cell')[cell - 1].appendChild(cellSymbol);

    if (this.state.turns <= startGameStateChecking) {
      let winner = this.computeWinner();
      if (winner) this.handleGameOver(winner);
      console.log('is checking game state and is game over is: ' + !!winner);
    }

    this.state.turns -= 1;
  }

  getWinner() {
    let cellRow;
    for (let key in this.state.players) {
      let player = this.state.players[key];

      for (var i = 0; i < this.state.winConditions.length; i++) {
        cellRow = this.state.winConditions[i].split('/').map(cell => {
          return player.picks.filter(cellPick => cell === cellPick).toString();
        });

        if (cellRow.join('').length === 3) return player;
      }
    }
  }

  handleGameOver(winner) {
    console.log(`${winner.name} won!!!`);
  }

  handleCellClick(evt) {
    evt.stopPropagation();
      this.update(evt.target.attributes[1].value);
  }
}


/*
# Tic Tac Toe Pseudocode
## This is a description of the flow of the game.

The game starts with scores at 0, and displays 'good luck'

The game picks either a 'x' or 'o' for each player and decides
which gets the first turn.

When a cell is clicked, the game will know which player clicked
by assigned each player to either a odd or even number.

The cell that is clicked will then update with the correct 'x' or 'o'

The game will then compute whether there is a winner when a player
has clicked 3 threes and more.


*/
