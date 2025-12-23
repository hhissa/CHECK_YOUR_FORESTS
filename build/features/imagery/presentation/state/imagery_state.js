"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = exports.Loaded = exports.Loading = exports.Empty = exports.ImageryState = void 0;
class ImageryState {
}
exports.ImageryState = ImageryState;
class Empty extends ImageryState {
}
exports.Empty = Empty;
class Loading extends ImageryState {
}
exports.Loading = Loading;
class Loaded extends ImageryState {
    constructor(imagery) {
        super();
        this.imagery = imagery;
    }
}
exports.Loaded = Loaded;
class Error extends ImageryState {
    constructor(errMsg) {
        super();
        this.errMsg = errMsg;
    }
}
exports.Error = Error;
