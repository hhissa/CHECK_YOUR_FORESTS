var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NetworkTest } from "../../../../core/network_test";
import { ImageryLocalDataSourceImpl } from "../../data/datasources/imagery_local_data_source";
import { ImageryRemoteDataSourceWMS } from "../../data/datasources/imagery_remote_data_source_NASA";
import { ImageryRepositoryImpl } from "../../data/repositories/imagery_repository";
import { GetImagery } from "../../domain/usecases/imagery_usecase";
import { ImageryBloc } from "../state/imagery_bloc";
import { Empty, Loading, Loaded } from "../state/imagery_state";
import { MapWidget } from "../widgets/map_widget/map_widget";
import { SideBar } from "../widgets/side_bar/side_bar";
var remotedatasource = new ImageryRemoteDataSourceWMS();
var localdatasource = new ImageryLocalDataSourceImpl();
var networktest = new NetworkTest();
var repo = new ImageryRepositoryImpl(remotedatasource, localdatasource, networktest);
var usecase = new GetImagery(repo);
export const bloc = new ImageryBloc(usecase);
let map = null;
let sideBar = null;
let currentImageOverlay = null;
bloc.subscribe((state) => __awaiter(void 0, void 0, void 0, function* () {
    if (state instanceof Empty) {
        console.log("Empty");
        if (!map) {
            map = new MapWidget();
            const mapRoot = document.getElementById("map");
            map.mount(mapRoot);
        }
        if (!sideBar) {
            sideBar = new SideBar(map);
            const sideBarRoot = document.getElementById(("sidebar"));
            sideBar.mount(sideBarRoot);
            let lastCenter = map.map.getCenter();
            map.map.on("move", () => {
                const center = map.map.getCenter();
                const lastPoint = map.map.latLngToContainerPoint(lastCenter);
                const currentPoint = map.map.latLngToContainerPoint(center);
                const dx = currentPoint.x - lastPoint.x;
                const dy = currentPoint.y - lastPoint.y;
                const swayX = Math.max(-15, Math.min(15, dx * 0.3));
                const swayY = Math.max(-15, Math.min(15, dy * 0.3));
                sideBarRoot.style.transform = `translate(${swayX}px, ${swayY}px)`;
                lastCenter = center;
            });
        }
    }
    if (state instanceof Loading) {
        console.log("Loading imagery...");
    }
    if (state instanceof Loaded) {
        let blob;
        const imageEntry = state.imagery;
        const imageData = imageEntry.images.get("ndvi");
        if (!(imageData.data instanceof ArrayBuffer)) {
            throw new Error("Unsupported image data type");
        }
        blob = new Blob([imageData.data], { type: imageData.mimeType });
        const url = URL.createObjectURL(blob);
        if (currentImageOverlay) {
            map === null || map === void 0 ? void 0 : map.map.removeLayer(currentImageOverlay);
            currentImageOverlay = null;
        }
        currentImageOverlay = L.imageOverlay(url, L.latLngBounds([imageEntry.bbox[0][0], imageEntry.bbox[0][1]], [imageEntry.bbox[1][0], imageEntry.bbox[1][1]]));
        currentImageOverlay.addTo(map.map);
    }
    if (state instanceof Error) {
        console.error(state.message);
    }
}));
