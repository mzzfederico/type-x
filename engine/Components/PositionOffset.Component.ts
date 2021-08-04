import Component from '../Component';
import { roundFloat } from '../Utils/rounding';

export default class PositionOffset extends Component {
    x: number;
    y: number;

    constructor({ x, y }) {
        super();

        this.x = x;
        this.y = y;
    }
}
