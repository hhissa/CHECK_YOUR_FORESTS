import { ImageryModel } from "../../features/imagery/data/models/imagery_model";
import { Imagery, Asset } from "../../features/imagery/domain/entities/imagery_entity";
import { ErrorBase } from "./error_base";

export class ImageryError extends ImageryModel {

  public message: String;
  constructor(message: String) {

    super('Error',
      new Map(),
      [[0, 0], [0, 0]],
      new Date(0),
      'Error',
      [],);

    this.message = message;
  }

}
