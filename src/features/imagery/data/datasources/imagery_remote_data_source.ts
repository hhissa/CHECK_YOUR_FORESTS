import { ImageryModel } from "../models/imagery_model"
abstract class ImageryRemoteDataSource {
  abstract getRGBImagery(params: Params): Promise<ImageryModel>;

  abstract getNDVIImagery(params: Params): Promise<ImageryModel>;
}

interface Params {
  date: Date;
  bbox: [[number, number], [number, number]];
};
