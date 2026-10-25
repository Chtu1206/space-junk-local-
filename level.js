
class Level {
  static HUD_TEXT_SIZE = 24;
  static HUD_PAD = 20;

  static LIVES_PAD_LEFT = 30;
  static LIVES_PAD_BOTTOM = 30;
  static LIVES_GAP = 25;
  static LIVES_SCALE = 0.5;

  constructor() {
    this.time = {
      initial: 120000,
      elapsed: 0
    };

    this.junk = [];

    for (let i = 0; i < 8; i++) {
      this.junk.push(
        new Junk(
          random(100, width || 600),
          random(100, height || 400)
        )
      );
    }
  }

  timeLeft() {
    return Math.max(
      0,
      this.time.initial - this.time.elapsed
    );
  }

  update(delta) {
    this.time.elapsed += delta;

    for (const item of this.junk) {
      item.update(delta);
    }
  }

  draw(score, lives) {
    push();

    noStroke();
    fill("#ffd342");
    textSize(Level.HUD_TEXT_SIZE);
    textAlign(LEFT, TOP);

    const { minutes, seconds } =
      timeToStringParts(this.timeLeft());

    text(
      `${minutes}:${seconds}`,
      Level.HUD_PAD,
      Level.HUD_PAD
    );

    textAlign(RIGHT, TOP);

    text(
      `${score}`,
      width - Level.HUD_PAD,
      Level.HUD_PAD
    );

    for (let i = 0; i < lives - 1; i++) {
      push();

      translate(
        Level.LIVES_PAD_LEFT + i * Level.LIVES_GAP,
        height - Level.LIVES_PAD_BOTTOM
      );

      scale(Level.LIVES_SCALE);

      Magpie.drawMagpie({
        rotation: 0.2,
        beam: false
      });

      pop();
    }

    for (const item of this.junk) {
      item.draw();
    }

    pop();
  }
}
