
class Player {
  constructor(name) {
      this.name = name;
      this.score = 0;
      this.picks = [];
      this.winningCells = [];
  }

  // isWinner game logic
  // return player if the player has gotten 3 strikes
  isWinner(winConditions) {
    let cellRow;
    for (var i = 0; i < winConditions.length; i++) {
      cellRow = winConditions[i].split('/').map(cell => {
        return this.picks.filter(cellPick => cell === cellPick).toString();
      });
      // if the cellRow has 3 matches in one of the winning conditions,
      // thats means that the player has gotten 3 strikes
      if (cellRow.join('').length === 3) {
          this.winningCells = cellRow;
        return this;
      }
    }
  }

}
