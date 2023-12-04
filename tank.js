class Tank {
  constructor(x, y, width, c, speed, angle) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = this.width * 0.75;
    this.c = c;
    this.angle = angle;
    this.speed = speed;
    this.bullets = []; // array of bullets fired by tank
    this.alive = true;
    this.kills = 0;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y); // move origin to tank x , y
    rotate(this.angle); // rotate tank around angle to show change in direction
    rectMode(CENTER);
    fill(this.c);
    rect(0, 0, this.width, this.height); // tank base
    rect(0 + this.width * 0.3, 0, this.width * 0.8, this.height * 0.4); // tank barrel
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
    this.angle -= this.speed * 1.25;
  }

  turnRight() {
    this.angle += this.speed * 1.25;
  }

  shootBullet() {
    const bulletSpeed = this.speed + this.speed; // Set the speed of the bullet
    // Calculate the position at the edge of the tank
    const offsetX = (this.width / 2) * cos(this.angle); // offset so bullet is fired from barrel and not center of tank.
    const offsetY = (this.width / 2) * sin(this.angle); // without offset bullets fired when rotating do not look correct
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
    ); // treat tanks like circle to check for collisions
    return distance < (this.width + otherTank.width) / 2;
  }

  isHit(bullet) {
    // Check if this tank is hit by a bullet
    const distance = dist(this.pos.x, this.pos.y, bullet.pos.x, bullet.pos.y);
    return distance < (this.width + bullet.radius) / 2;
  }

  isHittingGrid(x, y, cellSize) {
    // x and y are grid array indices.
    x = x * cellSize + cellSize / 2; // calculate x and y based on given row and col indices
    y = y * cellSize + cellSize / 2;
    const distance = dist(this.pos.x, this.pos.y, x, y);
    return distance < (this.width + cellSize) / 2;
  }

  isOutOfBounds() {
    return (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    );
  }
}
