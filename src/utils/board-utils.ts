import { Vector2 } from '../interfaces';
import { CellState, Direction } from '../enums';
import { Cell, Shape } from '../types';
import { BOUNDS } from '../constants';
import { getShapeCells, rotateClockwise } from '.';

/** Returns true if the shape will not intersect with any other non-empty cells post movement in the direction specified, false otherwise */
export function canShapeMoveInDirection(boardCells: Cell[][], shape: Shape, direction: Direction): boolean {
  if (direction === Direction.Down) {
    return canShapeMoveDown(boardCells, shape);
  } else if (direction === Direction.Left) {
    return canShapeMoveLeft(boardCells, shape);
  } else if (direction === Direction.Right) {
    return canShapeMoveRight(boardCells, shape);
  } else {
    console.warn('canShapeMove() does not support Direction.Up!');
  }
}

/** Returns true if the shape will not intersect with any other non-empty cells post rotation, false otherwise */
export function canShapeRotate(boardCells: Cell[][], shape: Shape): boolean {
  const rotatedShapeCells = getShapeCells(shape.type, rotateClockwise(shape.rotation), shape.colour);

  for (const shapeCell of rotatedShapeCells.cells) {
    const cellWorldLocation = shapeToBoardCellLocation(shapeCell.location, shape.location);

    // Cell is out of board bounds
    if (
      cellWorldLocation.x < 0 ||
      cellWorldLocation.x > BOUNDS.BoardWidth - 1 ||
      cellWorldLocation.y < 0 ||
      cellWorldLocation.y > BOUNDS.BoardHeight - 1
    ) {
      return false;
    }

    // This is NOT an active shape cell (the shape that we are trying to rotate) and there is another non-empty cell at this location
    if (
      !boardCells[cellWorldLocation.y][cellWorldLocation.x].shape &&
      boardCells[cellWorldLocation.y][cellWorldLocation.x].state !== CellState.Empty
    ) {
      return false;
    }
  }

  return true;
}

export function canShapeMoveDown(boardCells: Cell[][], shape: Shape): boolean {
  // Are there any cells right under this cell's bottom-most pixels
  for (const shapeCell of shape.cells) {
    const cellWorldLocation = shapeToBoardCellLocation(shapeCell.location, shape.location);

    // Already at the bottom of the board
    if (cellWorldLocation.y < 1) {
      return false;
    }

    const cellBelow = boardCells[cellWorldLocation.y - 1][cellWorldLocation.x];

    // Another non-empty cell below
    if (!cellBelow.shape && cellBelow.state !== CellState.Empty) {
      return false;
    }
  }

  return true;
}

export function canShapeMoveLeft(boardCells: Cell[][], shape: Shape): boolean {
  // Are there any cells right under this cell's bottom-most pixels
  for (const shapeCell of shape.cells) {
    const cellWorldLocation = shapeToBoardCellLocation(shapeCell.location, shape.location);

    // Already at the left of the board
    if (cellWorldLocation.x < 1) {
      return false;
    }

    const cellToTheLeft = boardCells[cellWorldLocation.y][cellWorldLocation.x - 1];

    // Another non-empty cell below
    if (!cellToTheLeft.shape && cellToTheLeft.state !== CellState.Empty) {
      return false;
    }
  }

  return true;
}

export function canShapeMoveRight(boardCells: Cell[][], shape: Shape): boolean {
  // Are there any cells right under this cell's bottom-most pixels
  for (const shapeCell of shape.cells) {
    const cellWorldLocation = shapeToBoardCellLocation(shapeCell.location, shape.location);

    // Already at the bottom of the board
    if (cellWorldLocation.x > BOUNDS.BoardWidth - 2) {
      return false;
    }

    const cellToTheRight = boardCells[cellWorldLocation.y][cellWorldLocation.x + 1];

    // Another non-empty cell below
    if (!cellToTheRight.shape && cellToTheRight.state !== CellState.Empty) {
      return false;
    }
  }

  return true;
}

/** Returns the cell location on the board, calculated from cell location within the shape.
 * Basically translates local to world coordinates
 */
export function shapeToBoardCellLocation(localCellLocation: Vector2, shapeLocation: Vector2): Vector2 {
  return {
    y: shapeLocation.y - localCellLocation.y,
    x: shapeLocation.x + localCellLocation.x
  };
}
