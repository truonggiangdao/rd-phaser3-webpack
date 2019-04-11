import Phaser from 'phaser';

export class ResponsiveGame extends Phaser.Scene {
  preload() {
  }

  create() {
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    console.log(Phaser);
    this.events.on('resize', () => this.resize(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', () => this.resize(window.innerWidth, window.innerHeight), false);
  }

  resize (width, height) {
    if (width === undefined) { width = this.sys.game.config.width; }
    if (height === undefined) { height = this.sys.game.config.height; }

    this.cameras.resize(width, height);
  }

  update() {
  }
}