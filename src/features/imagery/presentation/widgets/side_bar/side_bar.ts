
import { Widget } from "../../../../../core/widgets/widget";
import { MapWidget } from "../map_widget/map_widget";
import { bloc } from "../../pages/selection_page";
import { getNDVIImagery, getRGBImagery } from "../../state/imagery_event";
export class SideBar extends Widget {
  private map: MapWidget;
  private inputs: HTMLInputElement[] = [];

  constructor(map: MapWidget) {
    super("sidebar");
    this.map = map;
  }

  private snapToMODIS16Day(date: Date): Date {
    const epoch = new Date(Date.UTC(2000, 0, 1)); // MODIS reference
    const msPerDay = 24 * 60 * 60 * 1000;

    const daysSinceEpoch =
      Math.floor((date.getTime() - epoch.getTime()) / msPerDay);

    const compositeIndex = Math.floor(daysSinceEpoch / 16);
    const snappedDays = compositeIndex * 16;

    return new Date(epoch.getTime() + snappedDays * msPerDay);
  }


  private bindFetchButton() {
    const btn = this.root.querySelector<HTMLButtonElement>("#fetch-imagery");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const points = this.map.getPoints();

      if (points.length < 2) {
        alert("Please add 2 points before fetching imagery.");
        return;
      }


      const lats = points.map(p => p.lat);
      const lngs = points.map(p => p.lng);

      const bbox: [[number, number], [number, number]] = [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)]
      ];

      console.log("Computed bbox:", bbox);



      const SAFE_DAYS_BACK = 45;

      const safeDate = new Date(
        Date.now() - SAFE_DAYS_BACK * 24 * 60 * 60 * 1000
      );

      const date = this.snapToMODIS16Day(safeDate);

      bloc.dispatch(new getNDVIImagery(bbox, date));


    });
  }

  protected onMount() {
    this.render();
    this.bind();
    this.bindFetchButton();
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
    <h2 style='font-family: "BBH Bogle"; font-size:60px; margin-top:0; margin-bottom:8px; color:green'>
      CHECKYOURFORESTS
    </h2>
    <p style ='white-space: pre-line'>Click on the map or edit coordinates below.
      These points represent the maximum 
      and minimum corners of your selection.

    Darker greens represent areas of high vegetation and 
    light greeb areas represent less vegitated areas.</p>
    <div class="divider"></div>

    ${[0, 1].map(i => `
      <div class="input-row" style="margin-bottom: 8px;">
        <label>Point ${i}:</label>
        <input data-index="${i}" placeholder="lat, lng" />
      </div>
    `).join("")}

    <button id="fetch-imagery" style="margin-top:16px; padding:8px 12px; display:block;">
      Fetch Imagery
    </button>
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

