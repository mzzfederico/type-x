export default class Component {
  name: string;

  entityId: string;
  tag: string;

  registerEntityId(id: string, tag: string): void {
    this.entityId = id;
    this.tag = this.tag ? this.tag : tag;
  }
}
