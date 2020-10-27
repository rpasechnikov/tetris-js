import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BOUNDS } from '../constants';
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
  private _score = 0;

  playPause$: Observable<boolean>;
  reset$: Observable<void>;

  init(): void {
    this.setupUiControls();

    this.setupControlValues();

    this.update();
  }

  update(): void {
    this._timerDiv.innerHTML = currentTimeMsToHoursMinutesSecondsSince(this._startingMs);
    this._scoreDiv.innerHTML = '' + this._score;

    if (!this._isGameRunning) {
      this._startingMs += BOUNDS.TIMESTEP_MS;
      return;
    }
  }

  incrementScore(): void {
    this._score += 1000;
  }

  private setupUiControls(): void {
    this._timerDiv = document.getElementsByClassName('timer')[0];
    this._scoreDiv = document.getElementsByClassName('score')[0];
    this._playPauseBtn = document.getElementById('play-pause-btn');
    this._resetBtn = document.getElementById('reset-btn');

    this.playPause$ = fromEvent(this._playPauseBtn, 'click').pipe(
      map(_ => {
        this._isGameRunning = !this._isGameRunning;
        this.updatePlayPauseButtonText();

        return this._isGameRunning;
      })
    );

    this.reset$ = fromEvent(this._resetBtn, 'click').pipe(
      map(_ => {
        this.setupControlValues();
      })
    );
  }

  private setupControlValues(): void {
    this._startingMs = new Date().getTime();
    this._score = 0;

    this.updatePlayPauseButtonText();
  }

  private updatePlayPauseButtonText(): void {
    this._playPauseBtn.innerHTML = this._isGameRunning ? this.PAUSE : this.PLAY;
  }
}
