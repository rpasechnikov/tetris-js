import { Initializable } from './interfaces/initializable';
import { Updatable } from './interfaces/updatable';
import { currentTimeMsToHoursMinutesSecondsSince, numberToString } from './utils/string-utils';

export class GameControls implements Initializable, Updatable {
  private _timerDiv: Element;
  private _startingMs: number;

  init(): void {
    this._timerDiv = document.getElementsByClassName('timer')[0];
    this._startingMs = new Date().getTime();

    this._timerDiv.innerHTML = numberToString(0);
  }

  update(): void {
    this._timerDiv.innerHTML = currentTimeMsToHoursMinutesSecondsSince(this._startingMs);
  }
}
