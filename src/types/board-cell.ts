import { COLOURS, CSS_CLASSES } from '../constants';
import { CellState, Colour } from '../enums';
import { Vector2 } from '../interfaces';
import { Shape, Cell } from '.';

/** Represents a cell that has a physical HTML element to represent it on the board */
export class BoardCell extends Cell {
  private _element: Element;

  get element(): Element {
    return this._element;
  }

  constructor(element: Element, location: Vector2, colour: Colour = null, shape: Shape = null, state: CellState = CellState.Empty) {
    super(location, colour, shape, state);

    this._element = element;
    this._element.addEventListener('click', (e: MouseEvent) => this.onClick(e));
  }

  clone(): BoardCell {
    return new BoardCell(this.element, this.location, this.colour, this.shape, this.state);
  }

  updateElement(element: Element, colour: Colour): void {
    this._element = element;

    // Clear any previous classes and set default
    this._element.className = CSS_CLASSES.Cell;
    this.setColour(colour);
  }

  protected setColour(colour: Colour): void {
    super.setColour(colour);

    if (!!this._element) {
      this._element.classList.add(COLOURS.get(colour));
    }
  }

  protected unsetColour(colour: Colour): void {
    super.unsetColour(colour);

    if (!!this._element) {
      this._element.classList.remove(COLOURS.get(colour));
    }
  }
}
