import Component from '../Component';
import { Coordinate2d } from '../Types/Coordinate2d';

export default class Sprite extends Component {
  src: string;
  width: number;
  height: number;
  offset: Coordinate2d;

  constructor({ src, width = 1, height = 1, offset = { x: 0, y: 0 } }) {
    super();

    this.src = src;
    this.width = width;
    this.height = height;
    this.offset = offset;
  }

  replaceSource(src: string): void {
    if (src) this.src = src;
  }
}
