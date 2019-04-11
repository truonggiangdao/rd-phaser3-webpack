import Phaser from 'phaser';
import { WIDTH, HEIGHT } from '../config';
import { handleBrowserResize, getRandomInt, destroyOnOut } from '../helpers';
import { SPRITE_NAMES, getTextureIndex } from '../sprites';

const RAW_ASSET_URLS = {
  BG: 'assets/background.png',
  AUDIO: 'assets/GodGaveMeYou_BlakeShelton.mp3',
  ATLAS_IMG: 'assets/atlas.png',
  ATLAS_DATA: 'assets/atlas.json',
};

const KEY = {
  ATLAS: 'atlas',
  BACKGROUND_IMG: 'bgImg',
  BACKGROUND_MUSIC: 'bgMusic',
  TILE_SHARP: 'tileSharp',
};

const TILE_POOL = [
  null,
  null,
  null,
  null,
];

const POOL_COORS = [
  { x: (WIDTH * 0 / 4) + (WIDTH / 4 / 2), y: 0 },
  { x: (WIDTH * 1 / 4) + (WIDTH / 4 / 2), y: 0 },
  { x: (WIDTH * 2 / 4) + (WIDTH / 4 / 2), y: 0 },
  { x: (WIDTH * 3 / 4) + (WIDTH / 4 / 2), y: 0 },
];

const MOVING_SPEED = 10;

export class GameScene extends Phaser.Scene {

  preload() {
    this.load.image(KEY.BACKGROUND_IMG, RAW_ASSET_URLS.BG);
    this.load.atlas(KEY.ATLAS, RAW_ASSET_URLS.ATLAS_IMG, RAW_ASSET_URLS.ATLAS_DATA);
    this.load.audio(KEY.BACKGROUND_MUSIC, [RAW_ASSET_URLS.AUDIO]);
  }

  create() {
    window.scene = this;
    window.canvas = document.querySelector('canvas');
    handleBrowserResize();
    this.addBgImg();
    this.addLines();
    this.addMusic();
    this.loadTides();

    this.input.on('gameobjectup', (pointer, gameObject) => {
      gameObject.emit('clicked', gameObject);
    }, this);
  }

  update() {
    TILE_POOL.forEach((tile, index) => {
      if (tile) {
        tile.y += MOVING_SPEED;
        if (tile.y > HEIGHT + tile.displayHeight) {
          TILE_POOL[index] = null;
        }
      }
    });
  }

  addBgImg() {
    const bgImg = this.add.image(WIDTH / 2, HEIGHT / 2, KEY.BACKGROUND_IMG);
    bgImg.width = WIDTH;
    bgImg.height = HEIGHT;
  }

  addLines() {
    const graphics = this.add.graphics({
      x: 0,
      y: 0,
      lineStyle: { width: (WIDTH / 500), color: 0xffffff, alpha: 1 },
      fillStyle: { color: 0xffffff, alpha: 1 },
      add: true
    });
    for (let index = 1; index <= 3; index++) {
      graphics.lineBetween((WIDTH * index / 4), 0, (WIDTH * index / 4), HEIGHT);
    }
  }

  addMusic() {
    const music = this.sound.add(KEY.BACKGROUND_MUSIC);
    music.play();
  }

  loadTides() {
    setInterval(() => {
      const availablePool = this.getRandomAvailablePool();
      if (availablePool !== -1) {
        this.addTileToPool(availablePool);
      }
    }, 2000);
  }

  getRandomAvailablePool() {
    const avPools = TILE_POOL.map((s, i) => ({i, status: !!s})).filter(p => !p.status).map(p => p.i);
    if (!avPools.length) {
      return -1;
    }
    const randomIndex = getRandomInt(0, (avPools.length - 1));
    return avPools[randomIndex];
  }

  addTileToPool(poolIndex) {
    const atlasTexture = this.textures.get(KEY.ATLAS);
    const frames = atlasTexture.getFrameNames();
    TILE_POOL[poolIndex] = this.add.sprite(
      POOL_COORS[poolIndex].x,
      POOL_COORS[poolIndex].y,
      KEY.ATLAS,
      frames[getTextureIndex(frames, SPRITE_NAMES.TILE_SHARP)]
    ).setOrigin(0.5).setInteractive();
    TILE_POOL[poolIndex].inputEnabled = true;
    const tileRatio = TILE_POOL[poolIndex].width / TILE_POOL[poolIndex].height;
    TILE_POOL[poolIndex].displayWidth = TILE_POOL[poolIndex].width * 0.5;
    TILE_POOL[poolIndex].displayHeight = TILE_POOL[poolIndex].displayWidth / tileRatio;
    destroyOnOut(TILE_POOL[poolIndex]);
    // TILE_POOL[poolIndex].on('clicked', (pointer, gameObject) => {
    //   console.log(pointer);
    //   pointer.destroy();
    // }, this);
  }


};
