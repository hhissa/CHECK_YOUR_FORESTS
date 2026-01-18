import { ImageryError } from "../../../../core/error/imagery_error";
import { ImageryModel } from "../models/imagery_model";


export abstract class ImageryRemoteDataSource {
  abstract getRGBImagery(params: Params): Promise<ImageryModel>;
  abstract getNDVIImagery(params: Params): Promise<ImageryModel>;
}

interface Params {
  date: Date;
  bbox: [[number, number], [number, number]]; // [[minLon, minLat], [maxLon, maxLat]]
  width?: number;
  height?: number;
}





export class ImageryRemoteDataSourceWMS implements ImageryRemoteDataSource {

  /* 
   * example function call: https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?Service=WMTS&Request=GetTile&Version=1.0.0&layer=MODIS_Terra_CorrectedReflectance_TrueColor&tilematrixset=250m&TileMatrix=6&TileCol=36&TileRow=13&TIME=2012-07-09&style=default&Format=image%2Fjpeg
   * https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor&TIME=2025-11-12&BBOX=13.822174072265625,45.85080395917834,14.55963134765625,46.29191774991382&CRS=EPSG:4326&WIDTH=512&HEIGHT=512&FORMAT=image/png
   * */
  public async getRGBImagery(params: Params): Promise<ImageryModel> {
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
      const response = await fetch(url);
      if (!response.ok) return new ImageryError("Failed to fetch RGB imagery");

      const imageData = await response.arrayBuffer();

      return ImageryModel.fromJson({
        id: crypto.randomUUID(),
        images: { main: { data: imageData, mimeType: "image/png" } },
        bbox: params.bbox,
        date: time,
        satellite: "MODIS",
        collections: ["MODIS_Terra_CorrectedReflectance_TrueColor"]
      });
    } catch (err) {
      console.error(err);
      return new ImageryError("Server Error");
    }
  }

  public async getNDVIImagery(params: Params): Promise<ImageryModel> {
    const wmsBase = "https://gibs.earthdata.nasa.gov/wms/epsg4326/all/wms.cgi";
    try {
      const width = params.width || 512;
      const height = params.height || 512;
      const bbox = `${params.bbox[0][0]},${params.bbox[0][1]},${params.bbox[1][0]},${params.bbox[1][1]}`;
      const time = params.date.toISOString().split("T")[0];

      // Fetch Red and NIR bands
      const NDVILayer = "MODIS_Terra_L3_NDVI_16Day";

      const NDVIUrl = `${wmsBase}?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${NDVILayer}&TIME=${time}&BBOX=${bbox}&CRS=EPSG:4326&WIDTH=${width}&HEIGHT=${height}&STYLES=&TRANSPARENT=FALSE&FORMAT=image/png`;
      console.log(NDVIUrl)
      const ndviResp = await fetch(NDVIUrl);

      if (!ndviResp || !ndviResp.ok) {
        console.error("Red band fetch failed", ndviResp);
        return new ImageryError("Failed to fetch Red band");
      }


      const ndviData = await ndviResp.arrayBuffer();

      return ImageryModel.fromJson({
        id: crypto.randomUUID(),
        images: {
          ndvi: { data: ndviData, mimeType: "image/png" },
        },
        bbox: params.bbox,
        date: time,
        satellite: "MODIS",
        collections: [NDVILayer]
      });

    } catch (err) {
      console.error(err);
      return new ImageryError("Server Error");
    }
  }
}
