# STOW transparent quote prototype

A bilingual, local-only Next.js prototype that recreates the STOW chat shell and demonstrates a clearer quotation and human-handoff flow.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, choose **Báo giá lưu trữ giúp em**, and follow the three guided actions. No information is sent to MyStorage or any external service.

To demonstrate submission failure and retry behavior, open:

```text
http://localhost:3000/?submit=error
```

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The audited prices are demonstration data from the captured session. Pending distance and excluded return-delivery charges are deliberately not counted as zero or presented as a final payable total.

The original standalone experiment is preserved at `reference/initial-quote-prototype.html`. `SPEC.md` and `stow.mystorage.vn.har` remain unchanged as evidence.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` validates the app, creates a static export in `out/`, and deploys it to GitHub Pages on every push to `main`. It can also be run manually from the Actions tab.

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. The build reads the Pages base path automatically, so both project sites (for example, `/repository-name`) and root user sites work without editing the app.
