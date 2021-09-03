import Component from '../Component';
import { Coordinate2d } from '../Types/Coordinate2d';
import { roundFloat } from '../Utils/rounding';

export default class Movement extends Component {
  x: number;
  y: number;
  onStart: Function;
  onStop: Function;
  scrolling: { position: Coordinate2d; duration: number; } = { position: { x: null, y: null }, duration: null }

  constructor({
    x, y, onStart = () => { }, onStop = () => { },
  }) {
    super();
    this.x = x;
    this.y = y;
    this.onStart = onStart;
    this.onStop = onStop;
  }

  addSpeed(x, y) {
    this.x = roundFloat(isNaN(x) ? this.x : this.x + x, 100_000);
    this.y = roundFloat(isNaN(y) ? this.y : this.y + y, 100_000);
  }

  setSpeed(x: number, y: number) {
    this.x = isNaN(x) ? this.x : x;
    this.y = isNaN(y) ? this.y : y;
  }

  multiplySpeed(x, y) {
    this.x = roundFloat(this.x * x, 100_000);
    this.y = roundFloat(this.y * y, 100_000);
  }

  clearSpeed() {
    this.x = 0;
    this.y = 0;
  }

  isMoving() {
    return this.x === 0 && this.y === 0;
  }
}
