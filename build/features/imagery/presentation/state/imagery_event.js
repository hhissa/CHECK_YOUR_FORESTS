"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNDVIImagery = exports.getRGBImagery = exports.ImageryEvent = void 0;
class ImageryEvent {
    constructor(bbox, date) {
        this.bbox = bbox;
        this.date = date;
    }
}
exports.ImageryEvent = ImageryEvent;
class getRGBImagery extends ImageryEvent {
    constructor(bbox, date) {
        super(bbox, date);
    }
}
exports.getRGBImagery = getRGBImagery;
class getNDVIImagery extends ImageryEvent {
    constructor(bbox, date) {
        super(bbox, date);
    }
}
exports.getNDVIImagery = getNDVIImagery;
