"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkTest = void 0;
class NetworkTest {
    Test() {
        this.onLine = navigator.onLine;
        return this.onLine;
    }
}
exports.NetworkTest = NetworkTest;
