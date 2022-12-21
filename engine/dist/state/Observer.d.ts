import Observable from 'state/observable';
import Match from '../session/match/Match';
import BoardManager from '../session/board/BoardManager';
declare class Observer<T extends Observable> {
    static boardObservers: Map<BoardManager, Observer<BoardManager>>;
    static matchObservers: Map<Match, Observer<Match>>;
    private manager;
    private updateState;
    constructor(manager: T, setStateCallback?: (state: any) => void);
    setCallback: (setStateCallback: (state: any) => void) => void;
    commitState: (state: {} | ((prevState: any) => {})) => void;
}
export default Observer;
