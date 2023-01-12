import { type Side } from "../../logic/terms";
import { type MoveLine } from "../../logic/algorithms/types";
import { type BoardSquareListings } from "../../formation/structure/squareCollection";
import Piece from '../../components/piece/Piece';
interface Attack {
    attackPiece: Piece;
    frontAttackLine: MoveLine;
}
declare class EventManager {
    static forceCheckResolve(board: BoardSquareListings, { attackPiece, frontAttackLine }: Attack, side: Side): boolean;
    static victoryCheck(board: BoardSquareListings): void;
}
export default EventManager;
