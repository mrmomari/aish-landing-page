# AAI Landing Page

Marketing landing page for **All About Investments LLC (AAI)** — a U.S.-based holding group investing patient capital, operating expertise, and global perspective into ambitious businesses and future projects.

Live site: https://mrmomari.github.io/aish-landing-page/

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) for dev server and builds
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [Motion](https://motion.dev/) for animations
- [Lucide](https://lucide.dev/) icons

## Project structure

```
premium-investment-landing-page/
├── public/              # Static assets (favicon, images, uploads)
├── src/
│   ├── App.tsx          # Landing page (hero, portfolio, approach, partnerships, contact)
│   ├── content.json     # All editable site content (company info, holdings, sections)
│   ├── admin/           # Built-in admin panel for editing site content
│   ├── lib/             # Content loading, GitHub API client, shared types
│   └── utils/           # Helpers
└── vite.config.ts       # Base path set to /aish-landing-page/ for GitHub Pages
```

## Content management

Site copy lives in `src/content.json` and is typed by `src/lib/types.ts`. The app ships with an admin panel (`src/admin/`) that lets you:

- Edit company information (name, tagline, description, contact details)
- Manage portfolio holdings, including image uploads
- Toggle visibility and ordering of page sections

The admin panel commits changes back to this repository through the GitHub API using a personal access token stored in the browser's local storage, so content updates trigger a redeploy automatically.

## Development

```bash
cd premium-investment-landing-page
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Deployment

Pushes to `master` that touch `premium-investment-landing-page/` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages.
