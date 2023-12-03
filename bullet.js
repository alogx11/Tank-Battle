class Bullet {
  constructor(x, y, angle, speed) {
    this.pos = createVector(x, y);
    this.angle = angle;
    this.speed = speed;
    this.velocity = p5.Vector.fromAngle(radians(this.angle));
    this.velocity.mult(this.speed);
    this.radius = 5;
    this.width = this.radius;
  }

  update() {
    this.pos.add(this.velocity);
  }

  display() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  isHittingGrid(x, y, cellSize) {
    // x and y are bullet coordinates
    let i = Math.floor(x / cellSize);
    let j = Math.floor(y / cellSize);
    if (i >= grid.grid.length || i < 0 || j >= grid.grid[i].length || j < 0) {
      return false;
    }
    if (grid.grid[i][j] == 0) {
      // dead cell, cant hit grid
      return false;
    }
    x = i * cellSize + cellSize / 2;
    y = j * cellSize + cellSize / 2;
    const distance = dist(this.pos.x, this.pos.y, x, y);
    return distance <= this.width + cellSize / 2;
  }
}
