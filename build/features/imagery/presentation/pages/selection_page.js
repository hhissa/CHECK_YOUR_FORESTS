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
exports.bloc = void 0;
const network_test_1 = require("../../../../core/network_test");
const imagery_local_data_source_1 = require("../../data/datasources/imagery_local_data_source");
const imagery_remote_data_source_NASA_1 = require("../../data/datasources/imagery_remote_data_source_NASA");
const imagery_repository_1 = require("../../data/repositories/imagery_repository");
const imagery_usecase_1 = require("../../domain/usecases/imagery_usecase");
const imagery_bloc_1 = require("../state/imagery_bloc");
const imagery_state_1 = require("../state/imagery_state");
const map_widget_1 = require("../widgets/map_widget/map_widget");
const side_bar_1 = require("../widgets/side_bar/side_bar");
var remotedatasource = new imagery_remote_data_source_NASA_1.ImageryRemoteDataSourceWMS();
var localdatasource = new imagery_local_data_source_1.ImageryLocalDataSourceImpl();
var networktest = new network_test_1.NetworkTest();
var repo = new imagery_repository_1.ImageryRepositoryImpl(remotedatasource, localdatasource, networktest);
var usecase = new imagery_usecase_1.GetImagery(repo);
exports.bloc = new imagery_bloc_1.ImageryBloc(usecase);
let map = null;
let sideBar = null;
let currentImageOverlay = null;
exports.bloc.subscribe((state) => __awaiter(void 0, void 0, void 0, function* () {
    if (state instanceof imagery_state_1.Empty) {
        console.log("Empty");
        if (!map) {
            map = new map_widget_1.MapWidget();
            const mapRoot = document.getElementById("map");
            map.mount(mapRoot);
        }
        if (!sideBar) {
            sideBar = new side_bar_1.SideBar(map);
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
    if (state instanceof imagery_state_1.Loading) {
        console.log("Loading imagery...");
    }
    if (state instanceof imagery_state_1.Loaded) {
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
