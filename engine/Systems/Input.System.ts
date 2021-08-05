import System from '../System';
import Input from '../Components/Input.Component';
import Entity from '../Entity';

export default class InputManager extends System {
  configs: Object = {};

  registerConfig(entityId: string, config): void {
    const formatKeyBind = (config) => Object.entries(config).map(
      (configEntry): InputEntry => ({ key: configEntry[0], event: configEntry[1], pressed: false })
    );
    this.configs = { ...this.configs, [entityId]: formatKeyBind(config) };
  }

  removeConfig(entitiId: string): void {
    delete this.configs[entitiId];
  }

  handleKeyEvent = (event): void => {
    const { key, type } = event;

    Object.entries(this.configs).forEach(([entityId, bindArray]: [string, Array<InputEntry>]) => {
      bindArray.forEach((entry: InputEntry) => {
        if (entry.key !== key) return;

        if (type === 'keydown') entry.pressed = true;
        if (type === 'keyup') entry.pressed = false;
      });
    });
  }

  update(time: number, entities: Entity[]): void {
    /* Gathers all keys to be watched */
    Object.entries(this.configs).forEach(([entityId, bindArray]: [string, Array<InputEntry>]) => {
      bindArray.forEach((entry: InputEntry) => {
        if (entry.pressed) entry.event(time);
      });
    });
  }

  end(): void {
    document.removeEventListener('keydown', this.handleKeyEvent);
    document.removeEventListener('keyup', this.handleKeyEvent);
  }

  cleanup(entity) {
    this.removeConfig(entity.id);
  }

  start = (entities: Entity[]): void => {
    /* Gathers all keys to be watched */
    entities
      .filter((entity: Entity) => entity.getComponent(Input))
      .forEach((entity: Entity) => {
        const entityConfig = (entity.getComponent(Input) as Input).config;
        this.registerConfig(entity.id, entityConfig);
      });

    document.addEventListener('keydown', this.handleKeyEvent);
    document.addEventListener('keyup', this.handleKeyEvent);
  }
}

export type InputEntry = {
  key: string;
  event: any;
  pressed: boolean;
}