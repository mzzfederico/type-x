import Scene from './Scene';
import System from './System';
import Collision from './Systems/Collision.System';
import Input from './Systems/Input.System';
import Movement from './Systems/Movement.System';
import Animation from './Systems/Animation.System';

export default class GameLoop {
  lastRender: number;

  scenes: Scene[];

  currentScene: Scene;

  constructor(scenes: Scene[] = [], initialScene: Scene = scenes[0]) {
    this.lastRender = 0;
    this.scenes = scenes;
    this.currentScene = initialScene;
  }

  nextFrame = (progress: number = 0): void => {
    const systemsStack = [
      new Input(),
      new Movement(),
      new Animation(),
      new Collision(),
      ...this.currentScene.systems
    ];

    systemsStack.forEach((system: System): void => system.update(progress, this.currentScene.entities));
    systemsStack.forEach((system: System): void => system.draw(progress, this.currentScene.entities));
  }

  end = () => {
    this.currentScene.systems.forEach((system: System) => {
      system.end(this.currentScene.entities);
    });
  }

  loop = (timestamp: number = 0): void => {
    const progress: number = timestamp - this.lastRender;

    this.nextFrame(progress);

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop);
  }

  start = (): void => {
    this.currentScene.systems.forEach((system: System) => {
      system.start(this.currentScene.entities);
    });

    window.requestAnimationFrame(this.loop);
  }
}
