import { Imagery, Asset } from "../../domain/entities/imagery_entity";
export class ImageryModel extends Imagery {
  constructor
    (
      public readonly id: string,
      public readonly images: Map<string, Asset>,
      public readonly bbox: [[number, number], [number, number]],
      public readonly date: Date,
      public readonly satellite: string,
      public readonly collections: string[]
    ) {
    super(id, images, bbox, date, satellite, collections);


  };
  public static fromJson(json: Record<string, any>): ImageryModel {
    return new ImageryModel(
      json.id,
      new Map(Object.entries(json.images)), // convert POJO → Map
      json.bbox,
      new Date(json.date),
      json.satellite,
      json.collections
    );
  }

  public toJson() {
    return {
      "id": this.id,
      "images": Array.from(this.images.entries()),
      "bbox": this.bbox,
      "date": this.date,
      "satellite": this.satellite,
      "collections": this.collections
    };
  }
};
