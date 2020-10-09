export class GameBoard {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private _gameBoard: Element;

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];

    this.render();
  }

  private render(): void {
    for (var i = 0; i < this._boardHeight * this._boardWidth; i++) {
      var cell = document.createElement('div');
      cell.className = 'cell';

      this._gameBoard.appendChild(cell);
    }
  }
}
