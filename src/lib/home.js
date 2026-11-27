// The scroll page, built as plain HTML from config.js.
// Used twice: by vite.config.js to prerender it into index.html (so recruiters,
// Google and link previews see real content), and by App.svelte at runtime.

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const tags = (list) => `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

const label = (cmd) => `<p class="label"><span aria-hidden="true">&gt;</span> ${esc(cmd)}<span class="cursor" aria-hidden="true">_</span></p>`;

export function renderHome(cfg) {
  const call = cfg.booking
    ? `<a class="btn" href="${esc(cfg.booking)}" target="_blank" rel="noopener">Book a 30-min call</a>`
    : "";
  const mail = `<a class="btn ghost" href="mailto:${esc(cfg.email)}">Email me</a>`;
  const cv = cfg.cv ? `<a class="btn ghost" href="${esc(cfg.cv)}" download>Download CV (PDF)</a>` : "";
  // Plain-HTML summary in the first screen, so recruiters get the facts without the terminal.
  const [now, before] = cfg.experience;
  const company = (org) => org.split(" · ")[0];
  const glance = `
    <dl class="glance">
      <div><dt>Now</dt><dd>${esc(now[1])}, ${esc(company(now[2]))} <span class="muted when">· ${esc(now[0])}</span></dd></div>
      <div><dt>Before</dt><dd>${esc(before[1])}, ${esc(company(before[2]))} <span class="muted when">· ${esc(before[0])}</span></dd></div>
      <div><dt>Based in</dt><dd>${esc(cfg.location)}</dd></div>
      <div><dt>Contact</dt><dd><a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a> · <a href="https://t.me/${esc(cfg.telegram)}" target="_blank" rel="noopener">Telegram @${esc(cfg.telegram)}</a></dd></div>
    </dl>`;
  const term = `<button type="button" class="linkish" data-view="terminal">or open the terminal <kbd>\`</kbd></button>`;

  const nav = `
  <header class="nav">
    <a class="brand" href="#top"><span class="led"></span>${esc(cfg.handle)}</a>
    <nav aria-label="Sections">
      <a href="#results">Results</a>
      <a href="#skills">Skills</a>
      <a href="#work">Work</a>
      <a href="#faq">FAQ</a>
    </nav>
    <div class="nav-cta">
      <button type="button" class="btn ghost sm" data-view="terminal">$ terminal</button>
      ${cfg.booking ? `<a class="btn sm" href="${esc(cfg.booking)}" target="_blank" rel="noopener">Book a call</a>` : ""}
    </div>
  </header>`;

  const hero = `
  <section class="hero" id="top">
    ${label("whoami")}
    <h1 class="hero-title">${esc(cfg.name)}</h1>
    <p class="hero-role">${esc(cfg.role)}</p>
    <p class="hero-lede">${esc(cfg.tagline)}</p>
    <ul class="badges">
      <li><span class="led"></span>${esc(cfg.available)}</li>
      <li>In production since ${esc(cfg.productionSince)}</li>
      <li>${esc(cfg.upwork.badge)} on Upwork · ${esc(cfg.upwork.jobs)} jobs · ${esc(cfg.upwork.earned)}</li>
    </ul>
    ${glance}
    <div class="actions">${call}${mail}${cv}${term}</div>
  </section>`;

  const stats = `
  <section id="results" class="sec">
    ${label("stats --production")}
    <h2>Results from real systems</h2>
    <div class="stats">
      ${cfg.stats
        .map(
          ([n, what, how]) => `
        <div class="stat-card">
          <p class="n">${esc(n)}</p>
          <p class="what">${esc(what)}</p>
          <p class="how">${esc(how)}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>`;

  const skills = `
  <section id="skills" class="sec">
    ${label("skills --all")}
    <h2>What I work with</h2>
    <div class="cards">
      ${cfg.skillCards
        .map(
          (c) => `
        <article class="card skill-card">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.text)}</p>
          ${tags(c.tags)}
        </article>`
        )
        .join("")}
    </div>
  </section>`;

  const work = `
  <section id="work" class="sec">
    ${label("projects")}
    <h2>Case studies</h2>
    <div class="cases">
      ${cfg.projects
        .map(
          (p, i) => `
        <article class="card case" id="${esc(p.id)}">
          <p class="case-n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</p>
          <h3>${esc(p.title)}</h3>
          <p class="case-client">${esc(p.client)}</p>
          <ul class="results">${p.result.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
          <details>
            <summary>Problem and what I did</summary>
            <p><strong>Problem.</strong> ${esc(p.problem)}</p>
            <p><strong>What I did.</strong> ${esc(p.did)}</p>
          </details>
          ${tags(p.stack)}
        </article>`
        )
        .join("")}
    </div>
  </section>`;

  const inc = cfg.incident;
  const incident = inc
    ? `
  <section id="incident" class="sec">
    ${label("cat incident.log")}
    <h2>${esc(inc.title)}</h2>
    <div class="card incident">
      ${inc.story.map((p) => `<p>${esc(p)}</p>`).join("")}
      <p class="after"><span class="ok">resolved:</span> ${esc(inc.after)}</p>
    </div>
  </section>`
    : "";

  const reviews = `
  <section id="reviews" class="sec">
    ${label("reviews")}
    <h2>What clients say</h2>
    <div class="quotes">
      ${cfg.reviews
        .map(
          ([who, text, flag]) => `
        <figure class="card quote${flag === "minor" ? " minor" : ""}">
          <blockquote>${esc(text)}</blockquote>
          <figcaption>${esc(who)}</figcaption>
        </figure>`
        )
        .join("")}
    </div>
    <p class="muted small">${esc(cfg.upwork.badge)} · ${esc(cfg.upwork.jobs)} jobs · ${esc(cfg.upwork.reviews)} reviews · ${esc(cfg.upwork.earned)} earned · <a href="${esc(cfg.links.Upwork)}" target="_blank" rel="noopener">Upwork profile</a></p>
  </section>`;

  const exp = `
  <section id="experience" class="sec">
    ${label("experience")}
    <h2>Experience</h2>
    <ol class="timeline">
      ${cfg.experience
        .map(
          ([when, title, org, note]) => `
        <li>
          <p class="when">${esc(when)}</p>
          <div>
            <p class="t">${esc(title)}</p>
            <p class="org">${esc(org)}</p>
            <p class="muted">${esc(note)}</p>
          </div>
        </li>`
        )
        .join("")}
    </ol>
  </section>`;

  const faq = `
  <section id="faq" class="sec">
    ${label("man hafid")}
    <h2>Questions people ask</h2>
    <div class="faq">
      ${cfg.faq.map(([q, a]) => `<details class="card"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    </div>
  </section>`;

  const terms = `
  <section id="terms" class="sec">
    ${label("cat terms.txt")}
    <h2>How we'd work</h2>
    <dl class="terms">
      ${cfg.terms
        .map(([k, v, flag]) => `<div class="card"><dt>${esc(k)}</dt><dd${flag === "todo" ? ' class="todo"' : ""}>${esc(v)}</dd></div>`)
        .join("")}
    </dl>
  </section>`;

  const cta = `
  <section class="sec final">
    ${label("sudo hire-me")}
    <h2>Have a codebase that's fighting you?</h2>
    <p class="muted">Architecture, code, data, servers and security, owned by one person. A 30-minute call is enough to tell whether I can help.</p>
    <div class="actions">${call}${mail}${cv}</div>
  </section>`;

  const links = Object.entries(cfg.links)
    .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`)
    .join("");

  const footer = `
  <footer class="footer">
    <div class="links">${links}</div>
    <p class="muted small">${esc(cfg.name)} · ${esc(cfg.handle)} · Svelte 5 · Vite · GitHub Pages · <button type="button" class="linkish" data-view="terminal">open the terminal</button></p>
  </footer>`;

  return `${nav}<main class="page">${hero}${stats}${skills}${work}${incident}${reviews}${exp}${faq}${terms}${cta}</main>${footer}`;
}
