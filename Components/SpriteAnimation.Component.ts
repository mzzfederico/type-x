import Component from '.';
import { roundFloat } from '../Utils/rounding';

export default class SpriteAnimation extends Component {
  states: SpriteAnimationState[]

  current: string;

  animationTime: number;

  animationStep: number;

  constructor(states: SpriteAnimationState[], defaultState: string = '') {
    super();

    this.animationStep = 0;
    this.animationTime = 0;
    this.states = states;
    this.current = defaultState || states[0].name;
  }

  getState = (): SpriteAnimationState => this.states.find((searchElement) => searchElement.name === this.current)

  changeState = (newState: string): string => {
    if (this.current !== newState) {
      this.current = newState;
    }
    return this.current;
  }

  nextState = (): void => {
    const currentState: SpriteAnimationState = this.getState();
    if (currentState.nextState) this.changeState(currentState.nextState);
  }

  clearTime = (): void => {
    this.animationTime = 0;
  }

  updateTime = (milliseconds: number): void => {
    if (isNaN(milliseconds)) return;
    this.animationTime = roundFloat(this.animationTime + milliseconds, 1);
  }

  updateStep = (): void => {
    const currentState: SpriteAnimationState = this.getState();
    this.animationStep += 1;
    if (currentState.frames.length <= this.animationStep) {
      this.animationStep = 0;
    }
  }

  getCurrentFrame = (): string => {
    const currentState: SpriteAnimationState = this.getState();
    return currentState.frames[this.animationStep];
  }
}
export type SpriteAnimationState = {
  name: string;
  interval: number;
  frames: string[];
  nextState?: string;
}
