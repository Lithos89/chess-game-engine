
// State Management
import Observable from './observable';

// Game Management
import Match from '../session/match/Match';
import Game from '../session/game/Game';

class Observer<T extends Observable> {
  // ?: Consider making these accessible by a id that is specified by a specific type
  static gameObservers: Map<string, Observer<Game>> = new Map();
  static matchObservers: Map<string, Observer<Match>> = new Map();
  
  private manager: Observable; // Class that needs to persist state to client
  private updateState: (state: any) => void;

  constructor(
    manager: T,
    setStateCallback: (state: any) => void = () => {}
  ) {
    this.manager = manager;
    this.updateState = setStateCallback;

    if (manager instanceof Match) {
      Observer.matchObservers.set(manager.id, this);
    } else if (manager instanceof Game) {
      Observer.gameObservers.set(manager.id, this);
    };
  };

  public setCallback = (setStateCallback: (state: any) => void) => {
    this.updateState = setStateCallback;
    this.manager.signalState();
  };

  public commitState = (state: ((prevState: {}) => {}) | {}) => {
    if (this.manager instanceof Match) {
      console.info("Match state updated");
    } else if (this.manager instanceof Game) {
      console.info("Game state updated");
    };
    this.updateState(state);
  };
};

export default Observer;
