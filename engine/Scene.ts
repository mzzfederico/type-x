import Entity from '__Core/Entity';
import System from '__Core/System';
import GameLoop from './GameLoop';

export default class Scene {
  target: HTMLElement;

  entities: Entity[];

  systems: System[];

  lastRender: number;

  gameLoop: GameLoop;

  constructor(targetId: string, entities: Entity[] = [], systems: System[] = []) {
    this.target = document.getElementById(targetId);
    this.entities = entities;
    this.systems = systems;
    this.gameLoop;
    return this;
  }

  registerGameLoop = (parentGl: GameLoop): void => {
    this.gameLoop = parentGl;
  }

  addEntity = (newEntity: Entity): void => {
    this.entities.push(newEntity);
    if (!this.gameLoop.isRunning) return;

    [...this.gameLoop.coreSystems, ...this.systems].forEach((system: System) => {
      system.handleNewEntity(newEntity);
    });
  }

  removeEntity = (EntityId: string): void => {
    const assertEntity = (entity) => entity.id === EntityId;
    const entity = this.entities.find(assertEntity);

    [...this.gameLoop.coreSystems, ...this.systems].forEach((system: System) => {
      if (entity) system.cleanup(entity);
    });

    this.entities = this.entities.filter((e) => !assertEntity(e));
  }

  addSystem = (newSystem: System): void => {
    newSystem.registerScene(this);
    this.systems.push(newSystem);
  }
}
