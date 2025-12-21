export class ImageryState {
}
export class Empty extends ImageryState {
}
export class Loading extends ImageryState {
}
export class Loaded extends ImageryState {
    constructor(imagery) {
        super();
        this.imagery = imagery;
    }
}
export class Error extends ImageryState {
    constructor(errMsg) {
        super();
        this.errMsg = errMsg;
    }
}
