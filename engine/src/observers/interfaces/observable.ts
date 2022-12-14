import Observer from '../Observer';
interface Observable {
  // observer: Observer<T>;
  signalState: () => void;
};

export default Observable;