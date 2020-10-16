import { ShapeRotation } from '../../enums';

const SHAPE_LOCATIONS_UP_DOWN = [
  [false, false, false, false],
  [true, true, false, false],
  [false, true, true, false],
  [false, false, false, false]
];

const SHAPE_LOCATIONS_LEFT_RIGHT = [
  [false, false, false, false],
  [false, true, false, false],
  [true, true, false, false],
  [true, false, false, false]
];

export const Z_SHAPE_CELL_LOCATIONS = new Map<ShapeRotation, boolean[][]>([
  [ShapeRotation.Up, SHAPE_LOCATIONS_UP_DOWN],
  [ShapeRotation.Left, SHAPE_LOCATIONS_LEFT_RIGHT],
  [ShapeRotation.Down, SHAPE_LOCATIONS_UP_DOWN],
  [ShapeRotation.Right, SHAPE_LOCATIONS_LEFT_RIGHT]
]);
