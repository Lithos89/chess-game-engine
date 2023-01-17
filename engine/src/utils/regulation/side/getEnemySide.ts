
// Types, interfaces, constants, ...
import { type Side, SIDES } from '../../../logic/terms';

export default function getEnemySide(side: Side) {
  return SIDES[1 - SIDES.indexOf(side)];
};
