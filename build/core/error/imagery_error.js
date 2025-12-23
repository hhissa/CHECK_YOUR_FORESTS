"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageryError = void 0;
const imagery_model_1 = require("../../features/imagery/data/models/imagery_model");
class ImageryError extends imagery_model_1.ImageryModel {
    constructor(message) {
        super('Error', new Map(), [[0, 0], [0, 0]], new Date(0), 'Error', []);
        this.message = message;
    }
}
exports.ImageryError = ImageryError;
