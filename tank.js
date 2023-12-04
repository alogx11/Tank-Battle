class Tank {
  constructor(x, y, width, c, speed, angle) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = this.width * 0.75;
    this.c = c;
    this.angle = angle;
    this.speed = speed;
    this.velocity = createVector(0, 0);
    this.bullets = [];
    this.alive = true;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);
    fill(this.c);
    rect(0, 0, this.width, this.height);
    rect(0 + this.width * 0.3, 0, this.width * 0.8, this.height * 0.4);
    pop();
  }

  moveForward() {
    this.pos.x += this.speed * cos(this.angle);
    this.pos.y += this.speed * sin(this.angle);
  }

  moveBack() {
    this.pos.x -= this.speed * cos(this.angle);
    this.pos.y -= this.speed * sin(this.angle);
  }

  turnLeft() {
    this.angle -= this.speed;
  }

  turnRight() {
    this.angle += this.speed;
  }

  shootBullet() {
    const bulletSpeed = this.speed + this.speed; // Set the speed of the bullet
    // Calculate the position at the edge of the tank
    const offsetX = (this.width / 2) * cos(this.angle); // Change '5' for desired offset
    const offsetY = (this.width / 2) * sin(this.angle); // Change '5' for desired offset
    const bullet = new Bullet(
      this.pos.x + offsetX,
      this.pos.y + offsetY,
      this.angle,
      bulletSpeed
    );
    return bullet;
  }

  isColliding(otherTank) {
    // Check if this tank is colliding with another tank
    if (!otherTank.alive) {
      return false;
    }
    const distance = dist(
      this.pos.x,
      this.pos.y,
      otherTank.pos.x,
      otherTank.pos.y
    );
    return distance < (this.width + otherTank.width) / 2;
  }

  isHit(bullet) {
    // Check if this tank is hit by a bullet
    const distance = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
    return distance < (this.width + bullet.radius) / 2;
  }

  isHittingGrid(x, y, cellSize) {
    x = x * cellSize + cellSize / 2;
    y = y * cellSize + cellSize / 2;
    const distance = dist(this.pos.x, this.pos.y, x, y);
    return distance < (this.width + cellSize) / 2;
  }
}
