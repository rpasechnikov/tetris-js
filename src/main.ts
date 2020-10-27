import { Updatable } from './interfaces/updatable';
import { Board } from './types/board';
import { Controls } from './types/controls';

main();

function main(): void {
  const timestepMs = 400;
  const gameControls = new Controls();
  const gameBoard = new Board();

  gameControls.init();
  gameBoard.init();

  gameControls.playPause$.subscribe(play => gameBoard.playPause(play));
  gameControls.reset$.subscribe(_ => gameBoard.reset());

  setInterval(doTimestep, timestepMs, [gameControls, gameBoard]);
}

function doTimestep(updatableControls: Updatable[]): void {
  console.log('Timestep...');

  for (const control of updatableControls) {
    control.update();
  }
}
