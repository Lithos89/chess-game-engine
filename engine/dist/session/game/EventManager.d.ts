import { type Side } from "../../logic/terms";
import { Attack } from "../../logic/concepts";
import { type BoardSquareListings } from "../../formation/structure/squareCollection";
declare class EventManager {
    static forceCheckResolve: (board: BoardSquareListings, { attackPiece, frontAttackLine }: Attack, side: Side) => boolean;
    static victoryCheck(board: BoardSquareListings): void;
}
export default EventManager;
