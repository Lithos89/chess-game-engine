import Square from "components/Square";
interface Movable {
    move(currentSquare: Square, destSquare: Square): {
        [shortPosition: string]: Square;
    };
}
export default Movable;
