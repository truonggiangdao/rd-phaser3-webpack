import Phaser from "phaser";
import { WIDTH, HEIGHT } from "./config";
import { GameScene } from "./scenes/game";

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: WIDTH,
  height: HEIGHT,
  audio: {
    disableWebAudio: true
  },
  scene: GameScene
});
window.canvas = null;
window.scene = null;
