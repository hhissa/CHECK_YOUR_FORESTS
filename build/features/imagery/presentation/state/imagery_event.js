export class ImageryEvent {
    constructor(bbox, date) {
        this.bbox = bbox;
        this.date = date;
    }
}
export class getRGBImagery extends ImageryEvent {
    constructor(bbox, date) {
        super(bbox, date);
    }
}
export class getNDVIImagery extends ImageryEvent {
    constructor(bbox, date) {
        super(bbox, date);
    }
}
