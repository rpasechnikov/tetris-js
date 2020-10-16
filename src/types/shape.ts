import { Cloneable, Initializable, Vector2 } from '../interfaces';
import { Colour, Direction, Rotation, ShapeType } from '../enums';
import { Cell } from './cell';
import { getRandomColour, getShapeCells, getShapeForShapeRotation, rotateClockwise } from '../utils';

/** Represents a collection of cells in a specific shape.
 * All cells are in local coordinates, starting with 0,0 at top left and ending
 * with 3,3, at bottom right
 */
export class Shape implements Initializable {
  private _cellMap: Cell[][];
  private _cells: Cell[];
  private _shapeType: ShapeType;
  private _rotation: Rotation;
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

  get type(): ShapeType {
    return this._shapeType;
  }

  get rotation(): Rotation {
    return this._rotation;
  }

  /** Location of the top left cell of this shape */
  constructor(location: Vector2) {
    this._location = location;
  }

  init(): void {
    // All new shapes should be facing up.. I think?
    this._rotation = Rotation.Up;

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
    this._rotation = rotateClockwise(this._rotation);
    this.initializeShapeCells();
  }

  private initializeShapeCells(): void {
    const shapeCellsResult = getShapeCells(this.type, this.rotation, this.colour);

    this._cellMap = shapeCellsResult.cellMap;
    this._cells = shapeCellsResult.cells;
  }

  private getRandomShapeType(): ShapeType {
    return Math.floor(Math.random() * ShapeType.Z);
  }
}
