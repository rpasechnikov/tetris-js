import { Vector2 } from '../interfaces';
import { CellState, Direction } from '../enums';
import { Cell, Shape } from '../types';
import { BOUNDS } from '../constants';

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
