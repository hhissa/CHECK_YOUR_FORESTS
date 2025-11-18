export class Imagery {
  constructor(
    public readonly id: String,
    public readonly images: Map<string, ArrayBuffer>,
    public readonly bbox: number[][],
    public readonly date: Date,
    public readonly satellite: String,
    public readonly collections: String[]
  ) {

  }
}

export class Asset {
  constructor(

    public readonly url: String,
  ) {

  }
}
