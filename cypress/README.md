# Cypress E2E Tests

## Run tests

1. **Start the app** (in one terminal):
   ```bash
   npm run dev
   ```

2. **Run tests** (in another terminal):
   - Headless: `npm run cypress:run`
   - Interactive: `npm run cypress:open`

## Test files

- `e2e/app.cy.ts` – Home page
- `e2e/student-housing.cy.ts` – Student Housing form (fields, validation, Close button)
- `e2e/dorms.cy.ts` – Dorms page
