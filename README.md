# Bharat Gupta — portfolio v2

Three scrolling scenes adapted from the local lineMorph project: bridge → San Francisco skyline → waving hand. The introduction retains the existing copy. Experience and projects share the middle section (stacking on mobile), and the final section contains contact links.

## Local development

Requires Node.js 22.12+ (or 20.19+).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 8000
```

This workspace currently reuses lineMorph's installed dependencies through an ignored `node_modules` symlink. For an independent install, remove that symlink with `unlink node_modules`, then run `npm ci`.

```sh
npm run lint
npm run build
```

The production website is generated in `dist/`; deploy that directory rather than the source repository root. `public/` preserves the favicon, custom domain file, and GlanceMail privacy policy. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys `dist/` on pushes to `main`. In repository Settings → Pages, set Source to **GitHub Actions**. Pull requests run build and lint checks without deploying.

Edit portfolio copy in `src/content.json`, layout in `src/App.tsx`, and styles in `src/style.css`. The original SVG geometry and stipple morph live in `src/scenes/`, `src/dither/`, and `src/components/TransitionScene.tsx`. Scene timing follows the actual section positions, holding the skyline throughout the work content and reversing when scrolling upward. Reduced-motion preferences switch directly between scenes.

## Crawler-readable content

The Vite plugin in `crawlerContent.ts` serves `/profile.html`, `/llms.txt`, `/llms-full.txt`, `/robots.txt`, and `/sitemap.xml` in development and emits them into `dist/` for deployment. The HTML and Markdown contain every description without needing JavaScript or clicks. All versions use `src/content.json`, including contact and contribution links. Production URLs derive from `public/CNAME`. `llms.txt` is a discovery convention, not a guarantee that a particular agent will fetch it. Robots currently allow all compliant crawlers.
