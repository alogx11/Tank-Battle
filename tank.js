class Tank {
  constructor(x, y, width, c) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = this.width * 0.75;
    this.c = c;
    this.angle = 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rectMode(CENTER);
    fill(this.c);
    rect(0, 0, this.width, this.height);
    rect(0 + this.width * 0.3, 0, this.width * 0.8, this.height * 0.4);
    pop();
  }

  moveForward() {
    print("moving");
    this.x += 2;
  }

  moveBack() {
    print("moving");
    this.x -= 2;
  }

  turnLeft() {
    print("moving");
    this.angle -= 2;
  }

  turnRight() {
    print("moving");
    this.angle += 2;
  }
}
