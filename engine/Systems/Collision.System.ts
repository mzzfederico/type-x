import System from '../System';
import Collider from '../Components/Collider.Component';
import Position from '../Components/Position.Component';
import Entity from '../Entity';
import getVectorToPosition, { getUnitVector } from '../Utils/getVectorToPosition';

export default class Collision extends System {
  update(time: number, entities: Entity[]): void {
    this.checkCurrentCollisions(entities);
  }

  checkCurrentCollisions(entities: Entity[]): void {
    /* Check only colliders & enabled ones */
    const entitiesWithCollidors = entities.filter(
      (target: Entity) => (
        target.getComponent(Collider) && !target.isDisabled
      )
    );

    for (let i = 0; i < entitiesWithCollidors.length; i++) {
      for (let k = i + 1; k < entitiesWithCollidors.length; k++) {
        const a = entitiesWithCollidors[i];
        const b = entitiesWithCollidors[k];
        const colliderA = a.getComponent(Collider) as Collider;
        const colliderB = b.getComponent(Collider) as Collider;
        const positionA = a.getComponent(Position) as Position;
        const positionB = b.getComponent(Position) as Position;

        if (a != b) {
          if (this.checkCollision(
            a.components as CollisionCheckProps,
            b.components as CollisionCheckProps,
          )) {
            let [x, y] = getVectorToPosition(
              { x: positionA.x + (colliderA.width / 2), y: positionA.y + (colliderA.height / 2) },
              { x: positionB.x + (colliderB.width / 2), y: positionB.y + (colliderB.height / 2) },
            );

            colliderA.onCollision(b, this.$scene, [x, y]);
            colliderB.onCollision(a, this.$scene, [x * -1, y * -1]);
          }
        }
      }
    }

    entitiesWithCollidors.forEach((entity: Entity) => {
      const collider = entity.getComponent(Collider) as Collider;
      collider.skip = false;
    });
  }

  checkCollision(a: CollisionCheckProps, b: CollisionCheckProps): boolean {
    if (a.Collider.skip) return false;
    if (b.Collider.skip) return false;
    if (a.Position.x < (b.Position.x + b.Collider.width)
      && (a.Position.x + a.Collider.width) > b.Position.x
      && a.Position.y < (b.Position.y + b.Collider.height)
      && (a.Position.y + a.Collider.height) > b.Position.y) {
      return true;
    }
    return false;
  }
}

type CollisionCheckProps = {
  Position: Position;
  Collider: Collider;
}
