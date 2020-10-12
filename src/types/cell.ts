import { Initializable, Vector2 } from '../interfaces';
import { CellState } from '../enums';
import { Colour } from '../enums/colour';

/** Represents a 'cell' that could be a shape or an empty cell */
export class Cell implements Initializable {
  private _element: Element;
  private _colour: Colour;
  private _location: Vector2;
  private _state: CellState;

  get location(): Vector2 {
    return this._location;
  }

  constructor(element: Element, location: Vector2, colour: Colour = null) {
    this._element = element;
    this._colour = colour;
    this._location = location;
    this._state = CellState.Empty;
  }

  init(): void {
    this._element.addEventListener('click', (e: MouseEvent) => this.onClick(e));
  }

  activate(): void {
    this._state = CellState.Active;
  }

  deActivate(): void {
    this._state = CellState.Passive;
  }

  clear(): void {
    this._state = CellState.Empty;
  }

  private onClick(_: MouseEvent): void {
    console.log(`Clicked cell at x: ${this._location.x}, y: ${this._location.y}`);
  }

  private getRandomColour(): Colour {
    return Math.floor(Math.random() * 16) as Colour;
  }
}
