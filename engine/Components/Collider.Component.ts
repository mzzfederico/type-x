import Component from '../Component';
import Entity from '../Entity';
import { Coordinate2d } from '../Types/Coordinate2d';

export default class Collider extends Component {
  skip: boolean;
  width: number;
  height: number;
  isRigid: boolean;
  onCollision: Function;
  hasWeight?: number;
  safePosition: Coordinate2d;
  parentEntity: Entity;

  constructor({
    initialPosition = { x: 0, y: 0 },
    width, height,
    onCollision = (target) => { },
    hasWeight = false,
    isRigid = false
  }) {
    super();

    this.safePosition = initialPosition;
    this.width = width;
    this.height = height;
    this.isRigid = isRigid;
    this.onCollision = onCollision;
    this.skip = false;
  }

  saveSafePosition(x: number, y: number): void {
    this.safePosition = { x, y };
  }

  getSafePosition(): Coordinate2d {
    return this.safePosition;
  }
}
