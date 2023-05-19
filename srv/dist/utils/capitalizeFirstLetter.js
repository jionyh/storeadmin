"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capitalize = void 0;
const Capitalize = (data) => {
    const splitName = data.split(' ');
    for (const i in splitName) {
        splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1);
    }
    const capitalized = splitName.join(' ');
    return capitalized;
};
exports.Capitalize = Capitalize;
