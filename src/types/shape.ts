import { Cloneable, Initializable, Vector2 } from '../interfaces';
import { Colour, Direction, Rotation, ShapeType } from '../enums';
import { Cell } from './cell';
import { getRandomColour, getRandomShapeType, getShapeCells, rotateClockwise } from '../utils';

/** Represents a collection of cells in a specific shape.
 * All cells are in local coordinates, starting with 0,0 at top left and ending
 * with 3,3, at bottom right
 */
export class Shape implements Cloneable<Shape> {
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
  constructor(location: Vector2, type: ShapeType = null, rotation: Rotation = null, colour: Colour = null) {
    this._location = location;

    if (!!type) {
      this._shapeType = type;
    } else {
      this._shapeType = getRandomShapeType();
    }

    if (!!rotation) {
      this._rotation = rotation;
    } else {
      this._rotation = Rotation.Up;
    }

    if (!!colour) {
      this._colour = colour;
    } else {
      this._colour = getRandomColour();
    }

    this.initializeShapeCells();
  }

  clone(): Shape {
    return new Shape(this.location, this.type, this.rotation, this.colour);
  }

  updateLocation(location: Vector2): void {
    this._location = location;
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
}
