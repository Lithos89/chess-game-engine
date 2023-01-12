import { type Side } from '../../logic/terms';
import { type BoardSquareListings } from '../../formation/structure/squareCollection';
import Piece from '../../components/piece/Piece';
import King from '../../components/piece/King';
export default function sortPieces(board: BoardSquareListings): [basicPieces: {
    [side in Side]: Piece[];
}, kings: {
    [side in Side]: King;
}];
