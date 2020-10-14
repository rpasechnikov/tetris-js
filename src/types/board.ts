import { canShapeMoveInDirection, getRandomColour, shapeToBoardCellLocation } from '../utils';
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
    if (e.key === 'a' || e.key == 'ArrowLeft') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Left);
    } else if (e.key === 'd' || e.key === 'ArrowRight') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Right);
    } else if (e.key === 's' || e.key === 'ArrowDown') {
      this.moveShapeInDirectionIfPossible(this._activeShape, Direction.Down);
    }
  }

  private moveShapeInDirectionIfPossible(shape: Shape, direction: Direction): void {
    if (!shape) {
      return;
    }

    // Check if movement is possible
    if (!canShapeMoveInDirection(this._cells, shape, direction)) {
      return;
    }

    // Move shape and re-render
    shape.move(direction);
    this.renderShape(shape);
  }

  private spawnActiveShape(): void {
    const spawnLocation: Vector2 = { y: 20, x: 3 };
    this._activeShape = new Shape(spawnLocation);
    this._activeShape.init();
    this.renderShape(this._activeShape);
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
}
