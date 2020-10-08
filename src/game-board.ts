export class GameBoard {
  init(): void {
    this.render();
  }

  private render(): void {
    const gameBoard = document.getElementsByClassName('game-board')[0];
    console.log(gameBoard);
  }
}
