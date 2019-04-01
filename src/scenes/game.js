import Phaser from "phaser";
import { WIDTH, HEIGHT } from "../config";
import { getBrowserSize } from "../helpers";
import bgImg from "../assets/background.png";

export class GameScene extends Phaser.Scene {

  preload() {
    this.load.image("background", bgImg);
  }

  create() {
    window.scene = this;
    const bgImg = this.add.image(WIDTH / 2, HEIGHT / 2, "background");
    bgImg.width = WIDTH;
    bgImg.height = HEIGHT;
    window.canvas = document.querySelector("canvas");
    this.onResize(window.canvas);
    window.addEventListener("resize", () => this.onResize(window.canvas), false);
  }

  onResize(el) {
    const { width } = getBrowserSize();
    el.style.width = width + 'px';
    el.style.height = Math.ceil(width * 16 / 9) + 'px';
  }
};
