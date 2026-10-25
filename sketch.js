
let game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
}

function draw() {
  background(15, 15, 30);

  let delta = min(deltaTime, 50);

  game.update(delta);
  game.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
