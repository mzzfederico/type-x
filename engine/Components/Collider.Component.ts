import Component from '../Component';
import Entity from '../Entity';
import Scene from '../Scene';
import { Coordinate2d } from '../Types/Coordinate2d';

export default class Collider extends Component {
  isEnabled: boolean = true;
  skip: boolean;
  width: number;
  height: number;
  isRigid: boolean;
  tag: string;
  onCollision?: (target: Entity, tag: string, direction: Coordinate2d, scene: Scene,) => void;
  hasWeight?: number;
  currentPosition: Coordinate2d;
  safePosition: Coordinate2d;
  parentEntity: Entity;

  constructor({
    initialPosition = { x: 0, y: 0 },
    width, height,
    onCollision,
    isRigid = false,
    isEnabled = true,
    tag = ""
  }) {
    super();

    this.isEnabled = isEnabled;
    this.currentPosition = initialPosition;
    this.safePosition = initialPosition;
    this.width = width;
    this.height = height;
    this.isRigid = isRigid;
    this.skip = false;
    this.tag = tag;
    this.onCollision = onCollision;
  }

  saveSafePosition(x: number, y: number): void {
    this.safePosition = { x, y };
  }

  getSafePosition(): Coordinate2d {
    return this.safePosition;
  }
}
