interface Observable {
  id: string;
  // observer: Observer<T>;
  signalState: (type?: string) => void;
};

export default Observable;
