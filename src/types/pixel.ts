import { Colour } from 'src/enums';
import { Initializable } from 'src/interfaces/initializable';

/** Represents a 'pixel' that makes up a shape */
export class Pixel implements Initializable {
  private _colour: Colour;

  constructor(colour?: Colour) {
    this._colour = !!colour ? colour : this.getRandomColour();
  }

  init(): void {}

  private getRandomColour(): Colour {
    return Math.floor(Math.random() * 16) as Colour;
  }
}
