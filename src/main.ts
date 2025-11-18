import { spinup } from "./features/imagery/presentation/pages/map_test_page";

console.log("hellow")

const usecase = spinup();

(async () => {
  try {
    console.log("trying usecase ")
    const imagery = await usecase.executeRGB({
      bbox: [
        [13.822174072265625, 45.85080395917834],
        [14.55963134765625, 46.29191774991382]
      ],
      date: new Date(2025, 10, 12)
    });

    console.log("Imagery returned:", imagery);

    // Assuming your Imagery object has a property `images.main` that is a Blob or ArrayBuffer
    const data = imagery.images.get("image/png"); // Map<string, Asset>

    if (!data) throw new Error("No main image found");

    let blob: Blob;

    // If your asset is an ArrayBuffer
    if (data instanceof ArrayBuffer) {
      blob = new Blob([data], { type: "image/png" });
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
    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(img);
    });

  } catch (err) {
    console.error("Error calling executeRGB:", err);
  }
})();
