import { Initializable } from '../interfaces';
import { Colour, ShapeRotation, ShapeType } from '../enums';
import { Cell } from './cell';
import { SHAPE_ROTATION_CELL_LOCATIONS } from '../constants';
import { getRandomColour } from '../utils';

/** Represents a collection of cells in a specific shape.
 * All cells are in local coordinates, starting with 0,0 at top left and ending
 * with 3,3, at bottom right
 */
export class Shape implements Initializable {
  _cells: Cell[][];
  _shapeType: ShapeType;
  _shapeRotation: ShapeRotation;
  _shapeColour: Colour;

  get cells(): Cell[][] {
    return this._cells;
  }

  constructor() {}

  init(): void {
    // this._shapeType = this.getRandomShapeType();
    // this._shapeRotation = this.getRandomShapeRotation();

    this._shapeType = ShapeType.O;
    this._shapeColour = getRandomColour();

    const cellLocations = SHAPE_ROTATION_CELL_LOCATIONS.get(this._shapeType);

    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        if (!!cellLocations[x][y]) {
          this._cells[x][y] = new Cell(null, { x, y }, this._shapeColour);
        }
      }
    }
  }
}
