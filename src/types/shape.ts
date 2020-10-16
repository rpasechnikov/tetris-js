import { Initializable, Vector2 } from '../interfaces';
import { Colour, Direction, ShapeRotation, ShapeType } from '../enums';
import { Cell } from './cell';
import { getRandomColour, getShapeForShapeRotation } from '../utils';

/** Represents a collection of cells in a specific shape.
 * All cells are in local coordinates, starting with 0,0 at top left and ending
 * with 3,3, at bottom right
 */
export class Shape implements Initializable {
  private _cellMap: Cell[][];
  private _cells: Cell[];
  private _shapeType: ShapeType;
  private _shapeRotation: ShapeRotation;
  private _colour: Colour;
  private _location: Vector2;

  get cellMap(): Cell[][] {
    return this._cellMap;
  }

  get cells(): Cell[] {
    return this._cells;
  }

  get location(): Vector2 {
    return this._location;
  }

  get colour(): Colour {
    return this._colour;
  }

  /** Location of the top left cell of this shape */
  constructor(location: Vector2) {
    this._location = location;
  }

  init(): void {
    // All new shapes should be facing up.. I think?
    this._shapeRotation = ShapeRotation.Up;

    this._shapeType = this.getRandomShapeType();
    this._colour = getRandomColour();

    this.initializeShapeCells();
  }

  move(direction: Direction): void {
    if (direction === Direction.Left) {
      this._location.x--;
    } else if (direction === Direction.Right) {
      this._location.x++;
    } else {
      this._location.y--;
    }
  }

  rotate(): void {
    // Turn the shape clockwise
    if (this._shapeRotation > ShapeRotation.Up) {
      this._shapeRotation--;
    } else {
      this._shapeRotation = ShapeRotation.Right;
    }

    this.initializeShapeCells();
  }

  private initializeShapeCells(): void {
    const cellLocations = getShapeForShapeRotation(this._shapeType, this._shapeRotation);

    this._cellMap = [];
    this._cells = [];

    for (var y = 0; y < 4; y++) {
      this._cellMap[y] = [];

      for (var x = 0; x < 4; x++) {
        if (!!cellLocations[y][x]) {
          const cell = new Cell(null, { x, y }, this._colour, this);
          this._cellMap[y][x] = cell;
          this.cells.push(cell);
        }
      }
    }
  }

  private getRandomShapeType(): ShapeType {
    return Math.floor(Math.random() * ShapeType.Z);
  }
}
