# redcrach · terminal portfolio

An interactive terminal portfolio built with Svelte 5 and Vite, deployed to GitHub Pages by GitHub Actions on every push.

## Put it online (about 5 minutes)

1. Create a GitHub repository.
   - Name it `<your-username>.github.io` to get the address `https://<your-username>.github.io`.
   - Any other name works too and gives `https://<your-username>.github.io/<repo-name>/`.
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Terminal portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to go green (about a minute). The link appears in the run summary.

Every later push to `main` rebuilds and redeploys automatically.

## Run it locally

```bash
npm install
npm run dev
```

## Edit your content

All the content lives in `src/lib/config.js`: name, summary, skills, projects, experience, links and your favourite Root-Me challenges (`ctf.highlights`). Commands and their output live in `src/lib/commands.js`.

## Custom domain (optional)

Add your domain under **Settings → Pages → Custom domain**, then point a CNAME record at `<your-username>.github.io` (on Cloudflare, keep it DNS-only until GitHub issues the certificate).

## The hidden flag

There is a small CTF inside the site. Visitors who type `ctf` get the rules. the flag is in `src/lib/commands.js`.
