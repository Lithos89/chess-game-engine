import { type ShortPosition } from 'logic/terms';
import Game from './Game';
declare class GameController extends Game {
    private selectedSquarePos;
    selectSquare(position: ShortPosition): void;
    move(from: ShortPosition, to: ShortPosition): boolean;
    requestUndo(): void;
}
export default GameController;
