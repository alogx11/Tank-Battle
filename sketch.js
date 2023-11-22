let redTank, blueTank;
function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);

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
  background("white");

  // Handle controls for the red tank (WASD keys)
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
  redTank.display();
  blueTank.display();
  // for(let i = 0; i < redTank.bullets.length; i++){
  //   redTank.bullets[i].display();
  //   redTank.bullets[i].update();
  // }
  // for(let i = 0; i < blueTank.bullets.length; i++){
  //   blueTank.bullets[i].display();
  //   blueTank.bullets[i].update();
  // }

}

// function keyPressed() {
//   if (key === 'e' || key === 'E') {
//     redTank.bullets.push(redTank.shootBullet());
//   }
//   if (key === '/') {
//     blueTank.bullets.push(blueTank.shootBullet());
//   }
// }