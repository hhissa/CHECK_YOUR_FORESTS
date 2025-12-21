import { ImageryModel } from "../../features/imagery/data/models/imagery_model";
export class ImageryError extends ImageryModel {
    constructor(message) {
        super('Error', new Map(), [[0, 0], [0, 0]], new Date(0), 'Error', []);
        this.message = message;
    }
}
