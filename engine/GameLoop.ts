import * as PIXI from 'pixi.js';
import { CompositeTilemap } from '@pixi/tilemap';

import Scene from '__Core/Scene';
import System from '__Core/System';
import Collision from '__Systems/Collision.System';
import Input from '__Systems/Input.System';
import Movement from '__Systems/Movement.System';
import Animation from '__Systems/Animation.System';
import SpriteRenderer from './Systems/Sprite.Pixi.System';
import TilemapRenderer from './Systems/Tilemap.Pixi.System';

import * as constants from "./Utils/defaultConstants";
import { ISpritesheetData, ISpritesheetFrameData } from 'pixi.js';

const defaultWidth = constants.ROOM_WIDTH * constants.TILE_SIZE * constants.ZOOM;
const defaultHeight = constants.ROOM_HEIGHT * constants.TILE_SIZE * constants.ZOOM;

export default class GameLoop {
  isRunning: boolean = false;
  hasLoaded: boolean = false;
  lastRender: number;
  currentScene: Scene;
  coreSystems: System[];
  pixiApp: PIXI.Application = null;

  constructor({
    initialScene,
    resources = [],
    tilemaps = [],
    width = defaultWidth,
    height = defaultHeight
  }: {
    initialScene?: Scene,
    resources: Array<{ name: string, url: string }>,
    tilemaps: Array<{ name: string, atlas: ISpritesheetData }>,
    width?: number,
    height?: number
  }) {
    this.pixiApp = new PIXI.Application({ width, height, antialias: false });

    resources.forEach(
      resource => this.pixiApp.loader.add(
        resource.name,
        resource.url
      )
    );

    this.coreSystems = [
      new Input(),
      new Movement(),
      new Collision(),
      new Animation()
    ];

    this.changeScene(initialScene);

    this.pixiApp.loader.load((loader, resources) => {
      this.pixiApp.renderer.backgroundColor = 0x323C39;
      document.getElementById("root").prepend(this.pixiApp.view);
      this.lastRender = 0;
      this.hasLoaded = true;

      this.pushSystem(new SpriteRenderer(this.pixiApp));
      this.pushSystem(new TilemapRenderer(this.pixiApp, tilemaps));
    });
  }

  changeScene = (newScene): void => {
    if (this.currentScene) this.end();
    this.currentScene = newScene;
    this.currentScene.registerGameLoop(this);
  }

  getSystems = (): System[] => [
    ...this.coreSystems,
    ...this.currentScene.systems
  ];

  pushSystem = (system: System): void => {
    this.coreSystems = [
      ...this.coreSystems,
      system
    ];

    system.registerScene(this.currentScene);
    system.start(this.currentScene.entities);
  }

  start = (): void => {
    this.getSystems().forEach((system: System): void => {
      system.registerScene(this.currentScene);
      system.start(this.currentScene.entities);
    });

    this.isRunning = true;

    window.requestAnimationFrame(this.loop);
  }

  loop = (timestamp: number = 0): void => {
    const progress: number = timestamp - this.lastRender;
    this.getSystems().forEach((system: System): void => system.update(progress, this.currentScene.entities));
    this.getSystems().forEach((system: System): void => system.draw(progress, this.currentScene.entities));

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  }

  end = () => {
    this.getSystems().forEach((system: System): void => system.end(this.currentScene.entities));
  }
}
