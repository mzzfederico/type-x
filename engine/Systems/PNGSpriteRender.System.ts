import System from '../System';
import Position from '__Components/Position.Component';
import Sprite from '__Components/Sprite.Component';
import Entity from '__Core/Entity';

const ZOOM: number = parseInt(process.env.ZOOM) || 2;
const TILE_SIZE: number = parseInt(process.env.TILE_SIZE) || 16;

export default class SpriteRenderer extends System {
  draw(time: number, entities: Entity[]): void {
    /* Runs the system on each frame */
    entities
      .filter((entity: Entity) => entity.getComponent(Sprite))
      .forEach((entity: Entity) => {
        const { isDisabled } = entity;
        const sprite = document.getElementById(entity.id) as HTMLImageElement;
        if (!sprite) return;
        if (!isDisabled) this.updateSprite(sprite, entity);
        if (isDisabled) this.hideSprite(sprite);
      });
  }

  start = (entities: Entity[]): void => {
    /* Runs the system on start */
    entities
      .filter((entity: Entity) => !!entity.getComponent(Sprite))
      .forEach((entity: Entity) => {
        const sprite = document.createElement('img');
        this.updateSprite(sprite, entity);
        document.getElementById('root').append(sprite);
      });
  }

  updateSprite = (sprite: HTMLImageElement, entity: Entity): void => {
    if (entity.id) sprite.setAttribute('id', entity.id);

    const { x, y } = entity.getComponent(Position) as Position;
    const { src, width, height } = entity.getComponent(Sprite) as Sprite;

    sprite.classList.add(entity.tag);

    sprite.style.position = 'absolute';

    sprite.style.left = `${Math.floor(x * ZOOM * TILE_SIZE)}px`;
    sprite.style.top = `${Math.floor(y * ZOOM * TILE_SIZE)}px`;

    sprite.style.width = `${Math.floor(width * ZOOM * TILE_SIZE)}px`;
    sprite.style.height = `${Math.floor(height * ZOOM * TILE_SIZE)}px`;
    sprite.style.display = 'block';

    sprite.src = src;
  }

  hideSprite(sprite: HTMLImageElement): void {
    sprite.style.display = 'none';
  }

  cleanup(entity: Entity) {
    if (entity.getComponent(Sprite)) {
      document.getElementById(entity.id).remove();
    }
  }

  end(entities: Entity[]) {
    entities.forEach(this.cleanup);
  }
}
