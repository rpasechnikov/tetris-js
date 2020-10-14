import { ShapeType } from '../enums';

export const SHAPE_CELL_LOCATIONS = new Map<ShapeType, boolean[][]>([
  [
    ShapeType.I,
    [
      [false, false, false, false],
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false]
    ]
  ],
  [
    ShapeType.J,
    [
      [false, false, false, false],
      [true, false, false, false],
      [true, true, true, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeType.L,
    [
      [false, false, false, false],
      [false, false, false, false],
      [false, true, true, true],
      [false, true, false, false]
    ]
  ],
  [
    ShapeType.O,
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeType.S,
    [
      [false, false, false, false],
      [false, true, true, false],
      [true, true, false, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeType.T,
    [
      [false, false, false, false],
      [true, true, true, false],
      [false, true, true, false],
      [false, false, false, false]
    ]
  ],
  [
    ShapeType.Z,
    [
      [false, false, false, false],
      [true, true, false, false],
      [false, true, true, false],
      [false, false, false, false]
    ]
  ]
]);
