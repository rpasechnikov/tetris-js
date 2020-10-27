import { Rotation } from '../../enums';

export const L_SHAPE_CELL_LOCATIONS = new Map<Rotation, number[][]>([
  [
    Rotation.Up,
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 0]
    ]
  ],
  [
    Rotation.Left,
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1]
    ]
  ],
  [
    Rotation.Down,
    [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 0]
    ]
  ],
  [
    Rotation.Right,
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ]
  ]
]);
