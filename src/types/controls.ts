import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Initializable, Updatable } from '../interfaces';
import { currentTimeMsToHoursMinutesSecondsSince } from '../utils/string-utils';

export class Controls implements Initializable, Updatable {
  private readonly PLAY = 'Play';
  private readonly PAUSE = 'Pause';

  // Elements
  private _timerDiv: Element;
  private _scoreDiv: Element;
  private _playPauseBtn: Element;
  private _resetBtn: Element;

  private _startingMs: number;

  private _isGameRunning = false;

  playPause$: Observable<boolean>;
  reset$: Observable<void>;

  init(): void {
    this.setupUiControls();

    this._startingMs = new Date().getTime();

    this.update();
  }

  update(): void {
    this._timerDiv.innerHTML = currentTimeMsToHoursMinutesSecondsSince(this._startingMs);
  }

  private setupUiControls(): void {
    this._timerDiv = document.getElementsByClassName('timer')[0];
    this._scoreDiv = document.getElementsByClassName('score')[0];
    this._playPauseBtn = document.getElementById('play-pause-btn');
    this._resetBtn = document.getElementById('reset-btn');

    this.updatePlayPauseButtonText();

    this.playPause$ = fromEvent(this._playPauseBtn, 'click').pipe(
      map(_ => {
        this._isGameRunning = !this._isGameRunning;
        this.updatePlayPauseButtonText();

        return this._isGameRunning;
      })
    );

    this.reset$ = fromEvent(this._resetBtn, 'click').pipe(map(_ => {}));
  }

  private updatePlayPauseButtonText(): void {
    this._playPauseBtn.innerHTML = this._isGameRunning ? this.PAUSE : this.PLAY;
  }
}
