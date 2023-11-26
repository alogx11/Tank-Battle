class GameOfLife {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.grid = [];
    this.nextGrid = [];
    this.bgColor = color(255);
    this.aliveColor = color(0);
    this.columns = Math.floor(windowWidth / cellSize);
    this.rows = Math.floor(windowHeight / cellSize);
  }
}
