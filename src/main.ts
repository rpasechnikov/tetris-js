import { BOUNDS } from './constants';
import { Updatable } from './interfaces/updatable';
import { Board } from './types/board';
import { Controls } from './types/controls';

main();

function main(): void {
  const timestepReduction = 10;
  const gameControls = new Controls();
  const gameBoard = new Board();

  let timestepMs = BOUNDS.TIMESTEP_MS;

  gameControls.init();
  gameBoard.init();

  gameControls.playPause$.subscribe(play => gameBoard.playPause(play));
  gameControls.reset$.subscribe(_ => {
    gameBoard.reset();
    timestepMs = BOUNDS.TIMESTEP_MS;
  });

  gameBoard.rowResolved$.subscribe(_ => {
    gameControls.incrementScore();

    // TODO: update timestep speed. Probably using setTimeout()
    // timestepMs -= timestepReduction;
  });

  gameBoard.gameOver$.subscribe(_ => gameControls.displayGameOverMessage());

  setInterval(doTimestep, timestepMs, [gameControls, gameBoard], timestepMs);
}

function doTimestep(updatableControls: Updatable[], timestepMs: number): void {
  console.log(`Timestep...`);

  for (const control of updatableControls) {
    control.update();
  }
}
