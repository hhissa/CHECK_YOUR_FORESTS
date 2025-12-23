import { Widget } from "../../../../../core/widgets/widget";

export class MapWidget extends Widget {
  public map: L.Map;
  public markers: L.Marker[] = [];
  private pointListeners: ((points: L.LatLng[]) => void)[] = [];

  constructor() {
    super("map_widget");
    this.map = L.map('map').setView([50.5, -0.09], 5);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    }).addTo(this.map);

    this.map.on("click", this.onClick)

  }

  //--------------------%%Listener Behaviour%%---------------------------
  public onPointsChanged(cb: (points: L.LatLng[]) => void) {
    this.pointListeners.push(cb);
  }

  private emitPointsChanged() {
    const points = this.getPoints();
    if (points instanceof Error) return;
    this.pointListeners.forEach(cb => cb(points));
  }


  //---------------------%%Marker Behaviour%%----------------------------
  private onClick = (e: L.LeafletMouseEvent) => {

    const marker = L.marker(e.latlng, { draggable: true }).addTo(this.map);
    this.markers.push(marker);

    // 🔹 ADD: listen to drag
    marker.on("dragend", () => {
      this.emitPointsChanged();
    });

    if (this.markers.length > 2) {
      const oldest = this.markers.shift();
      oldest?.remove();

    }

    this.emitPointsChanged();
  };

  public getPoints() {

    return this.markers.map(m => m.getLatLng());
  }

  public setPoint(index: number, lat: number, lng: number) {
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
