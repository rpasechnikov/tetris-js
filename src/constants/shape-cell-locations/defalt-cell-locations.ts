import {
  I_SHAPE_CELL_LOCATIONS,
  J_SHAPE_CELL_LOCATIONS,
  L_SHAPE_CELL_LOCATIONS,
  O_SHAPE_CELL_LOCATIONS,
  S_SHAPE_CELL_LOCATIONS,
  T_SHAPE_CELL_LOCATIONS,
  Z_SHAPE_CELL_LOCATIONS
} from '.';
import { ShapeRotation, ShapeType } from '../../enums';

/** Default cell locations for newly spawned shapes. All using ShapeRotation.Up */
export const DEFAULT_CELL_LOCATIONS = new Map<ShapeType, boolean[][]>([
  [ShapeType.I, I_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.J, J_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.L, L_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.O, O_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.S, S_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.T, T_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)],
  [ShapeType.Z, Z_SHAPE_CELL_LOCATIONS.get(ShapeRotation.Up)]
]);
