import { v4 as uuidv4 } from 'uuid';
export default class Component {
  id: string;
  name: string;
  entityId: string;
  tag: string;
  isEnabled: boolean = true;

  constructor(id = uuidv4()) {
    this.id = id;
  }

  registerEntityId(id: string, tag: string): void {
    this.entityId = id;
    this.tag = this.tag ? this.tag : tag;
  }
}
