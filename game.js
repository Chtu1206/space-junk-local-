
class Game {
  static JUNK_CATCH_TIME_MS = 500;
static JUNK_DROPOFF_TIME_MS = 1000;
static SCORE_DROPOFF = 100;


  constructor() {
    this.magpie = new Magpie(
      width / 2 || 400,
      height / 2 || 300
    );

    this.mothership = new Mothership(100, 100);
    this.level = new Level();
    this.score = 0;
    this.lives = 3;
  }

  update(delta) {
  // Handle keyboard controls
  Inputs.handleKeyDown(delta, this.magpie);

  // Move the ships
  this.magpie.update(delta);
  this.mothership.update(delta);

  // Catch junk only if we aren't carrying any
  if (!this.magpie.capturedJunk) {
    const caught = this.resolveBeam(delta);

    if (caught) {
      this.level.junk = this.level.junk.filter(
        j => j !== caught
      );

      this.magpie.captureJunk(caught);
    }
  }

  // Deliver junk to the Mothership
  if (this.resolveDropoff(delta)) {
    this.magpie.capturedJunk = null;

    this.updateScore("dropoff");
  }

  // Check whether all junk has been delivered
  const finished =
    this.level.junk.length === 0 &&
    !this.magpie.capturedJunk;

  // Update timer and remaining junk
  this.level.update(delta, finished);
}

  resolveBeam(delta) {
    const caught = [];

    for (const junk of this.level.junk) {
      if (this.magpie.beamContains(junk.physics)) {
        junk.beamTime += delta;
        caught.push(junk);
      } else {
        junk.beamTime = Math.max(
          0,
          junk.beamTime - delta
        );
      }
    }

    if (caught.length > 0) {
      let best = caught[0];
      for (const junk of caught) {
        if (junk.beamTime > best.beamTime) {
          best = junk;
        }
      }

      if (best.beamTime > Game.JUNK_CATCH_TIME_MS) {
        return best;
      }
    }
    return null;
  }
resolveDropoff(delta) {
  const junk = this.magpie.capturedJunk;

  if (!junk) {
    return false;
  }

  const distance = dist(
    junk.physics.x,
    junk.physics.y,
    this.mothership.physics.x,
    this.mothership.physics.y
  );

  if (distance <= Mothership.PICKUP_DIAMETER / 2) {
    junk.dropoffTime += delta;
  } else {
    junk.dropoffTime = Math.max(
      0,
      junk.dropoffTime - delta
    );
  }

  return junk.dropoffTime > Game.JUNK_DROPOFF_TIME_MS;
}
  draw() {
    this.mothership.draw();
    this.magpie.draw();

    this.level.draw(this.score, this.lives);

    if (
  this.level.junk.length === 0 &&
  !this.magpie.capturedJunk
) {
      push();
      fill("#ffd342");
      textSize(48);
      textAlign(CENTER, CENTER);
      text(
        "ALL CLEAR!",
        width / 2,
        height / 2
      );

      pop();
    }
  }
}

