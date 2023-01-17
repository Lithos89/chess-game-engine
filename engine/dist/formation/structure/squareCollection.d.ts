import { type SquareColor } from '../../logic/terms';
import Square from './../../components/Square';
export interface PresentedSquare {
    color: SquareColor;
    focus: {
        highlighted: boolean;
        action: 'move' | 'capture' | null;
    };
}
export type BoardSquareListings = {
    [shortPosition: string]: Square;
};
