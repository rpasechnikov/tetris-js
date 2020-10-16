import { DEFAULT_CELL_LOCATIONS } from 'src/constants/shape-cell-locations';
import { ShapeType } from '../enums';

/** Returns the default (ShapeRotation.Up) shape for a shape type specified */
export function getDefaultShapeForShapeType(shapeType: ShapeType): boolean[][] {
  return DEFAULT_CELL_LOCATIONS.get(shapeType);
}

// switch (shapeType) {
//   case ShapeType.I:
//     return SHAPE_CELL_LOCATIONS.get(shapeType);
//   default:
//     throw new Error(`getDefaultShapeRotation() does not support shape type ${shapeType}`);
// }
