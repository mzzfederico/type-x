import Component from "../Component";
import Entity from "../Entity";

export default class Relationship extends Component {
    next?: string;
    previous?: string;
    first?: string;
    parent?: string;
    constructor({
        next,
        previous,
        first,
        parent
    }: IRelationshipProps) {
        super();
        this.next = next;
        this.previous = previous;
        this.first = first;
        this.parent = parent;
    }
}

export interface IRelationshipProps {
    next?: string;
    previous?: string;
    first?: string;
    parent?: string;
}