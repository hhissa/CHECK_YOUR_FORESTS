import { Imagery } from "../../domain/entities/imagery_entity";
export class ImageryModel extends Imagery {
    constructor(id, images, bbox, date, satellite, collections) {
        super(id, images, bbox, date, satellite, collections);
        this.id = id;
        this.images = images;
        this.bbox = bbox;
        this.date = date;
        this.satellite = satellite;
        this.collections = collections;
    }
    static fromJson(json) {
        return new ImageryModel(json.id, new Map(Object.entries(json.images).map(([k, v]) => [k, v])), json.bbox, new Date(json.date), json.satellite, json.collections);
    }
    toJson() {
        return {
            id: this.id,
            images: Object.fromEntries(this.images),
            bbox: this.bbox,
            date: this.date.toISOString(),
            satellite: this.satellite,
            collections: this.collections
        };
    }
}
