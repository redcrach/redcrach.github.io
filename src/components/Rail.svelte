<script>
  import { config } from "../lib/config.js";

  let { onrun } = $props();
  const years = new Date().getFullYear() - config.since;
</script>

<aside class="rail" aria-label="Track record">
  <div class="card">
    <p class="h">Track record</p>
    <div class="stat"><span class="k">status</span><span class="ok"><span class="led"></span>available</span></div>
    <div class="stat"><span class="k">upwork</span><span class="pill ok">{config.upwork.badge}</span></div>
    <div class="stat"><span class="k">earned</span><span>{config.upwork.earned}</span></div>
    <div class="stat"><span class="k">jobs · reviews</span><span>{config.upwork.jobs} · {config.upwork.reviews}</span></div>
    <div class="stat"><span class="k">in the field</span><span>{config.since} · {years}+ yrs</span></div>
  </div>

  <div class="card">
    <p class="h">Numbers from real systems</p>
    <div class="stat"><span class="k">legacy engine</span><span class="ok">~70% faster</span></div>
    <div class="stat"><span class="k">DB queries</span><span>130 → 32</span></div>
    <div class="stat"><span class="k">parcels / day</span><span>1,000+</span></div>
    <div class="stat"><span class="k">delivery uptime</span><span class="ok">100%</span></div>
    <div class="stat"><span class="k">storefront req / day</span><span>100K</span></div>
    <div class="stat"><span class="k">storefront hosting</span><span>≈ $0</span></div>
  </div>

  <div class="card">
    <p class="h">Root-Me author</p>
    <p class="small muted">{config.ctf.authored.length} realist challenges written in 2011–2012, still live: {config.ctf.authored.map((c) => c.name).join(", ")}.</p>
    <button class="cta ghost" type="button" onclick={() => onrun("ctf")}>$ ctf</button>
  </div>

  <div class="card">
    <p class="h">Codebase fighting you?</p>
    <p class="small muted">Architecture, code, servers and security, owned by one person.</p>
    <button class="cta" type="button" onclick={() => onrun("contact")}>$ contact</button>
  </div>

  <p class="small muted">This page: Svelte 5 · Vite · GitHub Actions · GitHub Pages.</p>
</aside>
