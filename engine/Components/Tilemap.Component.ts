import * as PIXI from "pixi.js";
import { Spritesheet } from "pixi.js";
import { CompositeTilemap } from "@pixi/tilemap";
import Component from '../Component';

export default class Tilemap extends Component {
  name: string = null;
  map: Array<any> = [[]]; /* TODO: type for tilemap array of tiles values */
  zIndex: number = 0;
  sprites: PIXI.Sprite[] = [];
  tilemap: Spritesheet = null;

  constructor(
    { name: set = "", map = [], zIndex = 0 }
      : { name?: string, map?: Array<any>, zIndex?: number }
  ) {
    super();
    this.name = set;
    this.map = map;
    this.zIndex = zIndex;
  }
}
