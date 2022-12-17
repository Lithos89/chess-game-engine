import { type ShortPosition } from 'logic/Terms';
import Game from './Game';
declare class GameController extends Game {
    private selectedSquarePos;
    selectPiece(position: ShortPosition): void;
    requestMove(from: ShortPosition, to: ShortPosition): boolean;
    requestUndo(): void;
}
export default GameController;
