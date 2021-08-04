import System from '../System';
import Collider from '../Components/Collider.Component';
import Position from '../Components/Position.Component';
import Entity from '../Entity';
import getVectorToPosition, { getUnitVector } from '../Utils/getVectorToPosition';
import ColliderGroup from '../Components/ColliderGroup.Component';
import { Coordinate2d } from '../Types/Coordinate2d';

export default class Collision extends System {
  colliders: Array<ColliderRecord> = [];

  update(time: number, entities: Entity[]): void {
    this.colliders = [];
    entities.forEach((entity: Entity) => this.registerCollider(entity));
    this.checkCurrentCollisions();
  }

  addToColliders(record: ColliderRecord): void {
    this.colliders = [...this.colliders, record];
  }

  registerCollider(entity): void {
    if (entity.isDisabled) return;

    const position = entity.getComponent(Position) as Position;
    const collider = entity.getComponent(Collider) as Collider;
    const colliderGroup = entity.getComponent(ColliderGroup) as ColliderGroup;

    if (collider) {
      collider.currentPosition = { x: position.x, y: position.y };
      this.addToColliders({ entity, collider, offset: { x: 0, y: 0 } });
    }

    /* Handles collider groups, which are offset to the main entity */
    if (colliderGroup) {
      colliderGroup.colliders.forEach(({ component, offset, isEnabled }) => {
        if (isEnabled) this.addToColliders({ entity, collider: component, offset });
      });
    }
  }

  checkCurrentCollisions(): void {
    for (let i = 0; i < this.colliders.length; i++) {
      for (let k = i + 1; k < this.colliders.length; k++) {
        const { entity: a, collider: colliderA } = this.colliders[i];
        const { entity: b, collider: colliderB } = this.colliders[k];

        if (a != b) {
          if (this.checkCollision(colliderA, colliderB)) {
            let [x, y] = getVectorToPosition(
              { x: colliderA.currentPosition.x + (colliderA.width / 2), y: colliderA.currentPosition.y + (colliderA.height / 2) },
              { x: colliderB.currentPosition.x + (colliderB.width / 2), y: colliderB.currentPosition.y + (colliderB.height / 2) },
            );

            if (colliderA.onCollision)
              colliderA.onCollision(b, colliderB.tag, { x, y }, this.$scene);

            if (colliderB.onCollision)
              colliderB.onCollision(a, colliderA.tag, { x: x * - 1, y: y * -1 }, this.$scene);
          }
        }
      }
    }

    /* Re-enable skipped colliders && update position */
    this.colliders.forEach(({ collider, entity, offset }) => {
      const pos = entity.getComponent(Position) as Position;
      collider.skip = false;
      collider.currentPosition = { x: pos.x + offset.x, y: pos.y + offset.y };
    });
  }

  checkCollision(a: Collider, b: Collider): boolean {
    if (a.skip) return false;
    if (b.skip) return false;

    if (a.currentPosition.x < (b.currentPosition.x + b.width)
      && (a.currentPosition.x + a.width) > b.currentPosition.x
      && a.currentPosition.y < (b.currentPosition.y + b.height)
      && (a.currentPosition.y + a.height) > b.currentPosition.y) {
      return true;
    }
    return false;
  }

  end() {
    this.colliders = [];
  }
}

type ColliderRecord = { entity: Entity, collider: Collider, offset: Coordinate2d };