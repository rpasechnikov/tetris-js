import { Colour, Rotation, ShapeType } from '../enums';

export function getRandomColour(): Colour {
  return Math.floor(Math.random() * Colour.Red) as Colour;
}

export function getRandomShapeType(): ShapeType {
  return Math.floor(Math.random() * ShapeType.Z);
}

export function getRandomShapeRotation(): Rotation {
  return Math.floor(Math.random() * Rotation.Right);
}
