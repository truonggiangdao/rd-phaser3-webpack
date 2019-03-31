import Phaser from "phaser";
import { WIDTH, HEIGHT } from "../config";

export default class extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, WIDTH / 2, HEIGHT / 2, config.key);
    this.scene = config.scene;
    this.scene.add.existing(this);
  }
}