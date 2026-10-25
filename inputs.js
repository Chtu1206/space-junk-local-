
class Inputs {
  static THRUST = 200;
  static REVERSE_THRUST = 100;
  static TURN_RATE = 3;

  static handleKeyDown(delta, magpie) {
    if (!magpie || !magpie.physics) return;

    if (keyIsDown(87)) {
      magpie.physics.thrust(Inputs.THRUST, delta);
    }

    if (keyIsDown(83)) {
      magpie.physics.thrust(-Inputs.REVERSE_THRUST, delta);
    }

    if (keyIsDown(65)) {
      magpie.physics.rotate(-Inputs.TURN_RATE, delta);
    }

    if (keyIsDown(68)) {
      magpie.physics.rotate(Inputs.TURN_RATE, delta);
    }

    magpie.enableBeam(keyIsDown(32));
  }
}
