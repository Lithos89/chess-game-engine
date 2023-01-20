import Observable from './observable';
import Match from '../session/match/Match';
import Game from '../session/game/Game';
declare class Observer<T extends Observable> {
    static gameObservers: Map<string, Observer<Game>>;
    static matchObservers: Map<string, Observer<Match>>;
    private manager;
    private updateState;
    constructor(manager: T, setStateCallback?: (state: any) => void);
    setCallback: (setStateCallback: (state: any) => void) => void;
    commitState: (state: {} | ((prevState: {
        [key: string]: any;
    }) => {})) => void;
}
export default Observer;
