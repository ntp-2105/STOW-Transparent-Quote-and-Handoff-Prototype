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
