"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usedIds = new Set();
var makeId = function (idBase, iteration) {
    return iteration <= 1 ? idBase : idBase + iteration.toString();
};
var isUniqueId = function (idBase, iteration) {
    var newID = makeId(idBase, iteration);
    return !usedIds.has(newID);
};
exports.createId = function (proposedId) {
    if (proposedId === undefined) {
        // failsafe to avoid endless loops in error cases
        proposedId = 'undefined';
    }
    var tries = 0;
    while (!isUniqueId(proposedId, tries)) {
        tries++;
    }
    var newID = makeId(proposedId, tries);
    usedIds.add(newID);
    return newID;
};
exports.removeId = function (id) { return usedIds.delete(id); };
exports.clearAllIds = function () { return usedIds.clear(); };
//# sourceMappingURL=ids.js.map