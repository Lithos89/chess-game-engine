interface Observable {
  // observer: Observer<T>;
  signalState: (type?: string) => void;
};

export default Observable;
