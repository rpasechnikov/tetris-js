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
import { ShapeRotation, ShapeType } from '../enums';

/** Returns the default (ShapeRotation.Up) shape for a shape type specified */
export function getDefaultShapeForShapeType(shapeType: ShapeType): boolean[][] {
  return DEFAULT_CELL_LOCATIONS.get(shapeType);
}

export function getShapeForShapeRotation(shapeType: ShapeType, shapeRotation: ShapeRotation): boolean[][] {
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
