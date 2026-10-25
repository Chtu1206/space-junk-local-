
class Junk {
  static DIAMETER = 16;

  constructor(x, y) {
    this.physics = new Physics(x, y);
    this.physics.dx = random(-20, 20);
    this.physics.dy = random(-20, 20);
    this.beamTime = 0;
  }

  update(delta) {
    this.physics.move(delta, { constrain: true });
  }

  draw() {
    push();
    translate(this.physics.x, this.physics.y);
    Junk.drawJunk();
    pop();
  }

  static drawJunk() {
    push();
    noStroke();
    fill("#a0936a");
    circle(0, 0, Junk.DIAMETER);
    pop();
  }
}
