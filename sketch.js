let ball;
let tankRed;
function setup() {
  new Canvas(windowWidth, windowHeight);

  ball = new Sprite();
  ball.diameter = 50;
  tankRed = new Tank(200, 200, windowWidth * 0.04, color(255, 0, 0));
}

function draw() {
  background("gray");
  tankRed.display();
}

function keyPressed() {
  print(keyCode);
  if (keyCode == 65) {
    print("a");
    tankRed.turnLeft();
  }
  while (keyCode == "d") {
    print("d");
    tankRed.turnRight();
  }
  while (keyCode == "w") {
    print("w");
    tankRed.moveForward();
  }
  while (keyCode == "s") {
    print("s");
    tankRed.moveBack();
  }
}
