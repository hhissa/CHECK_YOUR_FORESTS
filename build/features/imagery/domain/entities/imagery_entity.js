"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = exports.Imagery = void 0;
class Imagery {
    constructor(id, images, bbox, date, satellite, collections) {
        this.id = id;
        this.images = images;
        this.bbox = bbox;
        this.date = date;
        this.satellite = satellite;
        this.collections = collections;
    }
}
exports.Imagery = Imagery;
class Asset {
    constructor(url) {
        this.url = url;
    }
}
exports.Asset = Asset;
