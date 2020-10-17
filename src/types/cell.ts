import { Cloneable, Initializable, Vector2 } from '../interfaces';
import { CellState } from '../enums';
import { Colour } from '../enums/colour';
import { COLOURS, CSS_CLASSES } from '../constants';
import { Shape } from './shape';

/** Represents a 'cell' that could be part of shape or otherwise */
export class Cell implements Cloneable<Cell> {
  protected _colour: Colour;
  protected _location: Vector2;
  protected _state: CellState;
  protected _shape: Shape;

  get location(): Vector2 {
    return this._location;
  }

  get state(): CellState {
    return this._state;
  }

  get colour(): Colour {
    return this._colour;
  }

  get shape(): Shape {
    return this._shape;
  }

  constructor(location: Vector2, colour: Colour = null, shape: Shape = null, state: CellState = CellState.Empty) {
    this._colour = colour;
    this._location = location;
    this._shape = shape;
    this._state = state;
  }

  clone(): Cell {
    return new Cell(this.location, this.colour, this.shape, this.state);
  }

  updateLocation(location: Vector2): void {
    this._location = location;
  }

  activate(colour: Colour, shape: Shape): void {
    this._state = CellState.Active;
    this._shape = shape;
    this.setColour(colour);
  }

  deActivate(): void {
    this._state = CellState.Passive;
    this._shape = null;
  }

  clear(): void {
    this._state = CellState.Empty;
    this.unsetColour(this._colour);
  }

  protected onClick(_: MouseEvent): void {
    console.log(`Clicked cell at x: ${this._location.x}, y: ${this._location.y}`);
  }

  protected setColour(colour: Colour): void {
    this._colour = colour;
  }

  protected unsetColour(_: Colour): void {
    this._colour = null;
  }
}
