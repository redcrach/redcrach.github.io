<script>
  import { onMount, tick } from "svelte";
  import Terminal from "./components/Terminal.svelte";
  import Rail from "./components/Rail.svelte";
  import { config } from "./lib/config.js";
  import { renderHome } from "./lib/home.js";

  // The scroll page is the "desktop". The terminal opens as a window on top of it.
  // win: "closed" (not mounted) · "open" · "min" (mounted but hidden, keeps its history)
  const home = renderHome(config);
  const TERM_HASH = "#terminal";

  let win = $state("closed");
  let maximized = $state(false);
  let pos = $state({ x: 0, y: 0 });
  let terminal = $state();
  let winEl = $state();

  const setHash = (on) => {
    const url = on ? TERM_HASH : location.pathname + location.search;
    if ((location.hash === TERM_HASH) !== on) history.replaceState(null, "", url);
  };

  async function openTerminal() {
    if (win === "closed") pos = { x: 0, y: 0 };
    win = "open";
    setHash(true);
    await tick();
    terminal?.focus();
  }

  function minimize() {
    win = "min";
    setHash(false);
  }

  function close() {
    win = "closed";
    maximized = false;
    setHash(false);
  }

  function toggleMax() {
    maximized = !maximized;
  }

  // Drag the window by its title bar (desktop only, not when maximized).
  function dragStart(e) {
    if (maximized || e.button !== 0 || e.target.closest("button")) return;
    if (!matchMedia("(min-width: 761px)").matches || !winEl) return;
    e.preventDefault();
    const r = winEl.getBoundingClientRect();
    const start = { cx: e.clientX, cy: e.clientY, x: pos.x, y: pos.y };
    const move = (ev) => {
      const left = Math.min(Math.max(r.left + ev.clientX - start.cx, 120 - r.width), innerWidth - 120);
      const top = Math.min(Math.max(r.top + ev.clientY - start.cy, 0), innerHeight - 48);
      pos = { x: start.x + left - r.left, y: start.y + top - r.top };
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  function handlePageClick(e) {
    if (e.target.closest('[data-view="terminal"]')) openTerminal();
  }

  onMount(() => {
    if (location.hash === TERM_HASH) openTerminal();
    const onHash = () => location.hash === TERM_HASH && openTerminal();
    const onKey = (e) => {
      if (e.key === "Escape" && win === "open") {
        minimize();
        return;
      }
      if (e.key !== "`" || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, [contenteditable]")) return;
      e.preventDefault();
      win === "open" ? minimize() : openTerminal();
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="home" onclick={handlePageClick}>
  {@html home}
</div>

{#if win !== "closed"}
  <div
    class="window"
    class:maximized
    class:hidden={win === "min"}
    role="dialog"
    aria-label="Terminal"
    aria-hidden={win === "min"}
    bind:this={winEl}
    style="--dx: {pos.x}px; --dy: {pos.y}px"
  >
    <Terminal
      bind:this={terminal}
      onclose={close}
      onminimize={minimize}
      onmaximize={toggleMax}
      ondragstart={dragStart}
      {maximized}
    >
      {#snippet aside()}
        <Rail onrun={(cmd) => terminal?.run(cmd)} />
      {/snippet}
    </Terminal>
  </div>
{/if}

<button
  type="button"
  class="launcher"
  class:running={win !== "closed"}
  class:active={win === "open"}
  aria-label={win === "min" ? "Restore terminal" : "Open terminal"}
  title="Terminal ( ` )"
  onclick={() => (win === "open" ? minimize() : openTerminal())}
>
  <span aria-hidden="true">&gt;_</span>
</button>
