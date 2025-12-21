var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { ImageryError } from "../../../../core/error/imagery_error";
import { Bloc } from "./bloc";
import { getNDVIImagery, getRGBImagery } from "./imagery_event";
import { Empty, Error, Loading, Loaded } from "./imagery_state";
export class ImageryBloc extends Bloc {
    constructor(getNDVIImagery) {
        super();
        this._getImagery = getNDVIImagery;
    }
    get getInitialState() { return new Empty(); }
    mapStatetoEvent(e) {
        return __asyncGenerator(this, arguments, function* mapStatetoEvent_1() {
            //if the user requests rgb imagery
            if (e instanceof getRGBImagery) {
                yield yield __await(new Loading());
                const rgbImage = yield __await(this._getImagery.executeRGB({ bbox: e.bbox, date: e.date }));
                if (rgbImage instanceof ImageryError) {
                    yield yield __await(new Error("Unable to get Image"));
                }
                else {
                    yield yield __await(new Loaded(rgbImage));
                }
            }
            else if (e instanceof getNDVIImagery) {
                yield yield __await(new Loading());
                const ndviImage = yield __await(this._getImagery.executeNDVI({ bbox: e.bbox, date: e.date }));
                if (ndviImage instanceof ImageryError) {
                    yield yield __await(new Error("Unable to get Image"));
                }
                else {
                    yield yield __await(new Loaded(ndviImage));
                }
            }
        });
    }
}
