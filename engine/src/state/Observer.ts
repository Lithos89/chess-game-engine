
// State Management
import Observable from 'state/observable';

// Game Management
import Match from '../session/match/Match';
import BoardManager from '../session/board/BoardManager';

class Observer<T extends Observable> {
  // ?: Consider making these accessible by a id that is specified by a specific type
  static boardObservers: Map<BoardManager, Observer<BoardManager>> = new Map();
  static matchObservers: Map<Match, Observer<Match>> = new Map();
  
  private manager: Observable; // Class that needs to persist state to client
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

  public setCallback = (setStateCallback: (state: any) => void) => {
    this.updateState = setStateCallback;
    this.manager.signalState();
  };

  public commitState = (state: ((prevState) => {}) | {}) => {
    if (this.manager instanceof Match) {
      console.info("Match state updated");
    } else if (this.manager instanceof BoardManager) {
      console.info("Board state updated");
    };
    this.updateState(state);
  };
};

export default Observer;
