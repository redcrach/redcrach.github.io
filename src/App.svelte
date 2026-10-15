<script>
  import Terminal from "./components/Terminal.svelte";
  import Rail from "./components/Rail.svelte";
  import { config } from "./lib/config.js";

  let terminal = $state();
</script>

<div class="wrap">
  <div class="grid">
    <Terminal bind:this={terminal} />
    <Rail onrun={(cmd) => terminal.run(cmd)} />
  </div>
  <p class="foot">{config.name} · {config.handle} · {config.location}</p>
</div>
