import { defineConfig} from 'vite';
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig
({

  base: "/CHECK_YOUR_FORESTS/",
  build
: {
    rollupOptions
: {
      input
: {
        main: resolve(__dirname, 'index.html'),
        splashscreen: resolve(__dirname, 'src/pages/splash_screen.html'),
        selectionscreen: resolve(__dirname, 'src/pages/selection_page.html')
      },
    },
  },
})
