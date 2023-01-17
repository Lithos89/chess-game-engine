"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Types, interfaces, constants, ...
var terms_1 = require("../../../logic/terms");
function getEnemySide(side) {
    return terms_1.SIDES[1 - terms_1.SIDES.indexOf(side)];
}
exports.default = getEnemySide;
;
//# sourceMappingURL=getEnemySide.js.map