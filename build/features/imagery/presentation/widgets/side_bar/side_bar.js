"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBar = void 0;
const widget_1 = require("../../../../../core/widgets/widget");
const selection_page_1 = require("../../pages/selection_page");
const imagery_event_1 = require("../../state/imagery_event");
class SideBar extends widget_1.Widget {
    constructor(map) {
        super("sidebar");
        this.inputs = [];
        this.map = map;
    }
    bindFetchButton() {
        const btn = this.root.querySelector("#fetch-imagery");
        if (!btn)
            return;
        btn.addEventListener("click", () => {
            const points = this.map.getPoints();
            if (points.length < 2) {
                alert("Please add 2 points before fetching imagery.");
                return;
            }
            const lats = points.map(p => p.lat);
            const lngs = points.map(p => p.lng);
            const bbox = [
                [Math.min(...lats), Math.min(...lngs)],
                [Math.max(...lats), Math.max(...lngs)]
            ];
            console.log("Computed bbox:", bbox);
            const today = new Date();
            // Subtract 7 days (7 * 24 * 60 * 60 * 1000 milliseconds)
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            selection_page_1.bloc.dispatch(new imagery_event_1.getNDVIImagery(bbox, weekAgo));
        });
    }
    onMount() {
        this.render();
        this.bind();
        this.bindFetchButton();
        this.map.onPointsChanged(points => {
            points.forEach((p, i) => {
                // 🔹 SAFETY: check for undefined points
                if (!p || !this.inputs[i])
                    return;
                this.inputs[i].value = `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
            });
        });
    }
    render() {
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
        this.inputs = Array.from(this.root.querySelectorAll("input"));
    }
    bind() {
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
exports.SideBar = SideBar;
