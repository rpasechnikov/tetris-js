import { Colour, ShapeRotation, ShapeType } from '../enums';

export function getRandomColour(): Colour {
  return Math.floor(Math.random() * Colour.Black) as Colour;
}

export function getRandomShapeType(): ShapeType {
  return Math.floor(Math.random() * ShapeType.Z);
}

export function getRandomShapeRotation(): ShapeRotation {
  return Math.floor(Math.random() * ShapeRotation.Right);
}
