import { Coordinate2d } from "../Types/Coordinate2d";

export default function getVectorToPosition(sourcePos: Coordinate2d, targetPos: Coordinate2d): number[] {
    const { x, y } = sourcePos;
    const { x: xT, y: yT } = targetPos;

    return [xT - x, yT - y];
}

export function getUnitVector(vector: number[]) {
    return vector.map(
        coordinate => {
            if (coordinate === 0) return 0;
            return coordinate > 0 ? 1 : -1;
        }
    )
}