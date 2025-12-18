

export abstract class ImageryEvent {
  public bbox: number[][]
  public date: Date;
  constructor(bbox: number[][], date: Date) {
    this.bbox = bbox;
    this.date = date;

  }
}


export class getRGBImagery extends ImageryEvent {

  constructor(bbox: number[][], date: Date) {
    super(bbox, date)
  }
}

export class getNDVIImagery extends ImageryEvent {
  constructor(bbox: number[][], date: Date) {
    super(bbox, date)
  }
}
