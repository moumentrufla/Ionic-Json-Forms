"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
exports.rendererReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.ADD_RENDERER:
            return state.concat([
                { tester: action.tester, renderer: action.renderer }
            ]);
        case actions_1.REMOVE_RENDERER:
            return state.filter(function (t) { return t.tester !== action.tester; });
        default:
            return state;
    }
};
//# sourceMappingURL=renderers.js.map