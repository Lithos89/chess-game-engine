import Observable from 'state/observable';
import Match from '../session/match/Match';
import Game from '../session/game/Game';
declare class Observer<T extends Observable> {
    static gameObservers: Map<Game, Observer<Game>>;
    static matchObservers: Map<Match, Observer<Match>>;
    private manager;
    private updateState;
    constructor(manager: T, setStateCallback?: (state: any) => void);
    setCallback: (setStateCallback: (state: any) => void) => void;
    commitState: (state: {} | ((prevState: {}) => {})) => void;
}
export default Observer;
