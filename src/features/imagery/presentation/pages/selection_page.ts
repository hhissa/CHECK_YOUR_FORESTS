import { NetworkTest } from "../../../../core/network_test";
import { ImageryLocalDataSource, ImageryLocalDataSourceImpl } from "../../data/datasources/imagery_local_data_source";
import { ImageryRemoteDataSource, ImageryRemoteDataSourceWMS } from "../../data/datasources/imagery_remote_data_source_NASA";
import { ImageryRepositoryImpl } from "../../data/repositories/imagery_repository";
import { GetImagery } from "../../domain/usecases/imagery_usecase";
import { ImageryBloc } from "../state/imagery_bloc";
import { Empty, Loading, Loaded } from "../state/imagery_state";
import { getRGBImagery } from "../state/imagery_event";

var remotedatasource = new ImageryRemoteDataSourceWMS();
var localdatasource = new ImageryLocalDataSourceImpl();
var networktest = new NetworkTest();
var repo = new ImageryRepositoryImpl(remotedatasource, localdatasource, networktest);
var usecase = new GetImagery(repo);

export const bloc = new ImageryBloc(usecase);

let map: L.Map | null = null;

bloc.subscribe((state) => {
  if (state instanceof Empty) {
    console.log("Empty");
    if (!map) {
      map = L.map('map').setView([50.5, -0.09], 5);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);
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
    // If it's already a Blob 
    else {
      throw new Error("Unsupported image data type");
    }

    // Display image
    const url = URL.createObjectURL(blob);

    const img = document.createElement("img");
    img.src = url;
    img.alt = "RGB Image";
    img.width = 512;
    img.height = 512;

    img.style.position = "fixed";
    img.style.top = "10px";
    img.style.right = "10px";
    img.style.zIndex = "10000";
    img.style.border = "2px solid red";
    img.style.background = "white";

    document.body.appendChild(img); // optional



  }

  if (state instanceof Error) {
    console.error(state.message);
  }
});



bloc.dispatch(
  new getRGBImagery(
    [
      [13.822174072265625, 45.85080395917834],
      [14.55963134765625, 46.29191774991382]
    ],
    new Date(2025, 10, 12)

  )
);


