let redTank, blueTank;
function setup() {
  createCanvas(windowWidth, windowHeight);

  // tank param (x, y, width, color, speed)
  redTank = new Tank(
    windowWidth / 4,
    windowHeight / 2,
    windowWidth * 0.04,
    color(255, 0, 0),
    2
  );
  blueTank = new Tank(
    (windowWidth / 4) * 3,
    windowHeight / 2,
    windowWidth * 0.04,
    color(0, 0, 255),
    2
  );
}

function draw() {
  background("gray");
  // Handle controls for the red tank (wasd)
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

  // Handle controls for the blue tank (Arrow keys)
  if (keyIsDown(LEFT)) {
    blueTank.turnLeft();
  }
  if (keyIsDown(RIGHT)) {
    blueTank.turnRight();
  }
  if (keyIsDown(UP)) {
    blueTank.moveForward();
  }
  if (keyIsDown(DOWN)) {
    blueTank.moveBack();
  }
  redTank.display();
  blueTank.display();
}

function keyPressed() {
  print(keyCode);
}
