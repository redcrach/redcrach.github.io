// Everything about you lives here. Edit this file, push, and the site redeploys.
// Skill levels (1–5) are a self-assessment: adjust them to taste.

export const config = {
  name: "Taibouni Abdel Hafid",
  handle: "redcrach",
  role: "Senior Full-Stack Engineer · Laravel & PHP · Vue · Databases · DevOps",
  // One line under the name on the page. Plain words, no jargon.
  tagline:
    "I rescue slow legacy PHP, rebuild it in Laravel, and own everything around it: the Vue and Svelte front ends, the databases, and the servers they run on.",
  // Every "Book a call" button points here.
  booking: "https://calendar.app.google/KDbTzS8DJP4iwWpV7",
  // Optional: drop a PDF in /public (e.g. public/cv.pdf) and set "./cv.pdf" to show a CV button.
  cv: "",
  location: "Remote from Algeria · UTC+1, CET-aligned",
  since: 2011,
  available: "Yes, taking new projects (30+ hrs/week)",
  languages: "Arabic (native) · English (fluent, daily at work) · French & German (basic)",

  summary:
    "Senior Fullstack developer and PHP backend engineer with 15+ years in production. My specialty is legacy PHP modernization: I dig into unfamiliar codebases with a security researcher's mindset, find out how they really work, then refactor them into clean Laravel step by step without stopping the business. Lately that has meant going deep on data: SingleStore and PostgreSQL with TimescaleDB for heavy analytics, plus Vue 3 on the front end. I also own the infrastructure: Docker, Forge, Cloudflare, Linux, monitoring and backups.",

  upwork: {
    badge: "Top Rated",
    earned: "$50K+",
    jobs: 34,
    reviews: 25,
  },

  email: "hafid@taibouni.dev",
  links: {
    GitHub: "https://github.com/redcrach",
    LinkedIn: "https://www.linkedin.com/in/taibouni-abdel-hafid/",
    Upwork: "https://www.upwork.com/freelancers/~017f211aaf6fc6695a",
    "Root-Me": "https://www.root-me.org/RedCrach",
    Blog: "https://blindp0wn3rs.wordpress.com/",
  },

  skills: {
    backend: [
      ["Laravel", 5, "rescues, v2 rebuilds, multi-tenant ERPs"],
      ["PHP 8", 5, "OOP, design patterns, legacy PHP → Laravel"],
      ["Filament & Livewire", 5, "admin panels, the ERP cockpit"],
      ["Queues & real-time", 5, "jobs, Laravel Reverb, WebSockets, broadcasting"],
      ["REST APIs & OAuth", 5, "couriers, payments, Google, Forge/Vercel/Cloudflare APIs"],
    ],
    frontend: [
      ["TALL stack", 5, "Tailwind, Alpine.js, Laravel, Livewire"],
      ["Svelte", 4, "Caliber v2 front end, this site"],
      ["Next.js", 4, "storefront platform at 100K requests/day"],
      ["Vue 3", 4, "current focus: components, reactivity, state; Vue 2 shipped earlier"],
      ["Blade & JavaScript", 5, ""],
    ],
    data: [
      ["MySQL / MariaDB", 5, "query plans, indexing, upserts, 130 → 32 queries per request"],
      ["SingleStore", 4, "heavy aggregations over millions of rows at Caliber"],
      ["PostgreSQL + TimescaleDB", 3, "time-series workloads: hypertables, aggregates (proof of concept at Caliber)"],
      ["Redis", 5, "caching, queues, rate limiting"],
      ["Backups & recovery", 5, "recovered a corrupted InnoDB production database"],
    ],
    devops: [
      ["Laravel Forge", 5, "provisioning driven by code, not clicks"],
      ["Cloudflare", 5, "DNS, proxying, SSL, edge"],
      ["Docker & Compose", 4, "containerized dev and production stacks"],
      ["Nginx & Linux", 5, "load balancing, monitoring"],
      ["CI/CD & zero-touch deploys", 5, "physical servers, VPS and cloud"],
      ["AWS & Vercel", 4, ""],
    ],
    security: [
      ["Security code review", 5, "I read code the way an attacker reads it"],
      ["Vulnerability assessment", 5, "web apps, configs, infrastructure"],
      ["Exploitation", 4, "SQLi, sandbox escapes, auth bypasses (see writeups)"],
      ["Reverse engineering", 3, "C#, ELF, OllyDbg, GDB, CTF-level"],
      ["CTF author", 4, "3 Root-Me realist challenges, 2011–2012"],
    ],
    sysadmin: [
      ["Linux administration", 5, "ran Orestor's production fleet"],
      ["Hardening", 5, "servers and apps, since the freelance years"],
      ["Apache / .htaccess", 5, ""],
      ["Uptime & monitoring", 5, "100% uptime on ZimouExpress · Forge, Bugsnag, Nightwatch"],
    ],
    workflow: [
      ["Git & code review", 5, "set review standards as CTO"],
      ["Unit testing", 4, ""],
      ["Claude Code", 5, "daily, with everything reviewed and tested before it ships"],
    ],
  },

  projects: [
    {
      id: "caliber-rescue",
      title: "Rescuing a legacy SaaS, then rebuilding it as v2",
      client: "Group Caliber ApS · Danish brand & reputation tracking SaaS · Oct 2021 – Oct 2026",
      problem:
        "A native-PHP backend had become too slow to use. At its core sat a 10,000-line, 22-parameter function that only its original author could change.",
      did:
        "Turned the legacy backend into a working product, then rebuilt it as v2 in Laravel and Svelte, database migration included. Replaced the giant function with a clean class structure and moved its calculation rules into an admin dashboard. Optimized upserts, grouped lookups and added runtime caching in the survey engine.",
      result: [
        "Survey engine ~70% faster (35s → 11s, 15s → 4.5s)",
        "DB queries cut up to 75% (130 → 32)",
        "Non-developers now manage the calculation rules",
        "5 years inside a Denmark-based team on CET hours",
      ],
      stack: ["Laravel", "Svelte", "MySQL", "Caching", "Refactoring"],
    },
    {
      id: "caliber-data",
      title: "Analytics at scale: SingleStore, PostgreSQL and TimescaleDB",
      client: "Group Caliber ApS · brand & reputation tracking SaaS",
      // TODO: add 1–2 real numbers here (rows, query time before/after, cost) and confirm the wording.
      problem:
        "Reporting meant large aggregations over millions of rows, and a classic MySQL setup was the wrong tool for that kind of load.",
      did:
        "Ran analytics workloads on SingleStore in production, tuned the heavy aggregation queries and the import paths that feed them, and ran a PostgreSQL + TimescaleDB proof of concept for the time-series side (hypertables and pre-computed aggregates).",
      result: [
        "Heavy aggregations moved off the transactional database",
        "Large imports from stores and spreadsheets into analytics tables",
        "Data-driven choice between SingleStore and Postgres + TimescaleDB",
      ],
      stack: ["SingleStore", "PostgreSQL", "TimescaleDB", "MySQL", "Laravel"],
    },
    {
      id: "erp-cockpit",
      title: "The cockpit: one click, one new ERP client",
      client: "ZimouGroup · CTO & shareholder · Sep 2023 – Jul 2026",
      problem:
        "Every client of the MyEcom ERP needed a dedicated instance, and setting each one up by hand was slow and error-prone.",
      did:
        "Built a Filament control panel that provisions and deploys a dedicated Laravel ERP per client, orchestrating servers, sites, DNS and frontends through the Laravel Forge, Cloudflare and Vercel APIs, with provisioning running through Laravel queues. Added a central OAuth service that manages Google and other third-party connections, token refresh included, for every instance.",
      result: [
        "Manual server setup replaced by automated onboarding",
        "One OAuth hub for every instance",
        "Product later became Yalidine's Aventy",
      ],
      stack: ["Laravel", "Filament", "Queues", "Forge API", "Cloudflare API", "Vercel API", "OAuth"],
    },
    {
      id: "infra",
      title: "Production infrastructure, owned end to end",
      client: "ZimouGroup · Orestor · Group Caliber",
      // TODO: add your Docker specifics (what runs in containers, CI tool, number of servers).
      problem:
        "Small teams running real traffic, with nobody whose full-time job was the servers.",
      did:
        "Containerized dev and production stacks with Docker and Compose. Set up zero-downtime deploys through Forge and CI, Cloudflare in front of everything, and monitoring with Bugsnag and Nightwatch. After the ZimouExpress incident, moved the database to its own server with a read/write replica. At Orestor, ran load-balanced Linux servers across physical machines, VPS and cloud.",
      result: [
        "100% uptime on ZimouExpress at 1,000+ parcels a day",
        "Dedicated database server with a replica",
        "Zero-touch deploys on any infrastructure",
      ],
      stack: ["Docker", "Compose", "Laravel Forge", "Cloudflare", "Nginx", "Linux", "CI/CD", "Bugsnag", "Nightwatch"],
    },
    {
      id: "erp-queues",
      title: "Making order dispatch reliable",
      client: "MyEcom ERP, later Yalidine's Aventy · ZimouGroup",
      problem: "The team had struggled to get the ERP's queue system working, and orders to delivery companies were unreliable.",
      did: "Rebuilt the Laravel queue system and added real-time order notifications with Laravel Reverb and WebSockets.",
      result: ["Reliable dispatch to third-party couriers", "Real-time order notifications"],
      stack: ["Laravel", "Queues", "Reverb", "WebSockets", "Redis"],
    },
    {
      id: "zimou-express",
      title: "ZimouExpress, a delivery hub for Algeria",
      client: "ZimouGroup",
      problem: "Sellers had to juggle several courier companies, each with its own system.",
      did: "Kept the Laravel hub that connects Algeria's courier companies running and growing.",
      result: ["1,000+ parcels a day", "All wilayas covered", "100% uptime"],
      stack: ["Laravel", "Courier APIs", "Linux", "Cloudflare"],
    },
    {
      id: "storefronts",
      title: "Storefront platform at near-zero cost",
      client: "ZimouGroup · ERP ecosystem",
      problem: "Each ERP client needed a public storefront without ever exposing the ERP's own address.",
      did: "Built a platform on Next.js and Turso that gives every client its own storefront and proxies orders into their ERP.",
      result: ["100K requests a day", "Near-zero hosting cost", "ERP origin never exposed"],
      stack: ["Next.js", "Turso", "Vercel", "Proxying"],
    },
    {
      id: "orestor",
      title: "Orestor, a Shopify-like store generator",
      client: "Co-founder, head developer & sysadmin · Feb 2018 – Aug 2021",
      problem: "Merchants needed complete, hosted online stores generated automatically.",
      did: "Primary backend engineer. Built a custom lightweight MVC framework for full-site generation and a zero-touch deployment pipeline with auto-configuration across physical servers, VPS and cloud. Ran production: load balancing, Linux, Cloudflare, monitoring and client onboarding.",
      result: ["Automated full-site generation", "Zero-touch deploys on any infrastructure", "Owned production end to end"],
      stack: ["PHP", "Custom MVC", "Linux", "Load balancing", "Cloudflare"],
    },
  ],

  experience: [
    ["Oct 2021 – Oct 2026", "Senior Full-Stack Developer (Laravel & Svelte)", "Group Caliber ApS · remote, Denmark", "Legacy rescue, v2 rebuild, ~70% faster survey engine"],
    ["Sep 2023 – Jul 2026", "Chief Technology Officer & Shareholder", "ZimouGroup · remote", "Hands-on Laravel lead: cockpit, queues, ZimouExpress, storefronts, hiring and mentoring. Occasional consultant since."],
    ["Feb 2018 – Aug 2021", "Co-Founder, Head Developer & SysAdmin", "Orestor · Algeria", "Shopify-like platform, custom MVC framework, zero-touch deployment"],
    ["Feb 2012 – Aug 2018", "Freelance Full-Stack Developer", "Clients incl. Katy Computer Specialists", "PHP apps, databases for high-traffic lead-gen platforms, hardening and tuning"],
    ["2011 – 2012", "CTF player & challenge author", "Root-Me · Blindp0wn3rs", "Authored 3 realist challenges, published CTF write-ups"],
  ],

  reviews: [
    ["Henrik B., client", "Hafid is very skilled in PHP, backend development and Laravel. He tackles tasks with a great attitude and mind set. He helped us refactor and optimize on an existing PHP backend, and not only did he do the tasks appointed, he also identified other areas to improve on both security, performance and maintainability."],
    ["Client", "Taibouni was enormously helpful to us in uncovering issues in our setup and code and assisted us onto the right path to resolution. He was professional and courteous at all times and his experience was evident in the final work!"],
  ],

  // ── Page-only content (the scroll view). The terminal ignores these. ──

  stats: [
    ["~70%", "faster legacy survey engine", "35s → 11s at Group Caliber"],
    ["130 → 32", "database queries per request", "grouped lookups, upserts, caching"],
    ["100%", "uptime on ZimouExpress", "1,000+ parcels a day across Algeria"],
    ["100K", "storefront requests a day", "at near-zero hosting cost"],
    ["6–10", "developers led as CTO", "daily PR reviews across 2–3 repos"],
    ["15+", "years in production", "PHP since 2012, security since 2011"],
    // TODO: add your best SingleStore / TimescaleDB number here, e.g.
    // ["12s → 0.4s", "dashboard aggregation", "SingleStore at Caliber"],
  ],

  skillCards: [
    {
      title: "Backend",
      text: "PHP 8 and Laravel since 2012. I modernize legacy PHP without stopping the business.",
      tags: ["Laravel", "PHP 8", "Filament", "Livewire", "REST APIs", "OAuth", "Queues", "Reverb"],
    },
    {
      title: "Frontend",
      text: "Vue 3 is my current focus, next to Svelte (Caliber v2, this site) and React/Next.js (storefronts).",
      tags: ["Vue 3", "Svelte 5", "React / Next.js", "Alpine.js", "Tailwind", "Drag & drop UIs"],
    },
    {
      title: "Data & performance",
      text: "From query plans and indexes to choosing the right engine for analytics.",
      tags: ["MySQL", "SingleStore", "PostgreSQL", "TimescaleDB", "Redis", "Indexing", "Caching", "Imports"],
    },
    {
      title: "Infrastructure & DevOps",
      text: "I set up the servers, the deploys and the monitoring, and I get paged when they break.",
      tags: ["Docker", "Compose", "Laravel Forge", "Cloudflare", "Nginx", "Linux", "CI/CD", "AWS", "Vercel"],
    },
    {
      title: "Leadership",
      text: "Former CTO of 6–10 developers. I split big problems so people can build in parallel, and still write the hard code.",
      tags: ["Code review", "Architecture", "Hiring", "Mentoring", "Remote / async"],
    },
    {
      title: "Security",
      text: "CTF player and Root-Me challenge author. I review every PR the way an attacker would read it.",
      tags: ["Secure code review", "OWASP", "Turnstile / anti-bot", "Hardening", "Pentesting"],
    },
  ],

  incident: {
    title: "The day the database died",
    story: [
      "Mid-afternoon on a busy day at ZimouExpress, thousands of parcels were being created, and the server went dark: the hosting bill had gone unpaid and the provider cut it off.",
      "When it came back, MySQL would not stay up. The InnoDB files were corrupted, and a forced-recovery restart failed.",
      "I moved the damaged production files aside, started MySQL on an empty database with the same name and structure, ran the repair, and swapped the original files back in at the right moment. The data came back.",
    ],
    after:
      "Afterwards the database got its own server with a read/write replica, and monitoring through Forge, Bugsnag and Nightwatch. That night is why ZimouGroup hired me.",
  },

  faq: [
    ["Where are you based, and what hours do you work?", "Algeria, UTC+1, aligned with CET. I spent five years inside a Denmark-based team on CET hours, fully remote."],
    ["Full-time or contract?", "Both. I'm open to full-time remote roles and to contract work, from a short audit to owning a product's backend."],
    ["How do you take over a codebase you didn't write?", "Read it the way an attacker would: config, secrets, auth, queries, uploads, servers. Then fix what's dangerous first and refactor in small steps that ship, so the business never stops. Type audit in the terminal for my checklist."],
    ["How do you use AI in your work?", "I use Claude Code every day. Everything it writes gets reviewed and tested by me before it ships."],
    ["Why is there a terminal?", "I started in security and CTFs in 2011, and old habits stay. There's also a hidden flag in there for the curious."],
  ],

  ctf: {
    authored: [
      { name: "Web TV", url: "https://www.root-me.org/fr/Challenges/Realiste/Web-TV" },
      { name: "MALab", url: "https://www.root-me.org/fr/Challenges/Realiste/MALab" },
      { name: "The h@ckers l4b", url: "https://www.root-me.org/fr/Challenges/Realiste/The-h-ckers-l4b" },
    ],
    blog: { name: "Blindp0wn3rs", url: "https://blindp0wn3rs.wordpress.com/", tagline: "Hacking for fun and profit" },
    writeups: [
      ["PHDays Quals 2012", "Pwn 400", "escaped a restricted Python sandbox through function globals to reach os"],
      ["PHDays Quals 2012", "Real World 100", "SQL injection through an unsanitized IP header in an INSERT"],
      ["CSAW Quals 2012", "Web 600", "bypassed a PHP password check by sending an array to strcasecmp"],
      ["CSAW Quals 2012", "Web 300", "UNION-based SQLi to dump credentials, then session hijacking"],
      ["CSAW Quals 2012", "Reversing 100–400", "C# decompile and recompile, XOR key recovery, ELF patching in GDB"],
      ["CSAW Quals 2012", "Forensics & Recon", "PNG chunk CRC tricks, core dumps, OSINT across IRC and finger"],
    ],
  },
};
