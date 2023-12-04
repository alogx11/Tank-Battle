let redTank, blueTank;
let grid;
const staticGrid = false;
// sound files for effects
let bulletHit, tankHit;
function setup() {
  bulletHit = loadSound("./assets/bulletHit.mp3");
  tankHit = loadSound("./assets/tankDestroy.mp3");

  grid = new GameOfLife(25); // paramter is size of a cell

  createCanvas(grid.columns * grid.cellSize, grid.rows * grid.cellSize);

  // tank param (x, y, width, color, speed)
  redTank = new Tank(
    windowWidth / 4, // start x
    windowHeight / 2, // start y
    windowWidth * 0.04, // width
    color(255, 0, 0), // color
    6, // speed
    0 // start angle
  );

  blueTank = new Tank(
    (windowWidth / 4) * 3, // start x
    windowHeight / 2, // start y
    windowWidth * 0.04, // width
    color("#00bfff"), // color
    6, // speed
    180 // start angle
  );
  grid.createGrid();
  frameRate(30);
}

function draw() {
  grid.displayGrid();
  if (!staticGrid && frameCount % 5 == 0) {
    grid.computeGeneration();
  }

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
      if (redTank.isColliding(blueTank) || redTank.isOutOfBounds()) {
        redTank.moveBack(); // Reverse the movement if it causes a collision
      }
    }
    if (keyIsDown(83) || keyIsDown(115)) {
      redTank.moveBack();
      if (redTank.isColliding(blueTank) || redTank.isOutOfBounds()) {
        redTank.moveForward(); // Reverse the movement if it causes a collision
      }
    }
  }

  // Handle controls for the blue tank (Arrow keys)
  if (blueTank.alive) {
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
      if (blueTank.isColliding(redTank) || blueTank.isOutOfBounds()) {
        blueTank.moveBack(); // Reverse the movement if it causes a collision
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      blueTank.moveBack();
      if (blueTank.isColliding(redTank) || blueTank.isOutOfBounds()) {
        blueTank.moveForward(); // Reverse the movement if it causes a collision
      }
    }
  }

  // display bullets and update bullet collisions
  for (let i = 0; i < redTank.bullets.length; i++) {
    redTank.bullets[i].display();
    redTank.bullets[i].update();
    // check if a bullet hits grid
    if (
      redTank.bullets[i].isHittingGrid(
        redTank.bullets[i].pos.x,
        redTank.bullets[i].pos.y,
        grid.cellSize
      )
    ) {
      bulletHit.play();
      redTank.bullets.splice(i, 1);
    } else if (blueTank.isHit(redTank.bullets[i]) && blueTank.alive) {
      // check if a bullet hits a tank
      blueTank.alive = false;
      tankHit.play();
      redTank.bullets.splice(i, 1);
    } else if (redTank.isHit(redTank.bullets[i]) && redTank.alive) {
      tankHit.play();
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
      // check if a bullet hits the grid
      blueTank.bullets[i].isHittingGrid(
        blueTank.bullets[i].pos.x,
        blueTank.bullets[i].pos.y,
        grid.cellSize
      )
    ) {
      bulletHit.play();
      blueTank.bullets.splice(i, 1);
    } else if (blueTank.isHit(blueTank.bullets[i]) && blueTank.alive) {
      // check if a bullet hits a tank
      tankHit.play();
      blueTank.alive = false;
      blueTank.bullets.splice(i, 1);
    } else if (redTank.isHit(blueTank.bullets[i]) && redTank.alive) {
      tankHit.play();
      redTank.alive = false;
      blueTank.bullets.splice(i, 1);
    } else if (
      // check if bullet goes off the map
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
}

function keyPressed() {
  if (redTank.alive && (key === "e" || key === "E")) {
    redTank.bullets.push(redTank.shootBullet());
  }
  if (blueTank.alive && key === "/") {
    blueTank.bullets.push(blueTank.shootBullet());
  }
  if (key == " ") {
    // pressing space resets the grid
    grid.createGrid();
  }
  if (key == "r" || key == "R") {
    // pressing r resets the tanks
    redTank.alive = true;
    redTank.pos.x = windowWidth / 4;
    redTank.pos.y = windowHeight / 2;
    redTank.angle = 0;
    blueTank.alive = true;
    blueTank.pos.x = (windowWidth / 4) * 3;
    blueTank.pos.y = windowHeight / 2;
    blueTank.angle = 180;
  }
}
