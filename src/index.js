import Phaser from "phaser";
import { preloadScene } from "./scenes/preload";
import { createScene } from "./scenes/create";
import { WIDTH, HEIGHT } from "./config";

window.game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: WIDTH,
  height: HEIGHT,
  scene: {
    preload: preloadScene,
    create: createScene
  }
});
window.canvas = null;
