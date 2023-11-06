class Tank {
  constructor(x, y, width, c, speed) {
    this.pos = createVector(x, y);
    this.width = width;
    this.height = this.width * 0.75;
    this.c = c;
    this.angle = 0;
    this.speed = speed;
    this.velocity = createVector(0, 0);
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
    this.angle -= 2;
  }

  turnRight() {
    this.angle += 2;
  }

  isColliding(otherTank) {
    // Check if this tank is colliding with another tank
    const distance = dist(
      this.pos.x,
      this.pos.y,
      otherTank.pos.x,
      otherTank.pos.y
    );
    return distance < (this.width + otherTank.width) / 2;
  }
}
