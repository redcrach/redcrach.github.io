import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// base "./" makes the build work both at https://<user>.github.io/
// and at https://<user>.github.io/<repo>/ without any changes.
export default defineConfig({
  base: "./",
  plugins: [svelte()],
});
