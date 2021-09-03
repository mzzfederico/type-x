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

  getComponent(componentClass): Component | Object {
    if (componentClass.name in this.components) {
      return this.components[componentClass.name][0];
    }
    return false;
  }

  getComponents(componentClass): Array<Component> {
    const results = this.components[componentClass.name];
    if (Array.isArray(results)) {
      return results;
    }
    return [];
  }

  addComponent(component: Component): Entity {
    const className = component.constructor.name;
    if (!Array.isArray(this.components[className])) {
      this.components[className] = new Array(0);
    }
    this.components[className] = [...this.components[className], component];
    return this;
  }

  removeComponent(component: Component): Entity {
    this.components[component.name] = this.components[component.name].filter(
      existingComponent => component.id !== existingComponent.id
    );
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
