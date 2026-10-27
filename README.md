# NOM architecture concept

Buildless responsive architecture portfolio. Static production files are in `dist/`.

Run `node preview.mjs` to preview at http://127.0.0.1:4173.

## Vercel deployment

Import this GitHub repository with Root Directory left at the repository root. The tracked `vercel.json` selects the static site in `dist/`, disables framework detection and dependency installation, and runs `node scripts/verify-site.mjs` before deployment. No bundler or package installation is needed.

The verification command checks the actual deployment folder for the NOM homepage, referenced styles/scripts, and all project images, and validates JavaScript syntax. It exits with an error if a required file is missing. Run the same command locally before pushing deployment changes.

The homepage contains the NOM hero followed directly by the project collection. Includes category filtering, six project detail views, an About panel, and a locally downloaded enquiry brief. No form data is transmitted. Replace illustrative projects, studio copy, and photography with approved NOM material before using as a business website. Images supplied by Unsplash; fonts served by Google Fonts (DM Sans and Manrope).

The project collection includes a Work index, an About panel, and full-screen case studies. Direct project links use `/#project/courtyard` (or the other project IDs in `dist/app.js`), so refreshing them works on static hosting without rewrite rules. Case-study detail images are labeled crops of the original reference photograph. Project styles are in `dist/projects.css`.

The concept enquiry intentionally creates a local text file until a real studio email or form service is supplied.
