import Entity from "../Entity";
import Collider from "../Components/Collider.Component";
import Position from "../Components/Position.Component";

export default function handleRigidCollision(source: Entity, target: Entity): void {
    if ((target.getComponent(Collider) as Collider).isRigid) {
        const position = source.getComponent(Position) as Position;
        const collider = source.getComponent(Collider) as Collider;

        /* Obtain safe position and restore it */
        const { x, y } = collider.getSafePosition();
        position.setPosition(x, y);
        collider.saveSafePosition(x, y);
    }
}