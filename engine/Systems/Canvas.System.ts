import System from '__Core/System';
import Position from '__Components/Position.Component';
import Tilemap from '__Components/Tilemap.Component';

import { drawTileMap } from '__Utils/canvasRendering';

const ZOOM: number = parseInt(process.env.ZOOM) || 2;

export default class CanvasRenderer extends System {
  height: number = 300;

  width: number = 150;
  canvasElement: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  constructor(width, height) {
    super();
    this.height = height;
    this.width = width;
  }

  drawTilemapsFromEntities(entities) {
    entities
      .filter((entity) => !!entity.getComponent(Tilemap) && !!entity.getComponent(Position))
      .forEach(
        (entity) => {
          const tilemap = entity.getComponent(Tilemap) as Tilemap;
          const position = entity.getComponent(Position) as Position;

          drawTileMap(this.ctx, tilemap.map, tilemap.set, position);
        },
      );
  }

  redrawTilemap() {
    this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  start(entities): void {
    if (!this.canvasElement) {
      this.canvasElement = document.createElement('canvas');
      this.canvasElement.setAttribute('id', 'CanvasRenderer');
      this.ctx = this.canvasElement.getContext('2d');

      this.canvasElement.setAttribute('width', `${this.width * ZOOM}`);
      this.canvasElement.setAttribute('height', `${this.height * ZOOM}`);

      document.getElementById('root').append(this.canvasElement);
    };


    this.drawTilemapsFromEntities(entities);
  }

  end() {
    this.canvasElement.remove();
  }
}
