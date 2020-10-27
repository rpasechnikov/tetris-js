import { areAllCellsNonEmpty, canShapeMoveInDirection, canShapeRotate, shapeToBoardCellLocation } from '../utils';
import { CellState, Direction } from '../enums';
import { Initializable, Updatable, Vector2 } from '../interfaces';
import { Cell } from './cell';
import { Shape } from './shape';
import { BOUNDS, CSS_CLASSES } from '../constants';
import { BoardCell } from './board-cell';

export class Board implements Initializable, Updatable {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private readonly _cellElementId = 'cell';
  private _gameBoard: Element;

  /** Cells stored in Y-X format starting with 19, 0 at top left and
   * ending with 0,9 at bottom right
   */
  private _cells: BoardCell[][];

  private _activeCells: Cell[];
  private _activeShape: Shape;

  private _isGameRunning = false;

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];
    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));

    this.setupBoard();
  }

  playPause(play: boolean): void {
    this._isGameRunning = play;
  }

  reset(): void {
    const wasGameRunning = this._isGameRunning;

    if (wasGameRunning) {
      this.playPause(false);
    }

    this.setupBoard();

    if (wasGameRunning) {
      this.playPause(true);
    }
  }

  update(): void {
    if (!this._isGameRunning) {
      return;
    }

    if (!!this._activeShape) {
      this.updateActiveShape();
    } else {
      this.resolveFilledLines();
      this.spawnActiveShape();
    }
  }

  private setupBoard(): void {
    this._cells = [];
    this._activeCells = [];
    this._activeShape = null;

    const cellElements = document.getElementsByClassName(CSS_CLASSES.CELL);

    for (const cellElement of Array.from(cellElements)) {
      this._gameBoard.removeChild(cellElement);
    }

    this.renderCells();
    this.update();
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'a' || e.key == 'ArrowLeft') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Left);
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Right);
    } else if (e.key === 's' || e.key === 'ArrowDown') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Down);
    } else if (e.key === 'w' || e.key === 'ArrowUp') {
      this.rotateShapeIfPossible(this._activeShape);
    }
  }

  /** Checks if any of the lines are completely filled with cells and if so, removes them and updates the board */
  private resolveFilledLines(): void {
    // True if the previous pass has resolved at least a single line. This means that
    // cells were shifted down, so let's start again from y=0
    let lineResolved = false;

    for (let y = 0; y < BOUNDS.BoardHeight; y++) {
      if (lineResolved) {
        y--;
      }

      const lineCells = this._cells[y];

      if (areAllCellsNonEmpty(lineCells)) {
        lineResolved = true;

        for (let y2 = y; y2 < BOUNDS.BoardHeight - 1; y2++) {
          // Update each cell in the moved-down row
          for (let x = 0; x < BOUNDS.BoardWidth; x++) {
            const oldCellElement = this._cells[y2][x].element;

            // Clone the above cell into the current cell
            this._cells[y2][x] = this._cells[y2 + 1][x].clone();

            const cell = this._cells[y2][x];

            cell.updateLocation({ x: cell.location.x, y: cell.location.y - 1 });
            cell.updateElement(oldCellElement, cell.colour);
          }
        }
      } else {
        lineResolved = false;
      }
    }
  }

  private moveShapeInDirectionIfPossible(shape: Shape, direction: Direction): void {
    if (!shape || !canShapeMoveInDirection(this._cells, shape, direction)) {
      return;
    }

    shape.move(direction);
    this.renderShape(shape);
  }

  private rotateShapeIfPossible(shape: Shape): void {
    if (!shape || !canShapeRotate(this._cells, shape)) {
      return;
    }

    shape.rotate();
    this.renderShape(shape);
  }

  private spawnActiveShape(): void {
    const spawnLocation: Vector2 = { y: 20, x: 3 };
    this._activeShape = new Shape(spawnLocation);
    this.renderShape(this._activeShape);

    console.log(`Spawned ${this._activeShape.type} with colour ${this._activeShape.colour}`);
  }

  /** Update shape location and if updated, render it */
  private updateActiveShape(): void {
    if (this.updateShapeLocation(this._activeShape)) {
      this.renderShape(this._activeShape);
    } else {
      // Otherwise the shape can not be moved down anymore, so destroy it and de-activate the cells
      for (const activeCell of this._activeCells) {
        activeCell.deActivate();
      }

      this._activeShape = null;
      this._activeCells = [];
    }
  }

  private updateShapeLocation(shape: Shape): boolean {
    if (!canShapeMoveInDirection(this._cells, shape, Direction.Down)) {
      return;
    }

    shape.move(Direction.Down);
    return true;
  }

  private renderShape(shape: Shape): void {
    // Clear active cells
    if (!!this._activeCells) {
      for (const activeCell of this._activeCells) {
        activeCell.clear();
      }
    }

    this._activeCells = [];

    // Render shape and update active cells
    for (const shapeCell of this._activeShape.cells) {
      const cellWorldLocation = shapeToBoardCellLocation(shapeCell.location, this._activeShape.location);
      const cell = this._cells[cellWorldLocation.y][cellWorldLocation.x];

      this._activeCells.push(cell);
      cell.activate(shape.colour, shape);
    }
  }

  private renderCells(): void {
    for (var y = this._boardHeight - 1; y > -1; y--) {
      this._cells[y] = [];

      for (var x = 0; x < this._boardWidth; x++) {
        var cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerHTML = `<div class="${CSS_CLASSES.CELL_INNER}"></div>`;

        this._gameBoard.appendChild(cellElement);

        var cell = new BoardCell(cellElement, { x, y });

        this._cells[y][x] = cell;
      }
    }
  }
}
