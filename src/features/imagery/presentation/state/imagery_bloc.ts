import { ImageryError } from "../../../../core/error/imagery_error";
import { Imagery } from "../../domain/entities/imagery_entity";
import { GetImagery } from "../../domain/usecases/imagery_usecase";
import { Bloc } from "./bloc";
import { getNDVIImagery, getRGBImagery, ImageryEvent } from "./imagery_event";
import { Empty, Error, ImageryState, Loading, Loaded } from "./imagery_state";

export class ImageryBloc extends Bloc<ImageryEvent, ImageryState> {
  private _getImagery: GetImagery;
  constructor(getNDVIImagery: GetImagery) {
    super();
    this._getImagery = getNDVIImagery;
  }

  get getInitialState(): ImageryState { return new Empty(); }


  async* mapStatetoEvent(e: ImageryEvent) {
    //if the user requests rgb imagery

    if (e instanceof getRGBImagery) {
      yield new Loading();
      const rgbImage: Imagery = await this._getImagery.executeRGB({ bbox: e.bbox, date: e.date })
      if (rgbImage instanceof ImageryError) {
        yield new Error("Unable to get Image")
      } else {
        yield new Loaded(rgbImage);
      }

    } else if (e instanceof getNDVIImagery) {
      yield new Loading();
      const ndviImage: Imagery = await this._getImagery.executeNDVI({ bbox: e.bbox, date: e.date })

      if (ndviImage instanceof ImageryError) {
        yield new Error("Unable to get Image")
      } else {
        yield new Loaded(ndviImage);
      }
    }
  }
}
