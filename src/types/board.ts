import { Initializable } from 'src/interfaces/initializable';
import { Updatable } from 'src/interfaces/updatable';
import { Cell } from './cell';

export class Board implements Initializable, Updatable {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private _gameBoard: Element;
  private _cells: Cell[][];

  private _activePixel: Cell;

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];

    this.renderCells();
  }

  update(): void {
    // if (!this._activePixel) {
    //   this.createNewActivePixel();
    // }
  }

  private createNewActivePixel(): void {
    // const pixel = new Cell();
  }

  private renderCells(): void {
    this._cells = [];

    for (var y = this._boardHeight - 1; y > -1; y--) {
      this._cells[y] = [];

      for (var x = 0; x < this._boardWidth; x++) {
        var cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerHTML = `<span class="x">${x}</span><span class="y">${y}</span>`;

        this._gameBoard.appendChild(cellElement);

        var cell = new Cell(cellElement, { x, y });
        cell.init();

        this._cells[y][x] = cell;
      }
    }

    // for (var i = 0; i < this._boardHeight * this._boardWidth; i++) {
    //   var cellElement = document.createElement('div');
    //   cellElement.className = 'cell';

    //   this._gameBoard.appendChild(cellElement);
    // }
  }
}
