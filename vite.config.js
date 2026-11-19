import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { config } from "./src/lib/config.js";
import { renderHome } from "./src/lib/home.js";

// Prerender the scroll page into index.html so recruiters' link previews,
// Google and no-JS visitors see the real content, not an empty <div>.
const prerender = () => ({
  name: "prerender-home",
  transformIndexHtml: (html) =>
    html.replace('<div id="app"></div>', `<div id="app"><div class="home">${renderHome(config)}</div></div>`),
});

// base "./" makes the build work both at https://<user>.github.io/
// and at https://<user>.github.io/<repo>/ without any changes.
export default defineConfig({
  base: "./",
  plugins: [svelte(), prerender()],
});
