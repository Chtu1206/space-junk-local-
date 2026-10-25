
class Physics {
  constructor(x = 0, y = 0, rotation = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.dx = 0;
    this.dy = 0;
  }

  move(delta, { constrain = false } = {}) {
    const seconds = delta / 1000;

    this.x += this.dx * seconds;
    this.y += this.dy * seconds;

    if (constrain) {
      while (this.x < 0) this.x += width;
      while (this.y < 0) this.y += height;
      while (this.x >= width) this.x -= width;
      while (this.y >= height) this.y -= height;
    }
  }

  rotate(rate, delta) {
    this.rotation += rate * (delta / 1000);
  }

  thrust(accel, delta) {
    const amt = accel * (delta / 1000);

    this.dx += Math.sin(this.rotation) * amt;
    this.dy -= Math.cos(this.rotation) * amt;
  }
}
