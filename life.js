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

  computeGeneration() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let neighbors = countNeighbors(i, j);
        if (grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
          nextGrid[i][j] = 0;
        } else if (grid[i][j] == 0 && neighbors == 3) {
          nextGrid[i][j] = 1;
        } else {
          nextGrid[i][j] = grid[i][j];
        }
      }
    }

    let temp = grid;
    grid = nextGrid;
    nextGrid = temp;
  }

  displayGrid() {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let c = grid[i][j] == 1 ? aliveColor : bgColor;
        fill(c);
        rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }

  countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue; // check ordered pairs aound x,y
        count += grid[(x + i + columns) % columns][(y + j + rows) % rows];
      }
    }
    return count;
  }

  createGrid() {
    grid = new Array(columns); // create array of length columns of arrays.
    nextGrid = new Array(columns); // create second array where we store computed values
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(rows); // set length of each column
      grid[i].fill(0); // fill each column full of 0s
      nextGrid[i] = new Array(rows);
      nextGrid[i].fill(0);
      for (let j = 0; j < rows; j++) {
        //randomly fill each cell with a 1 or 0
        let x = Math.random();
        if (x > 0.5) {
          grid[i][j] = 1;
        } else {
          grid[i][j] == 0;
        }
      }
    }
  }
}
