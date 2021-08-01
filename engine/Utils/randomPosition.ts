import { ROOM_HEIGHT, ROOM_WIDTH } from "./defaultConstants";
import rollDice from "./dice";

export default function randomPosition(w = ROOM_WIDTH, h = ROOM_HEIGHT) {
    return ({
        x: rollDice(2, w - 2),
        y: rollDice(2, h - 2)
    })
}