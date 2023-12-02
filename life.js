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
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        let neighbors = this.countNeighbors(i, j);
        if (this.grid[i][j] == 1 && (neighbors < 2 || neighbors > 3)) {
          this.nextGrid[i][j] = 0;
        } else if (this.grid[i][j] == 0 && neighbors == 3) {
          this.nextGrid[i][j] = 1;
        } else {
          this.nextGrid[i][j] = this.grid[i][j];
        }
      }
    }

    let temp = this.grid;
    this.grid = this.nextGrid;
    this.nextGrid = temp;
  }

  displayGrid() {
    push();
    noStroke();
    rectMode(CORNER);
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (
          this.isTankHittingCell(i, j, redTank) ||
          this.isTankHittingCell(i, j, blueTank)
        ) {
          this.grid[i][j] == 0;
        }
        let c = this.grid[i][j] == 1 ? this.aliveColor : this.bgColor;
        fill(c);
        rect(
          i * this.cellSize,
          j * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
    pop();
  }

  countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) continue; // check ordered pairs aound x,y
        count +=
          this.grid[(x + i + this.columns) % this.columns][
            (y + j + this.rows) % this.rows
          ];
      }
    }
    return count;
  }

  createGrid() {
    this.grid = new Array(this.columns); // create array of length columns of arrays.
    this.nextGrid = new Array(this.columns); // create second array where we store computed values
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.rows); // set length of each column
      this.grid[i].fill(0); // fill each column full of 0s
      this.nextGrid[i] = new Array(this.rows);
      this.nextGrid[i].fill(0);
      for (let j = 0; j < this.rows; j++) {
        //randomly fill each cell with a 1 or 0
        let x = Math.random();
        if (x > 0.5) {
          this.grid[i][j] = 1;
        } else {
          this.grid[i][j] = 0;
        }
      }
    }
  }

  isCellOccupiedByTank(x, y, tank) {
    let x1 = Math.floor(tank.pos.x - tank.width / this.cellSize);
    let y1 = Math.floor(tank.pos.y - tank.width / this.cellSize);
    let x2 = Math.floor(tank.pos.x + tank.width / this.cellSize);
    let y2 = Math.floor(tank.pos.y + tank.width / this.cellSize);

    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  }

  isTankHittingCell(x, y, tank) {
    let cellCenterX = x + this.cellSize / 2;
    let cellCenterY = y + this.cellSize / 2;
    print("cell x: " + x, " cell y: " + y);
    print("tank x: " + tank.pos.x, " tank y: " + tank.pos.y);
    // Calculate distance between tank center and cell position
    print("max dist = " + tank.width / 2 + this.cellSize / 2);
    let distance = dist(x, y, tank.pos.x, tank.pos.y);
    print(distance);
    print(distance <= tank.width + this.cellSize);
    return distance <= tank.width + this.cellSize * 100;
  }
}
