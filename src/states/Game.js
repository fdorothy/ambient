/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000'
  }
  preload () {
    game.load.audio('cricket', 'assets/cricket.mp3');
    game.load.audio('wave1', 'assets/wave1.ogg');
  }

  create () {
    this.seed1 = Math.random();
    this.seed2 = Math.random();
    this.seed3 = Math.random();
    this.t = 0.0;
    this.cricket = game.add.audio('cricket');
    this.cricket.loopFull();
    this.wave1 = game.add.audio('wave1');
    this.wave1.loopFull();
  }

  graphNoise(seed, color) {
    noise.seed(seed);
    var ctx = game.context;
    ctx.strokeStyle = color;
    ctx.beginPath();
    var pts = [];
    for (var i=0; i<100; i++) {
      var v = this.sample(this.t + i / 10.0);
      pts.push(v);
    }
    ctx.moveTo(0, pts[0] * this.game.height / 2.0 + this.game.height / 2.0);
    for (var i=1; i<100; i++) {
      ctx.lineTo(i * 32.0 / 10.0, pts[i] * this.game.height / 2.0 + this.game.height / 2.0);
    }
    ctx.stroke();
  }

  sample(t) {
    return noise.simplex2(t / 30.0, 0.0);
  }

  render () {
    this.graphNoise(this.seed1, 'rgb(0,255,255)');
    this.graphNoise(this.seed2, 'rgb(255,0,255)');
  }

  update() {
		var dt = this.game.time.physicsElapsed;

    noise.seed(this.seed1);
    var v = this.sample(this.t);
    this.cricket.volume = (v + 1.0) / 2.0;

    noise.seed(this.seed2);
    var v = this.sample(this.t);
    this.wave1.volume = (v + 1.0) / 2.0;

    this.t += dt;
  }
}
