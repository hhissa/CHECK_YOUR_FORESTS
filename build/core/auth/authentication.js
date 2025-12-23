"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const keys_1 = require("../../keys");
function encodeFormBody(params) {
    return Object.entries(params)
        .map(([key, val]) => encodeURIComponent(key) + "=" + encodeURIComponent(val))
        .join("&");
}
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const body = encodeFormBody({
            token: keys_1.token,
            pass: keys_1.pass,
            grant_type: "client_credentials"
        });
        try {
            const response = yield fetch("https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                body
            });
            if (!response.ok) {
                const text = yield response.text();
                throw new Error(`Authentication failed: ${response.status} ${text}`);
            }
            const data = yield response.json();
            const token = data.access_token;
            console.log("Authenticated successfully:", token);
            return token;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
// Example usage
(() => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield authenticate();
    // Example request using the token
    const processResponse = yield fetch("https://services.sentinel-hub.com/api/v1/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
        // your process API body here
        })
    });
    const result = yield processResponse.json();
    console.log(result);
}))();
