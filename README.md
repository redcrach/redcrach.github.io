# redcrach · terminal portfolio

An interactive terminal portfolio built with Svelte 5 and Vite, deployed to GitHub Pages by GitHub Actions on every push.

## Custom domain (optional)

Add your domain under **Settings → Pages → Custom domain**, then point a CNAME record at `<your-username>.github.io` (on Cloudflare, keep it DNS-only until GitHub issues the certificate).

## The hidden flag

There is a small CTF inside the site. Visitors who type `ctf` get the rules. the flag is in `src/lib/commands.js`.
