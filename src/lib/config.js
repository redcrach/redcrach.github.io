// Everything about you lives here. Edit this file, push, and the site redeploys.
// Skill levels (1–5) are a self-assessment: adjust them to taste.

export const config = {
  name: "Taibouni Abdel Hafid",
  handle: "redcrach",
  role: "Senior Fullstack · Laravel & PHP Engineer · Web Security · DevOps",
  location: "Remote from Algeria · UTC+1, CET-aligned",
  since: 2011,
  available: "Yes, taking new projects (30+ hrs/week)",
  languages: "Arabic (native) · English (fluent, daily at work) · French & German (basic)",

  summary:
    "Senior Fullstack developer and PHP backend engineer with 15+ years in production. My specialty is legacy PHP modernization: I dig into unfamiliar codebases with a security researcher's mindset, find out how they really work, then refactor them into clean Laravel step by step without stopping the business. I also own the deployment, with Laravel Forge, Cloudflare and Docker.",

  upwork: {
    badge: "Top Rated",
    earned: "$50K+",
    jobs: 34,
    reviews: 25,
  },

  email: "taibounihafid@gmail.com",
  links: {
    GitHub: "https://github.com/redcrach",
    LinkedIn: "https://www.linkedin.com/in/taibouni-abdel-hafid-6533591a3/",
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
      ["MySQL / MariaDB / Redis", 5, "query optimization, indexing, caching"],
    ],
    frontend: [
      ["TALL stack", 5, "Tailwind, Alpine.js, Laravel, Livewire"],
      ["Svelte", 4, "Caliber v2 front end, this site"],
      ["Next.js", 4, "storefront platform at 100K requests/day"],
      ["Vue.js", 4, ""],
      ["Blade & JavaScript", 5, ""],
    ],
    devops: [
      ["Laravel Forge", 5, "provisioning driven by code, not clicks"],
      ["Cloudflare", 5, "DNS, proxying, SSL, edge"],
      ["Docker & Compose", 4, ""],
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
      ["Uptime & monitoring", 5, "100% uptime on ZimouExpress"],
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
