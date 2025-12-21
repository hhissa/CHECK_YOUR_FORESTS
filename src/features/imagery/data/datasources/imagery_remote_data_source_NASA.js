var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ImageryError } from "../../../../core/error/imagery_error";
import { ImageryModel } from "../models/imagery_model";
export class ImageryRemoteDataSource {
}
export class ImageryRemoteDataSourceWMS {
    /*
     * example function call: https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?Service=WMTS&Request=GetTile&Version=1.0.0&layer=MODIS_Terra_CorrectedReflectance_TrueColor&tilematrixset=250m&TileMatrix=6&TileCol=36&TileRow=13&TIME=2012-07-09&style=default&Format=image%2Fjpeg
     * https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor&TIME=2025-11-12&BBOX=13.822174072265625,45.85080395917834,14.55963134765625,46.29191774991382&CRS=EPSG:4326&WIDTH=512&HEIGHT=512&FORMAT=image/png
     * */
    getRGBImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const wmsBase = "https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi";
            try {
                const width = params.width || 512;
                const height = params.height || 512;
                const bbox = `${params.bbox[0][0]},${params.bbox[0][1]},${params.bbox[1][0]},${params.bbox[1][1]}`;
                const time = params.date.toISOString().split("T")[0];
                const url = `${wmsBase}?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0` +
                    `&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor` +
                    `&TIME=${time}` +
                    `&BBOX=${bbox}` +
                    `&CRS=EPSG:4326` +
                    `&WIDTH=${width}&HEIGHT=${height}` +
                    `&FORMAT=image/png`;
                console.log(url);
                const response = yield fetch(url);
                if (!response.ok)
                    return new ImageryError("Failed to fetch RGB imagery");
                const imageData = yield response.arrayBuffer();
                return ImageryModel.fromJson({
                    id: crypto.randomUUID(),
                    images: { main: { data: imageData, mimeType: "image/png" } },
                    bbox: params.bbox,
                    date: time,
                    satellite: "MODIS",
                    collections: ["MODIS_Terra_CorrectedReflectance_TrueColor"]
                });
            }
            catch (err) {
                console.error(err);
                return new ImageryError("Server Error");
            }
        });
    }
    getNDVIImagery(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const wmsBase = "https://gibs.earthdata.nasa.gov/wms/epsg4326/all/wms.cgi";
            try {
                const width = params.width || 512;
                const height = params.height || 512;
                const bbox = `${params.bbox[0][0]},${params.bbox[0][1]},${params.bbox[1][0]},${params.bbox[1][1]}`;
                const time = params.date.toISOString().split("T")[0];
                // Fetch Red and NIR bands
                const NDVILayer = "MODIS_Terra_L3_NDVI_16Day";
                const NDVIUrl = `${wmsBase}?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${NDVILayer}&TIME=${time}&BBOX=${bbox}&CRS=EPSG:4326&WIDTH=${width}&HEIGHT=${height}&FORMAT=image/png`;
                console.log(NDVIUrl);
                const ndviResp = yield fetch(NDVIUrl);
                if (!ndviResp || !ndviResp.ok) {
                    console.error("Red band fetch failed", ndviResp);
                    return new ImageryError("Failed to fetch Red band");
                }
                const ndviData = yield ndviResp.arrayBuffer();
                return ImageryModel.fromJson({
                    id: crypto.randomUUID(),
                    images: {
                        ndvi: { data: ndviData, mimeType: "image/jpg" },
                    },
                    bbox: params.bbox,
                    date: time,
                    satellite: "MODIS",
                    collections: [NDVILayer]
                });
            }
            catch (err) {
                console.error(err);
                return new ImageryError("Server Error");
            }
        });
    }
}
