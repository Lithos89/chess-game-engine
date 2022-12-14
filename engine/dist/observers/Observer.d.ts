import Observable from 'observers/interfaces/observable';
import BoardManager from '../session/board/BoardManager';
import Match from '../session/match/Match';
declare class Observer<T extends Observable> {
    static boardObservers: Map<BoardManager, Observer<BoardManager>>;
    static matchObservers: Map<Match, Observer<Match>>;
    private manager;
    private updateState;
    constructor(manager: T, setStateCallback?: (state: any) => void);
    setCallback: (setStateCallback: (state: any) => void) => void;
    commitState: (state: any) => void;
}
export default Observer;
