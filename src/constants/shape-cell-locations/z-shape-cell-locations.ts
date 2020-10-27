import { Rotation } from '../../enums';

const SHAPE_LOCATIONS_UP_DOWN = [
  [0, 0, 0, 0],
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
];

const SHAPE_LOCATIONS_LEFT_RIGHT = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
  [1, 0, 0, 0]
];

export const Z_SHAPE_CELL_LOCATIONS = new Map<Rotation, number[][]>([
  [Rotation.Up, SHAPE_LOCATIONS_UP_DOWN],
  [Rotation.Left, SHAPE_LOCATIONS_LEFT_RIGHT],
  [Rotation.Down, SHAPE_LOCATIONS_UP_DOWN],
  [Rotation.Right, SHAPE_LOCATIONS_LEFT_RIGHT]
]);
