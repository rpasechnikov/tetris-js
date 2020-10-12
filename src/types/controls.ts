import { Initializable, Updatable } from '../interfaces';
import { currentTimeMsToHoursMinutesSecondsSince } from '../utils/string-utils';

export class Controls implements Initializable, Updatable {
  private _timerDiv: Element;
  private _startingMs: number;

  init(): void {
    this._timerDiv = document.getElementsByClassName('timer')[0];
    this._startingMs = new Date().getTime();

    this.update();
  }

  update(): void {
    this._timerDiv.innerHTML = currentTimeMsToHoursMinutesSecondsSince(this._startingMs);
  }
}
