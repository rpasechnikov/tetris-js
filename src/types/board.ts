import { CellState } from '../enums';
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
    const spawnLocation = this.getRandomSpawnLocation();
    const cellToActivate = this._cells[spawnLocation.y][spawnLocation.x];
    cellToActivate.activate();

    this._activeCells = [];
    this._activeCells.push(cellToActivate);
  }

  update(): void {
    if (!!this._activeCells && !!this._activeCells.length) {
      this.updateActiveCells();
    } else {
      this.spawnActivePixel();
    }
  }

  private updateActiveCells(): void {
    const newActiveCells: Cell[] = [];

    for (const activeCell of this._activeCells) {
      if (activeCell.location.y == 0) {
        // If this cell is at the bottom of the board - de-activate it
        activeCell.clear();
        activeCell.deActivate();
      } else if (this._cells[activeCell.location.y - 1][activeCell.location.x].state === CellState.Empty) {
        // Otherwise if this cell has an empty cell below, move it down
        activeCell.clear();

        const newActiveCell = this._cells[activeCell.location.y - 1][activeCell.location.x];
        newActiveCell.activate();

        newActiveCells.push(newActiveCell);
      } else {
        // Lastly - simply deactivate this cell as it cannot be moved down, due to a cell below
        activeCell.clear();
        activeCell.deActivate();
      }
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
        cellElement.innerHTML = `<div class="x">${x}</div><div class="y">${y}</div>`;

        this._gameBoard.appendChild(cellElement);

        var cell = new Cell(cellElement, { x, y });
        cell.init();

        this._cells[y][x] = cell;
      }
    }
  }

  private getRandomSpawnLocation(): Vector2 {
    const x = Math.floor(Math.random() * 10);

    return { x, y: this._boardHeight - 1 };
  }
}
