import { type Side } from '../../logic/terms';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece, { King } from '../../components/piece';
export default function sortPieces(board: BoardSquareListings): [basicPieces: {
    [side in Side]: Piece[];
}, kings: {
    [side in Side]: King;
}];
