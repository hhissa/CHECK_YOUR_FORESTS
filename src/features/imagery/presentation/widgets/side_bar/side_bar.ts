
import { Widget } from "../../../../../core/widgets/widget";
import { MapWidget } from "../map_widget/map_widget";

export class SideBar extends Widget {
  private map: MapWidget;
  private inputs: HTMLInputElement[] = [];

  constructor(map: MapWidget) {
    super("sidebar");
    this.map = map;
  }

  protected onMount() {
    this.render();
    this.bind();

    this.map.onPointsChanged(points => {
      points.forEach((p, i) => {
        // 🔹 SAFETY: check for undefined points
        if (!p || !this.inputs[i]) return;
        this.inputs[i].value = `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
      });


    });
  }

  private render() {
    this.root.innerHTML = `
      <h2>Points</h2>
      <p>Click on the map or edit coordinates below.</p>
      <div class="divider"></div>
      ${[0, 1, 2, 3].map(i => `
        <input data-index="${i}" placeholder="lat, lng" />
      `).join("")}
    `;

    this.inputs = Array.from(
      this.root.querySelectorAll("input")
    );
  }

  private bind() {
    this.inputs.forEach(input => {
      input.addEventListener("change", () => {
        const index = Number(input.dataset.index);
        const [lat, lng] = input.value.split(",").map(Number);

        if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
          this.map.setPoint(index, lat, lng);
        }
      });
    });
  }
}

