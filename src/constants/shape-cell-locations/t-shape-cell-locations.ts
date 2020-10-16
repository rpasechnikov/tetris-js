import { ShapeRotation } from '../../enums';

export const T_SHAPE_CELL_LOCATIONS = new Map<ShapeRotation, boolean[][]>([
  [
    ShapeRotation.Up,
    [
      [false, false, false, false],
      [true, true, true, false],
      [false, true, false, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeRotation.Left,
    [
      [false, false, false, false],
      [false, true, false, false],
      [false, true, true, false],
      [false, true, false, false]
    ]
  ],
  [
    ShapeRotation.Down,
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, true, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeRotation.Right,
    [
      [false, false, false, false],
      [false, true, false, false],
      [true, true, false, false],
      [false, true, false, false]
    ]
  ]
]);
