"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageryBloc = void 0;
const imagery_error_1 = require("../../../../core/error/imagery_error");
const bloc_1 = require("./bloc");
const imagery_event_1 = require("./imagery_event");
const imagery_state_1 = require("./imagery_state");
class ImageryBloc extends bloc_1.Bloc {
    constructor(getNDVIImagery) {
        super();
        this._getImagery = getNDVIImagery;
    }
    get getInitialState() { return new imagery_state_1.Empty(); }
    mapStatetoEvent(e) {
        return __asyncGenerator(this, arguments, function* mapStatetoEvent_1() {
            //if the user requests rgb imagery
            if (e instanceof imagery_event_1.getRGBImagery) {
                yield yield __await(new imagery_state_1.Loading());
                const rgbImage = yield __await(this._getImagery.executeRGB({ bbox: e.bbox, date: e.date }));
                if (rgbImage instanceof imagery_error_1.ImageryError) {
                    yield yield __await(new imagery_state_1.Error("Unable to get Image"));
                }
                else {
                    yield yield __await(new imagery_state_1.Loaded(rgbImage));
                }
            }
            else if (e instanceof imagery_event_1.getNDVIImagery) {
                yield yield __await(new imagery_state_1.Loading());
                const ndviImage = yield __await(this._getImagery.executeNDVI({ bbox: e.bbox, date: e.date }));
                if (ndviImage instanceof imagery_error_1.ImageryError) {
                    yield yield __await(new imagery_state_1.Error("Unable to get Image"));
                }
                else {
                    yield yield __await(new imagery_state_1.Loaded(ndviImage));
                }
            }
        });
    }
}
exports.ImageryBloc = ImageryBloc;
