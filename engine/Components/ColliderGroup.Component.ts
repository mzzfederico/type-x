import Component from "../Component";
import { Coordinate2d } from "../Types/Coordinate2d";
import Collider from "./Collider.Component";

type ColliderRow = {
    isEnabled: boolean;
    offset: Coordinate2d;
    component: Collider;
}

export default class ColliderGroup extends Component {
    colliders: ColliderRow[];

    constructor(colliders: ColliderRow[] = []) {
        super();
        this.colliders = colliders;
    }
}