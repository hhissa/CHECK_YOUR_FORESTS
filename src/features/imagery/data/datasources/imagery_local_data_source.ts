import { ImageryModel } from "../models/imagery_model";

export abstract class ImageryLocalDataSource {
  abstract getLastImagery(): Promise<ImageryModel>;
  abstract cacheImagery(model: ImageryModel): Promise<void>;
}
