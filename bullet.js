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
}