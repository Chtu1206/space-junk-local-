
class Game {
  static JUNK_CATCH_TIME_MS = 500;

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
    Inputs.handleKeyDown(delta, this.magpie);

    this.magpie.update(delta);
    this.mothership.update(delta);
    this.level.update(delta);

    let caught = this.resolveBeam(delta);

    if (caught) {
      this.level.junk = this.level.junk.filter(
        j => j !== caught
      );

      this.score += 100;
    }
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

  draw() {
    this.mothership.draw();
    this.magpie.draw();

    this.level.draw(this.score, this.lives);

    if (this.level.junk.length === 0) {
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

