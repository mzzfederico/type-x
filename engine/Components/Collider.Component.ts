import Component from '../Component';
import Entity from '../Entity';
import { Coordinate2d } from '../Types/Coordinate2d';

export default class Collider extends Component {
  width: number;

  height: number;

  isStatic: boolean;

  isRigid: boolean;

  onCollision: Function;

  safePosition: Coordinate2d;

  parentEntity: Entity;

  constructor({
    width, height, isStatic = false, isRigid = false, onCollision = (target) => { },
  }) {
    super();

    this.width = width;
    this.height = height;
    this.isStatic = isStatic;
    this.isRigid = isRigid;
    this.onCollision = onCollision;
  }

  saveSafePosition(x: number, y: number): void {
    this.safePosition = { x, y };
  }

  getSafePosition(): Coordinate2d {
    return this.safePosition;
  }
}
