
class Magpie {
  static DOME_WIDTH = 24;
  static DOME_HEIGHT = 30;
  static PLATFORM_WIDTH = 30;
  static PLATFORM_HEIGHT = 6;
  static WINDOW_WIDTH = 8;
  static WINDOW_HEIGHT = 10;
  static BEAM_WIDTH = 80;
  static BEAM_HEIGHT = 160;

  constructor(x, y) {
    this.physics = new Physics(x, y);
    this.beamActive = false;
    this.capturedJunk = null;
  }

  enableBeam(active) {
    if (!active || !this.capturedJunk) {
      this.beamActive = active;
    }
  }

  beamContains(point) {
    if (!this.beamActive) return false;

    const dx = point.x - this.physics.x;
    const dy = point.y - this.physics.y;
    const angle = this.physics.rotation;

    const localX =
      dx * cos(angle) + dy * sin(angle);

    const localY =
      -dx * sin(angle) + dy * cos(angle);

    return (
      localY >= 0 &&
      localY <= Magpie.BEAM_HEIGHT &&
      abs(localX) <=
        (Magpie.BEAM_WIDTH / 2) *
        (localY / Magpie.BEAM_HEIGHT)
    );
  }

  update(delta) {
    this.physics.move(delta, { constrain: true });
  }

  draw() {
    push();

    translate(this.physics.x, this.physics.y);

    Magpie.drawMagpie({
      rotation: this.physics.rotation,
      beam: this.beamActive
    });

    pop();
  }

  static drawMagpie({ rotation, beam }) {
    push();

    rotate(rotation);

    if (beam) {
      noStroke();
      fill("#f5f37040");

      const halfWidth = Magpie.BEAM_WIDTH / 2;

      triangle(
        0, 0,
        halfWidth, Magpie.BEAM_HEIGHT,
        -halfWidth, Magpie.BEAM_HEIGHT
      );
    }

    noStroke();
    rectMode(CENTER);

    fill("#525d80");

    rect(
      0, 0,
      Magpie.DOME_WIDTH,
      Magpie.DOME_HEIGHT,
      8
    );

    fill("#959ebb");

    rect(
      0,
      Magpie.DOME_HEIGHT / 2,
      Magpie.PLATFORM_WIDTH,
      Magpie.PLATFORM_HEIGHT
    );

    Magpie.drawWindow();

    pop();
  }

  static drawWindow() {
    push();

    rectMode(CORNER);
    fill("#70eef5");

    const winX =
      Magpie.DOME_WIDTH / 2 - Magpie.WINDOW_WIDTH;

    const winY = -Magpie.WINDOW_HEIGHT;

    rect(
      winX,
      winY,
      Magpie.WINDOW_WIDTH,
      Magpie.WINDOW_HEIGHT,
      1.5
    );

    pop();
  }
}
