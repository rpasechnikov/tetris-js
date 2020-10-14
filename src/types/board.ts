import { getRandomColour } from '../utils';
import { CellState, Colour, Direction } from '../enums';
import { Initializable, Updatable, Vector2 } from '../interfaces';
import { Cell } from './cell';
import { Shape } from './shape';

export class Board implements Initializable, Updatable {
  private readonly _boardHeight = 20;
  private readonly _boardWidth = 10;
  private _gameBoard: Element;

  /** Cells stored in Y-X format starting with 19, 0 at top left and
   * ending with 0,9 at bottom right
   */
  private _cells: Cell[][];

  private _activeCells: Cell[];
  private _activeShape: Shape;

  init(): void {
    this._gameBoard = document.getElementsByClassName('game-board')[0];

    this.renderCells();
    this.update();

    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
  }

  update(): void {
    if (!!this._activeShape) {
      // this.updateActiveCells();
      this.updateActiveShape();
    } else {
      // this.spawnActivePixel();
      this.spawnActiveShape();
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    let requireReRender = false;

    if (e.key === 'a' || e.key == 'ArrowLeft') {
      this._activeShape.move(Direction.Left);
      requireReRender = true;
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
      this._activeShape.move(Direction.Right);
      requireReRender = true;
    } else if (e.key === 's' || e.key === 'ArrowDown') {
      this._activeShape.move(Direction.Down);
      requireReRender = true;
    }

    if (requireReRender) {
      this.renderShape(this._activeShape);
    }
  }

  private spawnActiveShape(): void {
    const spawnLocation: Vector2 = { y: 20, x: 3 };
    this._activeShape = new Shape(spawnLocation);
    this._activeShape.init();
    this.renderShape(this._activeShape);
  }

  private spawnActivePixel(): void {
    const spawnLocation = this.getRandomSpawnLocation();
    const cellToActivate = this._cells[spawnLocation.y][spawnLocation.x];
    cellToActivate.activate(getRandomColour(), null);

    this._activeCells = [];
    this._activeCells.push(cellToActivate);
  }

  private updateActiveShape(): void {
    // Update shape location and if updated, render it
    if (this.updateShapeLocation(this._activeShape)) {
      this.renderShape(this._activeShape);
    } else {
      // Otherwise the shape can not be moved down anymore, so destroy it
      for (const activeCell of this._activeCells) {
        activeCell.deActivate();
      }

      this._activeShape = null;
      this._activeCells = [];
    }

    // Check if this shape can be moved down
    // If so - move them down
    // Otherwise - de-activate relevant shapes and destroy the shape
  }

  /** Returns the cell location on the board, calculated from cell location within the shape.
   * Basically translates local to world coordinates
   */
  private shapeToBoardCellLocation(localCellLocation: Vector2, shapeLocation: Vector2): Vector2 {
    return {
      y: shapeLocation.y - localCellLocation.y,
      x: shapeLocation.x + localCellLocation.x
    };
  }

  private updateShapeLocation(shape: Shape): boolean {
    let canMoveDown: boolean = true;

    // Are there any cells right under this cell's bottom-most pixels
    for (const shapeCell of shape.cells) {
      const cellWorldLocation = this.shapeToBoardCellLocation(shapeCell.location, this._activeShape.location);

      // Already at the bottom of the board
      if (cellWorldLocation.y < 1) {
        canMoveDown = false;
        break;
      }

      const cellBelow = this._cells[cellWorldLocation.y - 1][cellWorldLocation.x];

      // Another non-empty cell below
      if (!cellBelow.shape && cellBelow.state !== CellState.Empty) {
        canMoveDown = false;
        break;
      }
    }

    if (!canMoveDown) {
      return false;
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
      const cellWorldLocation = this.shapeToBoardCellLocation(shapeCell.location, this._activeShape.location);
      const cell = this._cells[cellWorldLocation.y][cellWorldLocation.x];

      this._activeCells.push(cell);
      cell.activate(shape.colour, shape);
    }
  }

  private updateActiveCells(): void {
    const newActiveCells: Cell[] = [];

    for (const activeCell of this._activeCells) {
      if (activeCell.location.y == 0) {
        // If this cell is at the bottom of the board - de-activate it
        activeCell.deActivate();
      } else if (this._cells[activeCell.location.y - 1][activeCell.location.x].state === CellState.Empty) {
        // Otherwise if this cell has an empty cell below, move it down
        const newActiveCell = this._cells[activeCell.location.y - 1][activeCell.location.x];
        newActiveCell.activate(activeCell.colour, null);
        activeCell.clear();

        newActiveCells.push(newActiveCell);
      } else {
        // Lastly - simply deactivate this cell as it cannot be moved down, due to a cell below
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
        cellElement.innerHTML = `<div class="cell-inner"></div>`;

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
