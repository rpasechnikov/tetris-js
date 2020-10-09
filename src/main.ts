import { GameBoard } from './game-board';
import { GameControls } from './game-controls';
import { Updatable } from './interfaces/updatable';

main();

function main(): void {
  const gameControls = new GameControls();
  const gameBoard = new GameBoard();

  const updatableControls: Updatable[] = [gameControls, gameBoard];

  gameControls.init();
  gameBoard.init();

  setInterval(doTimestep, 1000, updatableControls);
}

function doTimestep(updatableControls: Updatable[]): void {
  console.log('Timestep...');

  for (const control of updatableControls) {
    control.update();
  }
}
