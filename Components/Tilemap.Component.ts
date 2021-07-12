import Component from '.';
import BricksTileset from '../../Tilesets/bricks';
import Tileset from '../Assets/Tileset';

export default class Tilemap extends Component {
  set: Tileset = BricksTileset;

  map: Array<any> = [[]]; /* TODO: type for tilemap array of tiles values */

  constructor(set, map) {
    super();
    this.set = set;
    this.map = map;
  }
}
