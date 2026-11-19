import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

console.log(
  "%c[redcrach] %cAttackers read the source first. So should you. Try `ls -a` in the terminal.",
  "color:#ffb547;font-weight:bold",
  "color:inherit"
);

// index.html ships a prerendered copy of the page for crawlers and no-JS visitors.
// Svelte renders the same markup, so swap it out before mounting.
const target = document.getElementById("app");
target.textContent = "";
mount(App, { target });
