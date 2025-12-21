var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { authenticate } from "../../../../core/auth/authentication";
import { ImageryError } from "../../../../core/error/imagery_error";
import { ImageryModel } from "../models/imagery_model";
export class ImageryRemoteDataSource {
}
;
export class ImageryRemoteDataSourceSENTINEL {
    getRGBImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('json logged');
            const body = {
                input: {
                    bounds: {
                        properties: {
                            crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                        },
                        bbox: [
                            params.bbox[0][0],
                            params.bbox[0][1],
                            params.bbox[1][0],
                            params.bbox[1][1],
                        ]
                    },
                    data: [
                        {
                            type: "landsat-ot-l1",
                            dataFilter: {
                                timeRange: {
                                    from: params.date.toISOString(),
                                    to: params.date.toISOString()
                                }
                            }
                        }
                    ]
                },
                output: {
                    width: 512,
                    height: 512
                },
                evalscript: `//VERSION=3
function setup() {
  return {
    input: ["B02", "B03", "B04"],
    output: {
      bands: 3,
      sampleType: "AUTO"
    }
  }
}

function evaluatePixel(sample) {
  return [
    2.5 * sample.B04,
    2.5 * sample.B03,
    2.5 * sample.B02
  ];
}
`
            };
            var token = authenticate();
            //
            const response = yield fetch("https://services-uswest2.sentinel-hub.com/api/v1/process", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                response.json().then(json => console.log("Response JSON:", json)).catch(console.error);
                return new ImageryError("Server Error");
            }
            console.log(response);
            const imageData = yield response.arrayBuffer();
            const json = {
                id: crypto.randomUUID(),
                images: {
                    main: {
                        data: imageData,
                        mimeType: "image/png"
                    }
                },
                bbox: params.bbox,
                date: params.date.toISOString(),
                satellite: "landsat",
                collections: ["landsat-ot-l1"]
            };
            console.log("output");
            return ImageryModel.fromJson(json);
        });
    }
    getNDVIImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                input: {
                    bounds: {
                        properties: {
                            crs: "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                        },
                        bbox: [
                            params.bbox[0][0],
                            params.bbox[0][1],
                            params.bbox[1][0],
                            params.bbox[1][1],
                        ]
                    },
                    data: [
                        {
                            type: "landsat-ot-l1",
                            dataFilter: {
                                timeRange: {
                                    from: params.date.toISOString(),
                                    to: params.date.toISOString()
                                }
                            }
                        }
                    ]
                },
                output: {
                    width: 512,
                    height: 512
                },
                evalscript: `//VERSION=3
function setup() {
  return {
    input: [{
      bands:["B04", "B05"],
    }],
    output: {
      id: "default",
      bands: 3,
    }
  }
}

function evaluatePixel(sample) {
    let ndvi = (sample.B05 - sample.B04) / (sample.B05 + sample.B04)

    if (ndvi<-0.5) return [0.05,0.05,0.05]
    else if (ndvi<-0.2) return [0.75,0.75,0.75]
    else if (ndvi<-0.1) return [0.86,0.86,0.86]
    else if (ndvi<0) return [0.92,0.92,0.92]
    else if (ndvi<0.025) return [1,0.98,0.8]
    else if (ndvi<0.05) return [0.93,0.91,0.71]
    else if (ndvi<0.075) return [0.87,0.85,0.61]
    else if (ndvi<0.1) return [0.8,0.78,0.51]
    else if (ndvi<0.125) return [0.74,0.72,0.42]
    else if (ndvi<0.15) return [0.69,0.76,0.38]
    else if (ndvi<0.175) return [0.64,0.8,0.35]
    else if (ndvi<0.2) return [0.57,0.75,0.32]
    else if (ndvi<0.25) return [0.5,0.7,0.28]
    else if (ndvi<0.3) return [0.44,0.64,0.25]
    else if (ndvi<0.35) return [0.38,0.59,0.21]
    else if (ndvi<0.4) return [0.31,0.54,0.18]
    else if (ndvi<0.45) return [0.25,0.49,0.14]
    else if (ndvi<0.5) return [0.19,0.43,0.11]
    else if (ndvi<0.55) return [0.13,0.38,0.07]
    else if (ndvi<0.6) return [0.06,0.33,0.04]
    else return [0,0.27,0]
}
`
            };
            var token = authenticate();
            const response = yield fetch("https://services-uswest2.sentinel-hub.com/api/v1/process", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                return new ImageryError("Server Error");
            }
            const imageData = yield response.arrayBuffer();
            const json = {
                id: crypto.randomUUID(),
                images: {
                    main: {
                        data: imageData,
                        mimeType: "image/png"
                    }
                },
                bbox: params.bbox,
                date: params.date.toISOString(),
                satellite: "landsat",
                collections: ["landsat-ot-l1"]
            };
            return ImageryModel.fromJson(json);
        });
    }
}
