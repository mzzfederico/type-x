import Scene from '__Core/Scene';
import System from '__Core/System';
import Collision from '__Systems/Collision.System';
import Input from '__Systems/Input.System';
import Movement from '__Systems/Movement.System';
import Animation from '__Systems/Animation.System';
import Canvas from '__Systems/Canvas.System';
import PNGSpriteRender from '__Systems/PNGSpriteRender.System';

const ZOOM: number = parseInt(process.env.ZOOM) || 2;
const TILE_SIZE: number = parseInt(process.env.TILE_SIZE) || 16;
const ROOM_WIDTH: number = parseInt(process.env.ROOM_WIDTH) || 20;
const ROOM_HEIGHT: number = parseInt(process.env.ROOM_HEIGHT) || 12;

export default class GameLoop {
  isRunning: boolean = false;
  lastRender: number;

  currentScene: Scene;

  coreSystems: System[];

  constructor(initialScene: Scene) {
    this.coreSystems = [
      new Canvas(ROOM_WIDTH * TILE_SIZE, ROOM_HEIGHT * TILE_SIZE),
      new Input(),
      new Movement(),
      new Collision(),
      new Animation(),
      new PNGSpriteRender(),
    ];

    this.lastRender = 0;
    this.changeScene(initialScene);
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
