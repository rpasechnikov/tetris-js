import { Updatable } from './interfaces/updatable';
import { Board } from './types/board';
import { Controls } from './types/controls';

main();

function main(): void {
  const timestepMs = 400;
  const gameControls = new Controls();
  const gameBoard = new Board();

  const updatableControls: Updatable[] = [gameControls, gameBoard];

  gameControls.init();
  gameBoard.init();

  setInterval(doTimestep, timestepMs, updatableControls);
}

function doTimestep(updatableControls: Updatable[]): void {
  console.log('Timestep...');

  for (const control of updatableControls) {
    control.update();
  }
}
