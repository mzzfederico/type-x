import { Coordinate2d } from "../Types/Coordinate2d";
import { roundFloat } from "./rounding";

export default function getVectorToPosition(sourcePos: Coordinate2d, targetPos: Coordinate2d): number[] {
    const { x, y } = sourcePos;
    const { x: xT, y: yT } = targetPos;

    return [roundFloat(xT - x, 10), roundFloat(yT - y, 10)];
}

export function getUnitVector(vector: number[]) {
    return vector.map(
        coordinate => {
            if (coordinate === 0) return 0;
            return coordinate > 0 ? 1 : -1;
        }
    )
}