import System from '../System';
import Collider from '../Components/Collider.Component';
import Movement from '../Components/Movement.Component';
import Position from '../Components/Position.Component';
import Entity from '../Entity';

export default class MovementSystem extends System {
  update(timeframe: number = 0, entities: Entity[]): void {
    entities
      .filter((entity: Entity): boolean => (
        !entity.isDisabled
      ))
      .filter((entity: Entity): boolean => (
        !!entity.getComponent(Position)
        && !!entity.getComponent(Movement)
        && !!entity.getComponent(Collider)
      ))
      .forEach((entity: Entity): void => {
        const position = entity.getComponent(Position) as Position;
        const movement = entity.getComponent(Movement) as Movement;
        const collider = entity.getComponent(Collider) as Collider;

        const { x, y } = movement;

        if (x === 0 && y === 0) {
          movement.onStop();
          return;
        }

        const { x: currentX, y: currentY } = position;
        collider.saveSafePosition(currentX, currentY);
        position.transformation(x * timeframe, y * timeframe);

        /* Frizione */
        movement.multiplySpeed(0.25, 0.25);

        movement.onStart({ x, y });
      });
  }
}
