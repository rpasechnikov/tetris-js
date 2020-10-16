import { ShapeRotation } from '../../enums';

/** 'O' shape is identical regardless of the rotation */
const SHAPE_CELL_LOCATIONS = [
  [false, false, false, false],
  [false, true, true, false],
  [false, true, true, false],
  [false, false, false, false]
];

export const O_SHAPE_CELL_LOCATIONS = new Map<ShapeRotation, boolean[][]>([
  [ShapeRotation.Up, SHAPE_CELL_LOCATIONS],
  [ShapeRotation.Left, SHAPE_CELL_LOCATIONS],
  [ShapeRotation.Down, SHAPE_CELL_LOCATIONS],
  [ShapeRotation.Right, SHAPE_CELL_LOCATIONS]
]);
