export class Imagery {
    constructor(id, images, bbox, date, satellite, collections) {
        this.id = id;
        this.images = images;
        this.bbox = bbox;
        this.date = date;
        this.satellite = satellite;
        this.collections = collections;
    }
}
export class Asset {
    constructor(url) {
        this.url = url;
    }
}
