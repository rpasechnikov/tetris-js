import { Cell, Shape } from '../types';
import {
  DEFAULT_CELL_LOCATIONS,
  I_SHAPE_CELL_LOCATIONS,
  J_SHAPE_CELL_LOCATIONS,
  L_SHAPE_CELL_LOCATIONS,
  O_SHAPE_CELL_LOCATIONS,
  S_SHAPE_CELL_LOCATIONS,
  T_SHAPE_CELL_LOCATIONS,
  Z_SHAPE_CELL_LOCATIONS
} from '../constants/shape-cell-locations';
import { Colour, Rotation, ShapeType } from '../enums';

/** Returns the default (ShapeRotation.Up) shape for a shape type specified */
export function getDefaultShapeForShapeType(shapeType: ShapeType): boolean[][] {
  return DEFAULT_CELL_LOCATIONS.get(shapeType);
}

export function getShapeForShapeRotation(shapeType: ShapeType, shapeRotation: Rotation): boolean[][] {
  switch (shapeType) {
    case ShapeType.I:
      return I_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.J:
      return J_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.L:
      return L_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.O:
      return O_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.S:
      return S_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.T:
      return T_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    case ShapeType.Z:
      return Z_SHAPE_CELL_LOCATIONS.get(shapeRotation);
    default:
      throw new Error(`getDefaultShapeRotation() does not support shape type ${shapeType}`);
  }
}

/** Returns an object of Cells and CellMap, representing the cells that this shape will take up */
export function getShapeCells(shapeType: ShapeType, shapeRotation: Rotation, shapeColour: Colour): { cells: Cell[]; cellMap: Cell[][] } {
  const cellLocations = getShapeForShapeRotation(shapeType, shapeRotation);
  const cells: Cell[] = [];
  const cellMap: Cell[][] = [];

  for (var y = 0; y < 4; y++) {
    cellMap[y] = [];

    for (var x = 0; x < 4; x++) {
      if (!!cellLocations[y][x]) {
        const cell = new Cell(null, { x, y }, shapeColour, this);
        cellMap[y][x] = cell;
        cells.push(cell);
      }
    }
  }

  return { cells, cellMap };
}

/** Increments the rotation value provided to rotate it clockwise by 1 step */
export function rotateClockwise(rotation: Rotation): Rotation {
  // Turn the shape clockwise
  if (rotation < Rotation.Left) {
    return rotation + 1;
  } else {
    return Rotation.Up;
  }
}
