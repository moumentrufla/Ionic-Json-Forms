"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
exports.fieldReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, tester = _a.tester, field = _a.field;
    switch (type) {
        case actions_1.ADD_FIELD:
            return state.concat([{ tester: tester, field: field }]);
        case actions_1.REMOVE_FIELD:
            return state.filter(function (t) { return t.tester !== tester; });
        default:
            return state;
    }
};
//# sourceMappingURL=fields.js.map