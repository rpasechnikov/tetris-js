import { Colour, ShapeType } from '../enums';

export const COLOURS = new Map<Colour, string>([
  [Colour.Black, 'black'],
  [Colour.DarkBlue, 'dark-blue'],
  [Colour.Green, 'green'],
  [Colour.LightBlue, 'light-blue'],
  [Colour.Orange, 'orange'],
  [Colour.Pink, 'pink'],
  [Colour.Red, 'red'],
  [Colour.Yellow, 'yellow']
]);

export const SHAPE_ROTATION_CELL_LOCATIONS = new Map<ShapeType, boolean[][]>([
  [
    ShapeType.O,
    [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false]
    ]
  ]
]);
