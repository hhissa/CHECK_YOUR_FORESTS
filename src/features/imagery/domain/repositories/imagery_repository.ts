import { Imagery } from "../entities/imagery_entity";

export abstract class ImageryRepository {
  abstract getRGBImagery(params: Params): Promise<Imagery>;

  abstract getNDVIImagery(params: Params): Promise<Imagery>;
}

interface Params {
  date: Date;
  bbox: [[number, number], [number, number]];
};

