import { Initializable, Updatable, Vector2 } from '../interfaces';
import { Cell } from './cell';

export class Board implements Initializable, Updatable {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private _gameBoard: Element;

  /** Cells stored in Y-X format */
  private _cells: Cell[][];

  private _activeCells: Cell[];

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];

    this.renderCells();
    this.spawnActivePixel();
  }

  spawnActivePixel() {
    const cellToActivate = this._cells[this._boardHeight - 1][4];
    cellToActivate.activate();

    this._activeCells = [];
    this._activeCells.push(cellToActivate);
  }

  update(): void {
    if (!!this._activeCells && !!this._activeCells.length) {
      this.updateActiveCells();
    }
  }

  private updateActiveCells(): void {
    const newActiveCells: Cell[] = [];

    for (const activeCell of this._activeCells) {
      const activeCellLocation: Vector2 = { x: activeCell.location.x, y: activeCell.location.y };
      activeCell.clear();

      newActiveCells.push(this._cells[activeCellLocation.y][activeCellLocation.x]);
    }

    this._activeCells = newActiveCells;
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
  }
}
