import { Rotation } from '../../enums';

/** 'O' shape is identical regardless of the rotation */
const SHAPE_CELL_LOCATIONS = [
  [false, false, false, false],
  [false, true, true, false],
  [false, true, true, false],
  [false, false, false, false]
];

export const O_SHAPE_CELL_LOCATIONS = new Map<Rotation, boolean[][]>([
  [Rotation.Up, SHAPE_CELL_LOCATIONS],
  [Rotation.Left, SHAPE_CELL_LOCATIONS],
  [Rotation.Down, SHAPE_CELL_LOCATIONS],
  [Rotation.Right, SHAPE_CELL_LOCATIONS]
]);
