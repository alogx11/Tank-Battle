let ball;
let tankRed;
function setup() {
  createCanvas(windowWidth, windowHeight);

  ball = new Sprite();
  ball.diameter = 50;
  redTank = new Tank(200, 200, windowWidth * 0.04, color(255, 0, 0), 2);
}

function draw() {
  background("gray");
  // redTank.display();
  if (keyIsDown(65) || keyIsDown(97)) {
    // 65 is the key code for "a", and 97 is the key code for "A"
    redTank.turnLeft();
  }
  if (keyIsDown(68) || keyIsDown(100)) {
    // 68 is the key code for "d", and 100 is the key code for "D"
    redTank.turnRight();
  }
  if (keyIsDown(87) || keyIsDown(119)) {
    // 87 is the key code for "w", and 119 is the key code for "W"
    redTank.moveForward();
  }
  if (keyIsDown(83) || keyIsDown(115)) {
    // 83 is the key code for "s", and 115 is the key code for "S"
    redTank.moveBack();
  }
  redTank.display();
}

function keyPressed() {
  print(keyCode);
  // if (key === "a" || key === "A") {
  //   this.turnLeft();
  // } else if (key === "d" || key === "D") {
  //   this.turnRight();
  // } else if (key === "w" || key === "W") {
  //   this.moveForward();
  // } else if (key === "s" || key === "S") {
  //   this.moveBack();
}
