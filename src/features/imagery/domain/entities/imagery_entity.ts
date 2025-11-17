export class Imagery {
  constructor(
    public readonly id: string,
    public readonly images: Map<string, Asset>,
    public readonly bbox: [[number, number], [number, number]],
    public readonly date: Date,
    public readonly satellite: string,
    public readonly collections: string[]
  ) {

  }
}

export class Asset {
  constructor(
    public readonly id: string,
    public readonly url: string,
  ) {

  }
}
