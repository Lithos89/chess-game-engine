interface Observable {
    id: string;
    signalState: (type?: string) => void;
}
export default Observable;
