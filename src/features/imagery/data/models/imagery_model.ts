import { Imagery, Asset } from "../../domain/entities/imagery_entity";
export class ImageryModel extends Imagery {
  constructor(
    public readonly id: string,
    public readonly images: Map<string, ArrayBuffer>,
    public readonly bbox: [[number, number], [number, number]],
    public readonly date: Date,
    public readonly satellite: string,
    public readonly collections: string[]
  ) {
    super(id, images, bbox, date, satellite, collections);
  }

  public static fromJson(json: Record<string, any>): ImageryModel {
    return new ImageryModel(
      json.id,
      new Map(Object.entries(json.images).map(([k, v]) => [k, v as ArrayBuffer])),
      json.bbox,
      new Date(json.date),
      json.satellite,
      json.collections
    );
  }

  public toJson() {
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
