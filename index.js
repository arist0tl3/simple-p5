let player = {};
let playerImage;
let gruntSound;

function preload() {
  playerImage = loadImage('./assets/pig.png');
  gruntSound = loadSound('./assets/pigGrunt.wav');
}

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);

  player.pos = createVector(100, height - 100);
  player.img = playerImage;
  player.velocity = createVector(0, 0);
  player.isGrounded = true;
  player.dir = 1;
}

function draw() {
  background(0, 0, 0);

  if (player.isJumping) {
    player.velocity.y -= 5;
    player.isJumping = false;
  } else if (player.pos.y < height - 64) {
    player.velocity.y = player.velocity.y < 0 ? player.velocity.y + 0.3 : 1;
  } else {
    player.isJumping = false;
    player.isGrounded = true;
    player.velocity.y = 0;
  }

  player.velocity.x = player.moveDir * 1.5;
  
  player.pos.add(player.velocity);

  push();
  translate(player.pos.x, player.pos.y);
  scale(player.dir, 1);
  image(player.img, 0, 0, 64, 64);
  pop();
}


function keyPressed() {
  if (player) {
    if (keyCode == LEFT_ARROW) {
      player.moveDir = -1;
      player.dir = -1;
    }

    if (keyCode == RIGHT_ARROW) {
      player.moveDir = 1;
      player.dir = 1;
    }

    if (keyCode == UP_ARROW && player.isGrounded) {
      player.isJumping = true;
      player.isGrounded = false;
      gruntSound.play();
    }
  }
}

function keyReleased() {
  if (player) {
    if (keyCode == LEFT_ARROW && player.moveDir === -1) {
      player.moveDir = 0;
    }

    if (keyCode == RIGHT_ARROW && player.moveDir === 1) {
      player.moveDir = 0;
    }
  }
}