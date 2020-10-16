import { Rotation } from '../../enums';

export const T_SHAPE_CELL_LOCATIONS = new Map<Rotation, boolean[][]>([
  [
    Rotation.Up,
    [
      [false, false, false, false],
      [true, true, true, false],
      [false, true, false, false],
      [false, false, false, false]
    ]
  ],
  [
    Rotation.Left,
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, true, false],
      [false, true, false, false]
    ]
  ],
  [
    Rotation.Down,
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, true, false],
      [false, false, false, false]
    ]
  ],
  [
    Rotation.Right,
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, false, false],
      [false, true, false, false]
    ]
  ]
]);
