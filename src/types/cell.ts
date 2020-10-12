import { Initializable, Vector2 } from '../interfaces';
import { CellState } from '../enums';
import { Colour } from '../enums/colour';
import { COLOURS } from '../constants';

/** Represents a 'cell' that could be a shape or an empty cell */
export class Cell implements Initializable {
  private _element: Element;
  private _colour: Colour;
  private _location: Vector2;
  private _state: CellState;

  get location(): Vector2 {
    return this._location;
  }

  get state(): CellState {
    return this._state;
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
    this.setColour(Colour.Red);
  }

  deActivate(): void {
    this._state = CellState.Passive;
    this.setColour(Colour.Black);
  }

  clear(): void {
    this._state = CellState.Empty;
    this.unsetColour(Colour.Red);
  }

  private onClick(_: MouseEvent): void {
    console.log(`Clicked cell at x: ${this._location.x}, y: ${this._location.y}`);
  }

  private setColour(colour: Colour): void {
    this._colour = colour;
    this._element.classList.add(COLOURS.get(colour));
  }

  private unsetColour(colour: Colour): void {
    this._colour = null;
    this._element.classList.remove(COLOURS.get(colour));
  }

  private getRandomColour(): Colour {
    return Math.floor(Math.random() * 16) as Colour;
  }
}
