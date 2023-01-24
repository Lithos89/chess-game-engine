import { type Side, type ShortPosition } from 'logic/terms';
import Game from './Game';
declare class GameController extends Game {
    private selectedSquarePos;
    constructor(id: string, side: Side, finishedCallback: (result: Side | 'draw') => (() => {}));
    selectSquare: (position: ShortPosition) => void;
    move: (from: ShortPosition, to: ShortPosition) => boolean;
    requestUndo: () => void;
    startNextGame: () => void;
    resign: () => void;
}
export default GameController;
