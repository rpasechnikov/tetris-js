import { Rotation } from '../../enums';

/** 'O' shape is identical regardless of the rotation */
const SHAPE_CELL_LOCATIONS = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

export const O_SHAPE_CELL_LOCATIONS = new Map<Rotation, number[][]>([
  [Rotation.Up, SHAPE_CELL_LOCATIONS],
  [Rotation.Left, SHAPE_CELL_LOCATIONS],
  [Rotation.Down, SHAPE_CELL_LOCATIONS],
  [Rotation.Right, SHAPE_CELL_LOCATIONS]
]);
