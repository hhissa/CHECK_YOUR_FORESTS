import { NetworkTest } from "../../../../core/network_test";
import { ImageryLocalDataSource, ImageryLocalDataSourceImpl } from "../../data/datasources/imagery_local_data_source";
import { ImageryRemoteDataSource, ImageryRemoteDataSourceWMS } from "../../data/datasources/imagery_remote_data_source_NASA";
import { ImageryRepositoryImpl } from "../../data/repositories/imagery_repository";
import { GetImagery } from "../../domain/usecases/imagery_usecase";
import { ImageryBloc } from "../state/imagery_bloc";
import { Empty, Loading, Loaded } from "../state/imagery_state";
import { getRGBImagery } from "../state/imagery_event";
import { MapWidget } from "../widgets/map_widget/map_widget";
import { SideBar } from "../widgets/side_bar/side_bar";

var remotedatasource = new ImageryRemoteDataSourceWMS();
var localdatasource = new ImageryLocalDataSourceImpl();
var networktest = new NetworkTest();
var repo = new ImageryRepositoryImpl(remotedatasource, localdatasource, networktest);
var usecase = new GetImagery(repo);

export const bloc = new ImageryBloc(usecase);

let map: MapWidget | null = null;
let sideBar: SideBar | null = null;


bloc.subscribe((state) => {
  if (state instanceof Empty) {
    console.log("Empty");
    if (!map) {
      map = new MapWidget();
      const mapRoot = document.getElementById("map")!;
      map.mount(mapRoot);
    }

    if (!sideBar) {
      sideBar = new SideBar(map);
      const sideBarRoot = document.getElementById(("sidebar"))!;
      sideBar.mount(sideBarRoot)
    }
  }

  if (state instanceof Loading) {
    console.log("Loading imagery...");
  }

  if (state instanceof Loaded) {
    let blob: Blob;
    let imageEntry = state.imagery;
    let imageData = imageEntry.images.get("main");
    console.log(imageData);
    // If your asset is an ArrayBuffer
    if (imageData.data instanceof ArrayBuffer) {
      blob = new Blob([imageData.data], { type: imageData.mimeType });
    }
    else {
      throw new Error("Unsupported image data type");
    }
    // Display image
    const url = URL.createObjectURL(blob);

    var imageOverlay = L.imageOverlay(url, L.latLngBounds(imageEntry.bbox));
    imageOverlay.addTo(map?.map);


  }

  if (state instanceof Error) {
    console.error(state.message);
  }
});



bloc.dispatch(
  new getRGBImagery(
    [
      [13.822174072265625, 45.85080395917834],
      [20.5596313476562, 66.29191774991382]
    ],
    new Date(2025, 10, 12)

  )
);


