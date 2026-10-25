
class Mothership {
  static WIDTH = 140;
  static HEIGHT = 40;
  static CORNER_RADIUS = 12;
  static NUM_PORTHOLES = 4;
  static PORTHOLE_DIAMETER = 12;
  static PICKUP_DIAMETER = 140;

  constructor(x, y) {
    this.physics = new Physics(x, y);

    this.physics.dx = 10;
    this.physics.dy = 5;
  }

  update(delta) {
    this.physics.move(delta, { constrain: true });
  }

  draw() {
    push();

    translate(this.physics.x, this.physics.y);

    Mothership.drawMothership({
      rotation: this.physics.rotation
    });

    pop();
  }

  static drawMothership({ rotation }) {
    push();

    rotate(rotation);

    noStroke();
    fill("#741160");
    rectMode(CENTER);

    rect(
      0, 0,
      Mothership.WIDTH,
      Mothership.HEIGHT,
      Mothership.CORNER_RADIUS
    );

    fill("#70eef5");

    const gap =
      Mothership.WIDTH /
      (Mothership.NUM_PORTHOLES + 1);

    for (let i = 0; i < Mothership.NUM_PORTHOLES; i++) {
      const x =
        -Mothership.WIDTH / 2 + (i + 1) * gap;

      circle(
        x,
        0,
        Mothership.PORTHOLE_DIAMETER
      );
    }

    pop();
  }
}
