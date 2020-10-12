export enum CellState {
  /** Empty cell */
  Empty,

  /** Cell occupied by a non-moving/static/passine cell, which is part of a larger shape */
  Passive,

  /** Cell occupied by a movine/active cell, which is moving downwards until it hits the bottom
   * or a passive cell
   */
  Active
}
