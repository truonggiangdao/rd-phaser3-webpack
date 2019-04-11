import Phaser from 'phaser';
import { WIDTH, HEIGHT } from './config';
import { GameScene } from './scenes/game';
import { ResponsiveGame } from './scenes/responsiveGame';
import { handleOrientationChange } from './helpers';

handleOrientationChange();

window.game = new Phaser.Game({
  type: Phaser.CANVAS,
  parent: 'phaser-example',
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  audio: {
    disableWebAudio: true
  },
  scene: ResponsiveGame
});
window.canvas = null;
window.scene = null;
