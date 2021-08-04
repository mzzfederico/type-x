import System from '../System';
import Collider from '../Components/Collider.Component';
import Movement from '../Components/Movement.Component';
import Position from '../Components/Position.Component';
import Entity from '../Entity';
import Relationship from '../Components/Relationship.Component';
import PositionOffset from '../Components/PositionOffset.Component';

export default class MovementSystem extends System {
  update(timeframe: number = 0, entities: Entity[]): void {
    entities
      .forEach((entity: Entity): void => {
        const position = entity.getComponent(Position) as Position;
        const relationship = entity.getComponent(Relationship) as Relationship;

        if (relationship) {
          const parentEntity = entities.find(entity => entity.id === relationship.parent);
          const parentPosition = parentEntity.getComponent(Position) as Position;
          const positionOffset = entity.getComponent(PositionOffset) as PositionOffset;

          if (positionOffset) {
            position.setPosition(parentPosition.x + positionOffset.x, parentPosition.y + positionOffset.y);
            return;
          }

          position.setPosition(parentPosition.x, parentPosition.y);
          return;
        }

        /* Entities that can't move do not need to update their speed or collider */
        const movement = entity.getComponent(Movement) as Movement;
        if (!movement) return;

        const { x, y } = movement;

        /* Signal the stop of a moving entity */
        if (x === 0 && y === 0) {
          if (movement.onStop) movement.onStop();
          return;
        }

        const collider = entity.getComponent(Collider) as Collider;

        const { x: currentX, y: currentY } = position;
        position.transformation(x * timeframe, y * timeframe);

        if (collider) {
          collider.saveSafePosition(currentX, currentY);
        }

        movement.multiplySpeed(0.25, 0.25);
        movement.onStart({ x, y });
      });
  }
}
