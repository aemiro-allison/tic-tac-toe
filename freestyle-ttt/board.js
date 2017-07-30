class Board {
  constructor(els) {
    this.els = els;

    this.game = {};
    this.handleCellClick = this.handleCellClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  init(updateGameFn, reset) {
    this.game['update'] = updateGameFn;
    this.updateScore({
      name: 'p1',
      score: 0,
    }, {
      name: 'p2',
      score: 0,
    });
    this.create();

    this.els.gameContainer.addEventListener('click', this.handleCellClick);
    this.els.newGame.addEventListener('click', reset);
  }

  reset() {
    this.clear();
    this.create();
    this.display('<img src="http://www.dsmsales.net/images/logos/tttmarqlrg.gif" alt="tic-tac-toe" height="50" width="150">');
  }

  clear() {
    this.els.gameContainer.innerHTML = '';
  }

  create() {
    let numOfCells = 9;
    for (var i = 1; i <= numOfCells; i++) {
      let gameCell = document.createElement('div');
      gameCell.setAttribute('class', 'game-cell');
      gameCell.setAttribute('data-clicked', false);
      gameCell.setAttribute('value', i);
      this.els.gameContainer.appendChild(gameCell);
    }
  }

  updateBoard(cell, symbol) {
    let gameCell = document.querySelectorAll('.game-cell')[cell - 1];
    let cellSymbol = document.createElement('div');
    cellSymbol.setAttribute('class', symbol);

    gameCell.setAttribute('data-clicked', 'true');
    gameCell.appendChild(cellSymbol);
    this.animate(
      gameCell.children[0],
      'fade-in',
    );
  }

  updateScore(player1, player2) {
    this.els.score.innerHTML = `
      <div>
        <span class="player-name">${player1.name}</span>
        <span class="player-score">${player1.score}</span>
      </div>
      <div>
        <span class="player-name">${player2.name}</span>
        <span class="player-score">${player2.score}</span>
      </div>
    `;
  }

  display(msg) {
    this.els.message.innerHTML = msg;
  }

  handleCellClick(evt) {
    evt.stopPropagation();
    if (evt.target.getAttribute('data-clicked') === 'false') {
      this.game.update(evt.target.getAttribute('value'));
    }
  }

  animate(el, animationName) {
    let animationHandler = evt => {
      el.classList.toggle(animationName);
      el.removeEventListener('animationend', animationHandler);
    };

    el.classList.toggle(animationName);
    el.addEventListener('animationend', animationHandler);
  }

  drawLine(winningCells) {
    let gameCells = document.querySelectorAll('.game-cell');
    winningCells.forEach(cell => {
      gameCells[cell - 1].classList.add('green');
    });
  }
}
