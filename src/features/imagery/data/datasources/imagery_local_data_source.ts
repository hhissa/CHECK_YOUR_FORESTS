import { ImageryError } from "../../../../core/error/imagery_error";
import { ImageryModel } from "../models/imagery_model";

export abstract class ImageryLocalDataSource {
  abstract getLastImagery(): Promise<ImageryModel>;
  abstract cacheImagery(model: ImageryModel): Promise<void>;
}

export class ImageryLocalDataSourceImpl implements ImageryLocalDataSource {


  public getLastImagery(): Promise<ImageryModel> {
    return new Promise(() => true)
  }

  public async cacheImagery(): Promise<void> {
    return new Promise(() => true);
  }

}
