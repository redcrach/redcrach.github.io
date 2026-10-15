// Terminal logic. Framework-free on purpose: the Svelte UI calls into it,
// and it only talks to the screen through the `io` object it is given.

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const bars = (n) => "▰".repeat(n) + "▱".repeat(5 - n);
const rot13 = (s) =>
  s.replace(/[a-z]/gi, (ch) => {
    const base = ch <= "Z" ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + 13) % 26) + base);
  });

// The portfolio's own tiny CTF. Stored rot13'd so it isn't sitting in plain sight.
const SECRET = rot13("RED{r34d_th3_s0urc3_l1k3_4n_4tt4ck3r}");

export const CHIPS = [
  ["whoami", false],
  ["projects", false],
  ["skills", false],
  ["provision", true],
  ["deploy", false],
  ["ctf", true],
  ["reviews", false],
  ["experience", false],
  ["contact", true],
  ["help", false],
];

/**
 * @param {object} cfg  the config from config.js
 * @param {{ print(html: string): { append(html: string): void }, clear(): void, reduce?: boolean }} io
 */
export function createShell(cfg, io) {
  const user = `guest@${cfg.handle}`;
  const history = [];
  let hIdx = 0;
  let busy = false;
  const years = new Date().getFullYear() - cfg.since;

  const sleep = (ms) => new Promise((r) => setTimeout(r, io.reduce ? 0 : ms));

  async function stream(lines, delay = 320) {
    busy = true;
    const box = io.print("");
    for (const [cls, text] of lines) {
      await sleep(delay);
      box.append(`<div class="ln ${cls}">${esc(text)}</div>`);
    }
    busy = false;
  }

  const link = (url, label) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label ?? url.replace(/^https?:\/\/(www\.)?/, ""))}</a>`;

  const commands = {
    help: {
      d: "list commands",
      run: () => {
        const rows = Object.entries(commands)
          .filter(([, v]) => !v.hidden)
          .map(([k, v]) => `<dt class="amber">${k}</dt><dd>${v.d}</dd>`)
          .join("");
        return `<dl class="kv">${rows}</dl><p class="muted">Tab completes, ↑/↓ walks history. Or tap the buttons below.</p>`;
      },
    },

    whoami: {
      d: "who I am, in one screen",
      run: () => `
        <div class="hero-name">${esc(cfg.name)}</div>
        <div class="hero-role">${esc(cfg.role)}</div>
        <p>${esc(cfg.summary)}</p>
        <dl class="kv">
          <dt>location</dt><dd>${esc(cfg.location)}</dd>
          <dt>experience</dt><dd>${years}+ years: web security since ${cfg.since}, production PHP since 2012</dd>
          <dt>upwork</dt><dd><span class="ok">${esc(cfg.upwork.badge)}</span> · ${cfg.upwork.jobs} jobs · ${cfg.upwork.reviews} reviews · ${esc(cfg.upwork.earned)} earned</dd>
          <dt>languages</dt><dd>${esc(cfg.languages)}</dd>
          <dt>available</dt><dd class="ok">${esc(cfg.available)}</dd>
        </dl>`,
    },

    skills: {
      d: "skills [--backend|--frontend|--devops|--security|--sysadmin]",
      run: (args) => {
        const flag = (args[0] || "").replace(/^-+/, "");
        if (flag && !cfg.skills[flag])
          return `<span class="warn">unknown flag --${esc(flag)}.</span> Try: ${Object.keys(cfg.skills).map((k) => "--" + k).join(" ")}`;
        const groups = flag ? { [flag]: cfg.skills[flag] } : cfg.skills;
        return Object.entries(groups)
          .map(
            ([g, list]) =>
              `<p class="h">${g}</p>` +
              list
                .map(
                  ([n, l, note]) =>
                    `<div class="skill"><span>${esc(n)}</span><span class="lv" aria-label="${l} of 5">${bars(l)}</span><span class="note muted">${esc(note)}</span></div>`
                )
                .join("")
          )
          .join("<br>");
      },
    },

    projects: {
      d: "case studies from real work",
      run: () =>
        cfg.projects
          .map(
            (p) => `<div class="proj"><div class="t">${esc(p.title)}</div><div class="muted">${esc(p.client)}</div>
              <div>${p.result.map((r) => `<span class="metric">✓ ${esc(r)}</span>`).join("&nbsp;&nbsp; ")}</div>
              <button type="button" class="link" data-run="cat ${p.id}">→ cat ${p.id}</button></div>`
          )
          .join(""),
    },

    cat: {
      d: "cat &lt;project&gt; — read a case study",
      run: (args) => {
        if (args[0] === ".secret")
          return `<span class="amber">${esc(SECRET)}</span><br><span class="muted">Looks scrambled. Thirteen is a lucky number. Then: submit &lt;flag&gt;</span>`;
        const p = cfg.projects.find((x) => x.id === args[0]);
        if (!p)
          return `usage: cat &lt;project&gt;<br>available: ${cfg.projects.map((x) => `<span class="amber">${x.id}</span>`).join(", ")}`;
        return `<div class="proj"><div class="t">${esc(p.title)}</div><div class="muted">${esc(p.client)}</div></div>
          <dl class="kv"><dt>problem</dt><dd>${esc(p.problem)}</dd><dt>what I did</dt><dd>${esc(p.did)}</dd>
          <dt>result</dt><dd>${p.result.map((r) => `<div class="metric">✓ ${esc(r)}</div>`).join("")}</dd>
          <dt>stack</dt><dd>${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</dd></dl>`;
      },
    },

    experience: {
      d: "work history",
      run: () =>
        `<dl class="kv">${cfg.experience
          .map(
            ([y, t, o, l]) =>
              `<dt>${esc(y)}</dt><dd><span class="amber">${esc(t)}</span> · ${esc(o)}<br><span class="muted">${esc(l)}</span></dd>`
          )
          .join("")}</dl>`,
    },

    provision: {
      d: "provision [name] — replay how my ERP cockpit onboards a client",
      run: (args) => {
        const name = (args[0] || "acme").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 20) || "acme";
        stream([
          ["muted", `→ Filament cockpit: new client "${name}"  (simulation of the real flow)`],
          ["", `Queue           ProvisionClient job dispatched`],
          ["", `Forge API       create site ${name}.erp.example, queue workers, scheduler`],
          ["", `Forge API       attach repo, write .env from secrets store, enable deploys`],
          ["", `Cloudflare API  DNS ${name}.erp.example → origin, proxied, SSL full (strict)`],
          ["", `Vercel API      deploy storefront ${name}-shop, attach domain`],
          ["", `OAuth hub       register Google connection, schedule token refresh`],
          ["", `Deploy          php artisan migrate --force, seed tenant defaults`],
          ["ok", `Health          ERP 200 · storefront 200 · orders proxy 200`],
          ["amber", `✓ client "${name}" is live. Nobody logged into a server.`],
        ]);
        return null;
      },
    },

    deploy: {
      d: "what a typical deploy of mine looks like",
      run: () => {
        stream([
          ["muted", "→ git push origin main  (illustrative)"],
          ["", "CI   composer install --no-dev · npm ci && npm run build"],
          ["ok", "CI   ✓ static analysis  ✓ test suite  ✓ composer audit clean"],
          ["", "CD   Forge zero-downtime deploy: new release directory"],
          ["", "CD   php artisan migrate --force"],
          ["", "CD   config:cache · route:cache · view:cache"],
          ["", "CD   switch current → new release, reload php-fpm, restart queue workers"],
          ["", "CDN  Cloudflare cache purge for changed assets"],
          ["ok", "HC   GET /health 200"],
          ["amber", "✓ live, zero downtime. Previous release kept for instant rollback."],
        ]);
        return null;
      },
    },

    audit: {
      d: "the checklist I run on every codebase I take over",
      run: () => {
        const items = [
          "APP_DEBUG off, APP_ENV=production, no stack traces leaking",
          "Secrets out of git, rotated after handover",
          "Mass assignment, IDOR and authorization checks on every route",
          "Raw queries reviewed for SQL injection",
          "Uploads: type, size and storage location locked down",
          "Rate limiting on login, password reset and API",
          "SSH keys only, firewall closed except 22/80/443",
          "TLS everywhere, HSTS, secure cookies, sane CSP",
          "Dependencies audited, abandoned packages replaced",
          "Backups encrypted, and a restore actually tested",
          "Config web server to disable script execution on upload folder",
        ];
        return (
          items.map((i) => `<div><span class="ok">[ CHECK ]</span> ${esc(i)}</div>`).join("") +
          `<p class="muted">I started in penetration testing, so I read code the way an attacker reads it.</p>`
        );
      },
    },

    ctf: {
      d: "where I learned to break things",
      run: () => {
        const prof = Object.entries(cfg.links)
          .filter(([k]) => /root-me|wechall|blog/i.test(k))
          .map(([k, v]) => `<dt>${esc(k.toLowerCase())}</dt><dd>${link(v)}</dd>`)
          .join("");
        const authored = cfg.ctf.authored
          .map((c) => `<div>${link(c.url, c.name)} <span class="muted">· Realist · Root-Me</span></div>`)
          .join("");
        return `<p>Before Laravel there was web security. Back in 2011–2012, as <span class="amber">RedCrach</span>, I wasn't only solving challenges on Root-Me, I was writing them. Three of my realist challenges are still on the platform today, and I published CTF write-ups as <span class="amber">Blindp0wn3rs</span>.</p>
          <p class="h">challenges I authored (2011–2012)</p>${authored}
          <dl class="kv">${prof}</dl>
          <p class="muted">The habit stuck: I find out how something really works before I change it. → <button type="button" class="link" data-run="writeups">writeups</button></p>
          <p class="h">your turn</p>
          <p>There is a flag hidden in this portfolio. Format <span class="amber">RED{...}</span>. Submit it with <span class="amber">submit &lt;flag&gt;</span>.<br><span class="muted">Hint: an attacker reads the page source first.</span></p>`;
      },
    },

    writeups: {
      d: "CTF write-ups from my Blindp0wn3rs blog (2012)",
      run: () => {
        const b = cfg.ctf.blog;
        return `<p>${link(b.url, b.name)} <span class="muted">· ${esc(b.tagline)}</span></p>
          <dl class="kv">${cfg.ctf.writeups
            .map(([ev, ch, note]) => `<dt>${esc(ch)}</dt><dd>${esc(note)}<br><span class="muted">${esc(ev)}</span></dd>`)
            .join("")}</dl>
          <p class="muted">The same instincts now go into reviewing Laravel code: injections, auth bypasses and loose comparisons are the first things I look for.</p>`;
      },
    },

    reviews: {
      d: "what clients say",
      run: () =>
        cfg.reviews
          .map(([who, text]) => `<div class="proj"><div>“${esc(text)}”</div><div class="muted">— ${esc(who)}</div></div>`)
          .join("") +
        `<p class="muted">${esc(cfg.upwork.badge)} on Upwork · ${cfg.upwork.jobs} jobs · ${cfg.upwork.reviews} reviews · ${esc(cfg.upwork.earned)} earned</p>`,
    },

    submit: {
      hidden: true,
      run: (args) => {
        const guess = args.join(" ").trim();
        if (!guess) return "usage: submit RED{...}";
        if (guess === rot13(SECRET))
          return `<span class="ok">✓ Flag accepted.</span> You read source like an attacker. We should talk: run <span class="amber">contact</span>.`;
        return `<span class="warn">✗ Wrong flag.</span> Keep digging.`;
      },
    },

    sysinfo: {
      d: "neofetch-style summary",
      run: () => `<dl class="kv">
        <dt>user</dt><dd class="amber">${esc(cfg.handle)}</dd>
        <dt>os</dt><dd>Laravel engineer, Linux native</dd>
        <dt>uptime</dt><dd>${years}+ years in production</dd>
        <dt>packages</dt><dd>${Object.values(cfg.skills).flat().length} skills across ${Object.keys(cfg.skills).length} areas</dd>
        <dt>projects</dt><dd>${cfg.projects.length} case studies → projects</dd>
        <dt>origin</dt><dd>web security & pentesting</dd></dl>`,
    },

    contact: {
      d: "how to reach me",
      run: () => `<dl class="kv">
        <dt>email</dt><dd><span class="sel">${esc(cfg.email)}</span><button class="copy" type="button" data-copy="${esc(cfg.email)}">copy</button></dd>
        ${Object.entries(cfg.links).map(([k, v]) => `<dt>${esc(k.toLowerCase())}</dt><dd>${link(v)}</dd>`).join("")}
        </dl>
        <p>Have a codebase that's fighting you, or an idea that needs to be built properly? Send me the details and I'll tell you honestly what I'd tackle first. A short call is usually enough to scope it.</p>`,
    },

    ls: {
      d: "list files",
      run: (args) =>
        (args.includes("-a") || args.includes("-la") ? `<span class="muted">.</span>  <span class="muted">..</span>  <span class="amber">.secret</span>  ` : "") +
        `<span class="amber">projects/</span>  <span class="amber">skills/</span>  about.md  contact.txt  audit.log`,
    },

    history: {
      d: "commands you've run",
      run: () =>
        history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${esc(h)}`).join("<br>") || "<span class='muted'>empty</span>",
    },

    clear: {
      d: "clear the screen",
      run: () => {
        io.clear();
        return null;
      },
    },

    sudo: {
      hidden: true,
      run: (args) =>
        args.join(" ") === "hire-me"
          ? `<span class="ok">[sudo] access granted.</span> Good call.` + commands.contact.run()
          : `<span class="warn">${esc(user)} is not in the sudoers file.</span> This incident will be reported. <span class="muted">(try: sudo hire-me)</span>`,
    },
    exit: { hidden: true, run: () => `There's no exit. Try <span class="amber">contact</span> instead.` },
    rm: { hidden: true, run: () => `<span class="warn">Nice try.</span> The backups are tested.` },
  };

  const aliases = {
    about: "whoami",
    work: "experience",
    neofetch: "sysinfo",
    "ls projects": "projects",
    "ls projects/": "projects",
    "ls skills": "skills",
    "ls skills/": "skills",
    "cat about.md": "whoami",
    "cat contact.txt": "contact",
    "cat audit.log": "audit",
  };

  function echo(cmd) {
    io.print(`<div class="cmdline"><span class="u">${esc(user)}</span>:~$ <span class="c">${esc(cmd)}</span></div>`);
  }

  function run(raw) {
    const cmd = String(raw || "").trim();
    if (!cmd) return;
    if (busy) {
      io.print(`<span class="muted">still running… one moment.</span>`);
      return;
    }
    history.push(cmd);
    hIdx = history.length;
    const line = aliases[cmd] || cmd;
    const [name, ...args] = line.split(/\s+/);
    if (name !== "clear") echo(cmd);
    const c = commands[name];
    const out = c ? c.run(args) : `<span class="warn">command not found: ${esc(name)}</span>. Type <span class="amber">help</span>.`;
    if (out) io.print(out);
  }

  function boot() {
    io.print(`<span class="muted">Last login: ${new Date().toDateString()} on ttys001</span>`);
    run("whoami");
    io.print(
      `<span class="muted">Type</span> <span class="amber">help</span> <span class="muted">or tap a command below. Start with</span> <span class="amber">provision</span><span class="muted">, or try</span> <span class="amber">ctf</span> <span class="muted">if you like puzzles.</span>`
    );
    history.length = 0;
    hIdx = 0;
  }

  const prev = () => (hIdx > 0 ? history[--hIdx] : history[0] ?? "");
  const next = () => {
    hIdx = Math.min(history.length, hIdx + 1);
    return history[hIdx] ?? "";
  };

  function complete(v) {
    const pool = [
      ...Object.keys(commands).filter((k) => !commands[k].hidden),
      ...cfg.projects.map((p) => "cat " + p.id),
      ...Object.keys(cfg.skills).map((k) => "skills --" + k),
    ];
    const m = pool.filter((c) => c.startsWith(v));
    if (m.length === 1) return m[0] + (m[0].includes(" ") ? "" : " ");
    if (m.length > 1) {
      echo(v);
      io.print(m.map((x) => `<span class="amber">${esc(x)}</span>`).join("&nbsp;&nbsp;"));
    }
    return v;
  }

  return { user, run, boot, prev, next, complete };
}
