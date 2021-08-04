import { v4 as uuidv4 } from 'uuid';
import Component from '__Core/Component';
import Position from '__Components/Position.Component';

export default class Entity {
  id: string;
  tag: string;
  components: Object;
  isDisabled: boolean;
  getEntity: Function;

  constructor({
    id = uuidv4(), x = 0, y = 0, tag = '', components = {}, isDisabled = false,
  }: IEntityProps) {
    this.id = id;
    this.tag = tag;
    this.components = { ...components };
    this.isDisabled = isDisabled;
    /* Default components */
    this.addComponent(new Position({ x, y }));
  }

  getComponent(componentClass): unknown {
    return this.components[componentClass.name];
  }

  addComponent(component: Component): Entity {
    this.components[component.constructor.name] = component;
    component.registerEntityId(this.id, this.tag);
    return this;
  }

  removeComponent(component: Component): Entity {
    delete this.components[component.name];
    return this;
  }

  setDisabled(newState: boolean): void {
    this.isDisabled = newState;
  }
}

interface IEntityProps {
  id?: string;
  tag?: string;
  x?: number;
  y?: number;
  components?: Object;
  isDisabled?: boolean;
}
