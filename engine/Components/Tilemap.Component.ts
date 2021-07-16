import Component from '../Component';
import Tileset from '../Assets/Tileset';

export default class Tilemap extends Component {
  set: Tileset = null;

  map: Array<any> = [[]]; /* TODO: type for tilemap array of tiles values */

  constructor(set, map) {
    super();
    this.set = set;
    this.map = map;
  }
}
