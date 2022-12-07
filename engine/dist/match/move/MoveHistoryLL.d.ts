export default class MoveHistoryLL {
    private head;
    addMove: (value: string) => void;
    removeLastMove: () => void;
    listMoves: () => string[];
}
