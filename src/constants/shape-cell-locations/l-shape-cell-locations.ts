import { ShapeRotation } from '../../enums';

export const L_SHAPE_CELL_LOCATIONS = new Map<ShapeRotation, boolean[][]>([
  [
    ShapeRotation.Up,
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, true, true],
      [false, true, false, false]
    ]
  ],
  [
    ShapeRotation.Left,
    [
      [false, false, false, false],
      [false, false, true, false],
      [false, false, true, false],
      [false, false, true, true]
    ]
  ],
  [
    ShapeRotation.Down,
    [
      [false, false, false, false],
      [false, false, false, true],
      [false, true, true, true],
      [false, false, false, false]
    ]
  ],
  [
    ShapeRotation.Right,
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, false, true, false],
      [false, false, true, false]
    ]
  ]
]);
