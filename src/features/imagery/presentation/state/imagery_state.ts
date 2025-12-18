import { Imagery } from "../../domain/entities/imagery_entity";

export abstract class ImageryState {

}

export class Empty extends ImageryState { }

export class Loading extends ImageryState { }

export class Loaded extends ImageryState {
  public imagery: Imagery;
  constructor(imagery: Imagery) {
    super();
    this.imagery = imagery;
  }
}

export class Error extends ImageryState {
  private errMsg: String;
  constructor(errMsg: String) {
    super();
    this.errMsg = errMsg
  }

}
