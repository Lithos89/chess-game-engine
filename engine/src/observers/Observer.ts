import Observable from 'observers/interfaces/observable';
import BoardManager from '../session/board/BoardManager';
import Match from '../session/match/Match';

class Observer<T extends Observable> {
  static boardObservers: Map<BoardManager, Observer<BoardManager>> = new Map();
  static matchObservers: Map<Match, Observer<Match>> = new Map();
  
  private manager: Observable;
  private updateState: (state: any) => void;

  constructor(
    manager: T,
    setStateCallback: (state: any) => void = () => {}
  ) {
    this.manager = manager;
    this.updateState = setStateCallback;

    if (manager instanceof Match) {
      Observer.matchObservers.set(manager, this);
    } else if (manager instanceof BoardManager) {
      Observer.boardObservers.set(manager, this);
    };
  };

  setCallback = (setStateCallback: (state: any) => void) => {
    this.updateState = setStateCallback;
    this.manager.signalState();
  };

  commitState = (state: any) => {
    if (this.manager instanceof Match) {
      console.info("Match state updated");
    } else if (this.manager instanceof BoardManager) {
      console.info("Board state updated");
    }
    this.updateState(state);
  };
};

export default Observer;
