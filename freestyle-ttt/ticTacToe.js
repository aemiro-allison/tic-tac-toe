class TicTacToe {
  constructor(board, ...players) {
    this.state = {
      board,
      players,
      turns: 9,
      symbols: ['cross', 'circle'],
      bestOfGames: 3,
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

    this.updateGame = this.updateGame.bind(this);
    this.reset = this.reset.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  start() {
    this.state.board.init(this.updateGame, this.reset);
  }

  newGame() {
    this.state.board.display(`creating new game...`);
    this.state.players.forEach(player => {
      player.picks = [];
      player.score = 0;
    });
    this.state.board.updateScore({
      name: 'p1',
      score: 0,
    }, {
      name: 'p2',
      score: 0,
    });
    this.reset();
  }

  reset() {
    this.state.board.els.gameContainer.addEventListener(
      'click',
      this.state.board.handleCellClick
    );
    this.state.board.display(`reseting game board...`);
    this.state.turns = 9;
    setTimeout(this.state.board.reset, 1000);
    this.state.players.forEach(player => player.picks = []);
  }

  updateGame(cellClicked) {
    // determines player based on if the turn is even.
    let whosTurnIsIt = this.state.turns % 2 === 0;
    let player = whosTurnIsIt ? this.state.players[0] : this.state.players[1];
    let symbol = whosTurnIsIt ? this.state.symbols[0] : this.state.symbols[1];

    // put the cell clicked into the players cell picks to determine if they have won.
    player.picks.push(cellClicked);

    this.state.board.updateBoard(cellClicked, symbol);
    this.checkForWinner();
  }

  /*
  * Start checking game status when the turns left is 4.
  * that is when 3 matches can occur and it reaches 4 and after.
  */
  checkForWinner() {
    if (this.state.turns <= 5) {
      let playerThatWon = this.state.players.filter(player => {
        return player.isWinner(this.state.winConditions);
      })[0];

      this.handleGameOver(playerThatWon);
    }

    this.state.turns -= 1;
  }

  handleGameOver(winner) {
    if (winner) {
      this.state.board.els.gameContainer.removeEventListener('click', this.state.board.handleCellClick);
      this.state.board.display(`${winner.name} wins!!!`);
      this.state.players.forEach(player => {
        if (player.name === winner.name) player.score += 1;
      });
      this.state.board.updateScore(this.state.players[0], this.state.players[1]);
      this.state.board.drawLine(winner.winningCells);

      if (winner.score === this.state.bestOfGames) {
        this.state.board.display(`${winner.name} has won the series!!!! YAY!!!!`);
        return setTimeout(this.newGame, 2500);
      }
      setTimeout(this.reset, 1000);
    }

    // if there is no winner and the board is full. it is a draw.
    if (this.state.turns === 1 && !winner) {
      this.state.board.display(`Its a draw`);
      this.reset();
    }
  }
}
