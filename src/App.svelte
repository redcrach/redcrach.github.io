<script>
  import { onMount, tick } from "svelte";
  import Terminal from "./components/Terminal.svelte";
  import Rail from "./components/Rail.svelte";
  import { config } from "./lib/config.js";
  import { renderHome } from "./lib/home.js";

  // Two views of the same config: the scroll page (default) and the terminal.
  // The terminal lives at #terminal, and the backtick key toggles it.
  const home = renderHome(config);
  const isTerminalHash = () => location.hash === "#terminal";

  let view = $state(isTerminalHash() ? "terminal" : "page");
  let terminal = $state();

  async function show(next) {
    if (next === view) return;
    view = next;
    if (next === "terminal") history.pushState(null, "", "#terminal");
    else history.pushState(null, "", location.pathname + location.search);
    await tick();
    window.scrollTo(0, 0);
  }

  function handleClick(e) {
    const btn = e.target.closest("[data-view]");
    if (btn) show(btn.dataset.view);
  }

  onMount(() => {
    const sync = () => {
      if (isTerminalHash()) view = "terminal";
      else if (view === "terminal") view = "page";
    };
    const onKey = (e) => {
      if (e.key !== "`" || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      show(view === "terminal" ? "page" : "terminal");
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("keydown", onKey);
    };
  });
</script>

{#if view === "terminal"}
  <div class="wrap">
    <div class="term-top">
      <button type="button" class="btn ghost sm" onclick={() => show("page")}>← Back to the page</button>
      <span class="muted small">Press <kbd>`</kbd> to switch views</span>
    </div>
    <div class="grid">
      <Terminal bind:this={terminal} />
      <Rail onrun={(cmd) => terminal?.run(cmd)} />
    </div>
    <p class="foot">{config.name} · {config.handle} · {config.location}</p>
  </div>
{:else}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="home" onclick={handleClick}>
    {@html home}
  </div>
{/if}
