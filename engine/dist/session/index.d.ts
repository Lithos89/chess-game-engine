import { Side } from 'logic/Terms';
export declare function startSession(): {
    newMatch: (playerSide: Side) => void;
};
export declare function setMatchObserver(callback: any, match: any): void;
export declare function setGameObserver(callback: any, game: any): void;
