import Entity from '__Core/Entity';
import System from '__Core/System';
import GameLoop from './GameLoop';

export default class Scene {
  entities: Entity[];
  systems: System[];
  gameLoop: GameLoop;

  constructor(entities: Entity[] = [], systems: System[] = []) {
    this.entities = entities;
    this.systems = systems;
    this.gameLoop;
    return this;
  }

  registerGameLoop = (parentGl: GameLoop): void => {
    this.gameLoop = parentGl;
  }

  addEntity = (newEntity: Entity): void => {
    /* Adds method to get entities from scene to entities */
    newEntity.getEntity = (findFn) => this.entities.find(findFn);
    this.entities.push(newEntity);

    if (!this.gameLoop.isRunning) return;

    [...this.gameLoop.coreSystems, ...this.systems].forEach((system: System) => {
      system.handleNewEntity(newEntity);
    });
  }

  removeEntity = (EntityId: string): void => {

    const assertEntity = (entity) => entity.id === EntityId;
    const entity = this.entities.find(assertEntity);
    if (!entity) return;

    /* Disable method to get entities */
    entity.getEntity = (findFn) => [].find(findFn);

    [...this.gameLoop.coreSystems, ...this.systems].forEach((system: System) => {
      if (entity) system.cleanup(entity);
    });

    this.entities = this.entities.filter((e) => !assertEntity(e));
  }
}
