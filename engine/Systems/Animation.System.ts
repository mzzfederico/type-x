import System from '../System';
import Sprite from '../Components/Sprite.Component';
import SpriteAnimation, { SpriteAnimationState } from '../Components/SpriteAnimation.Component';
import Entity from '../Entity';
import PixiSprite from '../Components/PixiSprite.Component';

export default class AnimationSystem extends System {
  draw(time, entities) {
    entities
      .filter((entity) => !!entity.getComponent(SpriteAnimation) && !!entity.getComponent(PixiSprite))
      .forEach(
        (entity: Entity): void => {
          const animation = entity.getComponent(SpriteAnimation) as SpriteAnimation;
          const sprite = entity.getComponent(PixiSprite) as PixiSprite;
          const currentState: SpriteAnimationState = animation.getState();

          if (!currentState) return;

          /* Update animation clock and steps */
          animation.updateTime(time);
          if (animation.animationTime > currentState.interval) {
            animation.updateStep();
            animation.clearTime();
          }

          /* Update sprite source on frame change */
          const currentName = sprite.name;
          const currentFrame = animation.getCurrentFrame();

          if (currentName !== currentFrame) {
            sprite.name = currentFrame;
          }
        },
      );
  }
}
