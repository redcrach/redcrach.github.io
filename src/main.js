import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

console.log(
  "%c[redcrach] %cAttackers read the source first. So should you. Try `ls -a` in the terminal.",
  "color:#ffb547;font-weight:bold",
  "color:inherit"
);

mount(App, { target: document.getElementById("app") });
