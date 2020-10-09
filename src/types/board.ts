import { Initializable } from 'src/interfaces/initializable';
import { Updatable } from 'src/interfaces/updatable';
import { Pixel } from './pixel';

export class Board implements Initializable, Updatable {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private _gameBoard: Element;

  private _activePixel: Pixel;

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];

    this.renderCells();
  }

  update(): void {
    if (!this._activePixel) {
      this.createNewActivePixel();
    }
  }

  private createNewActivePixel(): void {
    const pixel = new Pixel();
  }

  private renderCells(): void {
    for (var i = 0; i < this._boardHeight * this._boardWidth; i++) {
      var cell = document.createElement('div');
      cell.className = 'cell';

      this._gameBoard.appendChild(cell);
    }
  }
}
