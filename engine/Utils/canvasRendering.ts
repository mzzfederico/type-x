import * as Pixi from "pixi";
const ZOOM: number = parseInt(process.env.ZOOM) || 2;
const TILE_SIZE: number = parseInt(process.env.TILE_SIZE) || 16;
const realTileSize: number = TILE_SIZE * ZOOM;

export function drawTileMap(ctx, map, tileset, offset) {
  if (!tileset) return;

  const image = new Image();
  image.src = tileset.src;

  function getTile(col, row) {
    return map[row][col];
  }

  image.onload = () => {
    for (let c = 0; c < map[0].length; c++) {
      for (let r = 0; r < map.length; r++) {
        const tile = getTile(c, r);
        if (tile >= 0) {
          let rectangle = new Pixi.Rectangle(192, 128, 64, 64);

          ctx.drawImage(
            image, // image
            (tile % tileset.w) * TILE_SIZE, // source x
            Math.floor(tile / tileset.w) * TILE_SIZE, // source y
            TILE_SIZE, // source width
            TILE_SIZE, // source height
            (c * realTileSize) + (offset.x * realTileSize), // target x
            (r * realTileSize) + (offset.y * realTileSize), // target y
            realTileSize, // target width
            realTileSize, // target height
          );
        }
      }
    }
  };
}

export function drawTileImage(ctx, position = { x: 1, y: 1 }, size = { x: 1, y: 1 }, tileSrc = '') {
  const image = new Image();
  image.src = tileSrc;

  image.onload = () => {
    ctx.drawImage(
      image, // image
      position.x * size.x * TILE_SIZE, // source x
      position.y * size.y * TILE_SIZE, // source y
      TILE_SIZE, // source width
      TILE_SIZE, // source height
      position.x * realTileSize, // target x
      position.y * realTileSize, // target y
      realTileSize, // target width
      realTileSize, // target height
    );
  };
}
