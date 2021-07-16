import System from '../System';
import Sprite from '../Components/Sprite.Component';
import SpriteAnimation, { SpriteAnimationState } from '../Components/SpriteAnimation.Component';
import Entity from '../Entity';

export default class AnimationSystem extends System {
  draw(time, entities) {
    entities
      .filter((entity) => !!entity.getComponent(SpriteAnimation))
      .forEach(
        (entity: Entity): void => {
          const animation = entity.getComponent(SpriteAnimation) as SpriteAnimation;
          const sprite = entity.getComponent(Sprite) as Sprite;
          const currentState: SpriteAnimationState = animation.getState();

          /* Update animation clock and steps */
          animation.updateTime(time);
          if (animation.animationTime > currentState.interval) {
            animation.updateStep();
            animation.clearTime();
          }

          /* Update sprite source on frame change */
          const currentSrc = sprite.src;
          const currentFrame = animation.getCurrentFrame();

          if (currentSrc !== currentFrame) {
            sprite.replaceSource(currentFrame);
          }
        },
      );
  }
}
