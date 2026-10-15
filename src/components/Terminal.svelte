<script>
  import { onMount, tick } from "svelte";
  import { config } from "../lib/config.js";
  import { createShell, CHIPS } from "../lib/commands.js";

  let blocks = $state([]);
  let value = $state("");
  let screenEl;
  let inputEl;
  let seq = 0;

  const reduce =
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = () =>
    typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches;

  async function scrollDown() {
    await tick();
    if (screenEl) screenEl.scrollTop = screenEl.scrollHeight;
  }

  function print(html) {
    blocks.push({ id: ++seq, html });
    const block = blocks[blocks.length - 1];
    scrollDown();
    return {
      append(more) {
        block.html += more;
        scrollDown();
      },
    };
  }

  function clear() {
    blocks.length = 0;
  }

  const shell = createShell(config, { print, clear, reduce });

  export function run(cmd) {
    shell.run(cmd);
    if (finePointer()) inputEl?.focus();
  }

  onMount(() => shell.boot());

  function handleSubmit(e) {
    e.preventDefault();
    shell.run(value);
    value = "";
  }

  function handleKeydown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      value = shell.prev();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      value = shell.next();
    } else if (e.key === "Tab") {
      e.preventDefault();
      value = shell.complete(value);
    }
  }

  function handleClick(e) {
    const runBtn = e.target.closest("[data-run]");
    if (runBtn) {
      run(runBtn.dataset.run);
      return;
    }
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      const text = copyBtn.dataset.copy;
      const done = () => {
        copyBtn.textContent = "copied";
        setTimeout(() => (copyBtn.textContent = "copy"), 1500);
      };
      const fallback = () => {
        const target = copyBtn.previousElementSibling;
        if (!target) return;
        const sel = getSelection();
        const range = document.createRange();
        range.selectNodeContents(target);
        sel.removeAllRanges();
        sel.addRange(range);
        copyBtn.textContent = "selected";
      };
      try {
        navigator.clipboard.writeText(text).then(done, fallback);
      } catch {
        fallback();
      }
      return;
    }
    if (e.target.closest(".screen") && !getSelection().toString() && finePointer()) inputEl?.focus();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<section class="term" aria-label="Interactive terminal" onclick={handleClick}>
  <div class="bar">
    <div class="dots" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="path">{shell.user}: ~</div>
    <div aria-hidden="true">zsh</div>
  </div>

  <div class="screen" bind:this={screenEl} aria-live="polite">
    {#each blocks as block (block.id)}
      <div class="block">{@html block.html}</div>
    {/each}
  </div>

  <form class="prompt" autocomplete="off" onsubmit={handleSubmit}>
    <label for="cmd">{shell.user}:~$</label>
    <input
      id="cmd"
      name="cmd"
      bind:this={inputEl}
      bind:value
      onkeydown={handleKeydown}
      spellcheck="false"
      autocapitalize="off"
      placeholder="type a command, e.g. help"
    />
  </form>

  <div class="chips">
    <span>try:</span>
    {#each CHIPS as [cmd, hot]}
      <button type="button" class="chip" class:hot data-run={cmd}>{cmd}</button>
    {/each}
  </div>
</section>
