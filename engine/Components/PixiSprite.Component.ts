import * as PIXI from 'pixi.js';
import Component from "../Component";
import { TILE_SIZE } from '../Utils/defaultConstants';

export default class PixiSprite extends Component {
    name: string = "";
    sprite: PIXI.Sprite = null;
    height: number = TILE_SIZE;
    width: number = TILE_SIZE;
    zIndex: number = 0;

    constructor({ name = "", width, height, zIndex }) {
        super();
        this.name = name;
        this.width = width;
        this.height = height;
        this.zIndex = zIndex;
    }
}