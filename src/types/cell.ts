import { Colour } from 'src/enums';
import { Initializable } from 'src/interfaces/initializable';
import { Vector2 } from 'src/interfaces/vector2';

/** Represents a 'cell' that could be a shape or an empty cell */
export class Cell implements Initializable {
  private _element: Element;
  private _colour: Colour;
  private _location: Vector2;

  constructor(element: Element, location: Vector2, colour: Colour = null) {
    this._element = element;
    this._colour = colour;
    this._location = location;
  }

  init(): void {
    this._element.addEventListener('click', (e: MouseEvent) => this.onClick(e));
  }

  private onClick(_: MouseEvent): void {
    console.log(`Clicked cell at x: ${this._location.x}, y: ${this._location.y}`);
  }

  private getRandomColour(): Colour {
    return Math.floor(Math.random() * 16) as Colour;
  }
}
