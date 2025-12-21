import { Widget } from "../../../../../core/widgets/widget";
export class MapWidget extends Widget {
    constructor() {
        super("map_widget");
        this.markers = [];
        this.pointListeners = [];
        //---------------------%%Marker Behaviour%%----------------------------
        this.onClick = (e) => {
            const icon = L.icon({
                iconUrl: '../../../../../assets/Pasted image.png',
                iconSize: [30, 35], // size of the icon
                iconAnchor: [10, 34], // point of the icon which will correspond to marker's location
            });
            const marker = L.marker(e.latlng, { draggable: true, icon: icon }).addTo(this.map);
            this.markers.push(marker);
            // 🔹 ADD: listen to drag
            marker.on("dragend", () => {
                this.emitPointsChanged();
            });
            if (this.markers.length > 2) {
                const oldest = this.markers.shift();
                oldest === null || oldest === void 0 ? void 0 : oldest.remove();
            }
            this.emitPointsChanged();
        };
        this.map = L.map('map').setView([50.5, -0.09], 5);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }).addTo(this.map);
        this.map.on("click", this.onClick);
    }
    //--------------------%%Listener Behaviour%%---------------------------
    onPointsChanged(cb) {
        this.pointListeners.push(cb);
    }
    emitPointsChanged() {
        const points = this.getPoints();
        if (points instanceof Error)
            return;
        this.pointListeners.forEach(cb => cb(points));
    }
    getPoints() {
        return this.markers.map(m => m.getLatLng());
    }
    setPoint(index, lat, lng) {
        const marker = this.markers[index];
        if (!marker) {
            const icon = L.icon({
                iconUrl: '../../../../../assets/Pasted image.png',
                iconSize: [30, 35], // size of the icon
                iconAnchor: [10, 34], // point of the icon which will correspond to marker's location
            });
            const marker = L.marker([1, 1], { draggable: true, icon: icon }).addTo(this.map);
            this.markers.push(marker);
        }
        marker.setLatLng([lat, lng]);
        this.emitPointsChanged();
    }
}
