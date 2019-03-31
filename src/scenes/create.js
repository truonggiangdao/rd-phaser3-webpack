import { WIDTH, HEIGHT } from "../config";
import { getBrowserSize } from "../helpers";

const onResize = (el) => {
  const { width } = getBrowserSize();
  el.style.width = width + 'px';
  el.style.height = Math.ceil(width * 16 / 9) + 'px';
};

export function createScene() {
  const bgImg = this.add.image(WIDTH / 2, HEIGHT / 2, "background");
  bgImg.width = WIDTH;
  bgImg.height = HEIGHT;
  window.canvas = document.querySelector("canvas");
  onResize(window.canvas);
  window.addEventListener("resize", () => onResize(window.canvas), false);
}