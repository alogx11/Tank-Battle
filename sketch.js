let redTank, blueTank;
let grid;
const staticGrid = false;
function setup() {
  grid = new GameOfLife(25); // paramter is size of a cell
  createCanvas(grid.columns * grid.cellSize, grid.rows * grid.cellSize);
  // tank param (x, y, width, color, speed)
  redTank = new Tank(
    windowWidth / 4,
    windowHeight / 2,
    windowWidth * 0.04,
    color(255, 0, 0),
    4,
    0
  );
  blueTank = new Tank(
    (windowWidth / 4) * 3,
    windowHeight / 2,
    windowWidth * 0.04,
    color(0, 0, 255),
    4,
    180
  );
  grid.createGrid();
  frameRate(30);
}

function draw() {
  grid.displayGrid();
  if (!staticGrid && frameCount % 5 == 0) {
    grid.computeGeneration();
  }
  // grid.computeGeneration();
  // Handle controls for the red tank (WASD keys)
  if (redTank.alive) {
    if (keyIsDown(65) || keyIsDown(97)) {
      redTank.turnLeft();
      if (redTank.isColliding(blueTank)) {
        redTank.turnRight(); // Reverse the rotation if it causes a collision
      }
    }
    if (keyIsDown(68) || keyIsDown(100)) {
      redTank.turnRight();
      if (redTank.isColliding(blueTank)) {
        redTank.turnLeft(); // Reverse the rotation if it causes a collision
      }
    }
    if (keyIsDown(87) || keyIsDown(119)) {
      redTank.moveForward();
      if (redTank.isColliding(blueTank)) {
        redTank.moveBack(); // Reverse the movement if it causes a collision
      }
    }
    if (keyIsDown(83) || keyIsDown(115)) {
      redTank.moveBack();
      if (redTank.isColliding(blueTank)) {
        redTank.moveForward(); // Reverse the movement if it causes a collision
      }
    }
  }
  if (blueTank.alive) {
    // Handle controls for the blue tank (Arrow keys)
    if (keyIsDown(LEFT_ARROW)) {
      blueTank.turnLeft();
      if (blueTank.isColliding(redTank)) {
        blueTank.turnRight(); // Reverse the rotation if it causes a collision
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      blueTank.turnRight();
      if (blueTank.isColliding(redTank)) {
        blueTank.turnLeft(); // Reverse the rotation if it causes a collision
      }
    }
    if (keyIsDown(UP_ARROW)) {
      blueTank.moveForward();
      if (blueTank.isColliding(redTank)) {
        blueTank.moveBack(); // Reverse the movement if it causes a collision
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      blueTank.moveBack();
      if (blueTank.isColliding(redTank)) {
        blueTank.moveForward(); // Reverse the movement if it causes a collision
      }
    }
  }

  for (let i = 0; i < redTank.bullets.length; i++) {
    redTank.bullets[i].display();
    redTank.bullets[i].update();
    // check if a bullet hits a tank
    if (
      redTank.bullets[i].isHittingGrid(
        redTank.bullets[i].pos.x,
        redTank.bullets[i].pos.y,
        grid.cellSize
      )
    ) {
      redTank.bullets.splice(i, 1);
    } else if (blueTank.isHit(redTank.bullets[i]) && blueTank.alive) {
      blueTank.alive = false;
      redTank.bullets.splice(i, 1);
    } else if (redTank.isHit(redTank.bullets[i]) && redTank.alive) {
      redTank.alive = false;
      redTank.bullets.splice(i, 1);
    }
    // delete bullets that go off screen
    else if (
      redTank.bullets[i].pos.x < 0 ||
      redTank.bullets[i].pos.x > width ||
      redTank.bullets[i].pos.y < 0 ||
      redTank.bullets[i].pos.y > height
    ) {
      redTank.bullets.splice(i, 1);
    }
  }
  for (let i = 0; i < blueTank.bullets.length; i++) {
    blueTank.bullets[i].display();
    blueTank.bullets[i].update();
    if (
      blueTank.bullets[i].isHittingGrid(
        blueTank.bullets[i].pos.x,
        blueTank.bullets[i].pos.y,
        grid.cellSize
      )
    ) {
      blueTank.bullets.splice(i, 1);
    } else if (blueTank.isHit(blueTank.bullets[i]) && blueTank.alive) {
      blueTank.alive = false;
      blueTank.bullets.splice(i, 1);
    } else if (redTank.isHit(blueTank.bullets[i]) && redTank.alive) {
      redTank.alive = false;
      blueTank.bullets.splice(i, 1);
    } else if (
      blueTank.bullets[i].pos.x < 0 ||
      blueTank.bullets[i].pos.x > width ||
      blueTank.bullets[i].pos.y < 0 ||
      blueTank.bullets[i].pos.y > height
    ) {
      blueTank.bullets.splice(i, 1);
    }
  }
  if (redTank.alive) {
    redTank.display();
  }
  if (blueTank.alive) {
    blueTank.display();
  }
  // redTank.display();
  // blueTank.display();
}

function keyPressed() {
  if (redTank.alive && (key === "e" || key === "E")) {
    redTank.bullets.push(redTank.shootBullet());
  }
  if (blueTank.alive && key === "/") {
    blueTank.bullets.push(blueTank.shootBullet());
  }
  if (key == " ") {
    grid.createGrid();
  }
}
