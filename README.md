# bequalified.de website testing

Small Page Object Model (POM) project for https://bequalified.de.

## Setup
```bash
npm install
npx playwright install     # downloads the browsers
npm run typecheck          # should pass without errors
npx playwright test        # all tests, all browsers
npx playwright test --project=chromium        # one browser
npx playwright test --grep @smoke             # smoke tests only
npx playwright test -g "TC-08" --project=mobile-chrome
npm run report                      # open the HTML report
```

## Structure
```
playwright.config.ts      browsers, parallel, reports
src/
  data/testData.ts        data for the test cases (no test logic)
  components/             HeaderComponent, FooterComponent (reusable page parts)
  pages/HomePage.ts       page object: locators + actions
  fixtures/fixtures.ts    `homePage` fixture (opens the page before each test)
tests/                    the test specs (TC-01 ... TC-10)
```

## Test cases

| ID | Tag | Test | What it checks |
|---|---|---|---|
| TC-01 | @smoke | Homepage loads | The hero heading shows "Softwaretesting". |
| TC-02 | @smoke | Header menu and booking button | Services, News & Insights, Unternehmen and Karriere are visible, plus the "Termin vereinbaren" button. |
| TC-03 | | Navigate via Services menu | Services > QA-Suite opens `/qa-suite` and the page shows an h1. |
| TC-04 | @smoke | Hero button | Clicking "Expertengespräch vereinbaren" opens an iframe with the heading "Expertengespräch buchen". |
| TC-05 | | Service cards (4 tests) | For each card: hover it, then click its "Mehr erfahren" link. |
| TC-06 | @smoke | Footer contact data | Street, city and a `mailto:` mail link are shown. |
| TC-07 | | Legal pages (2 tests) | The Impressum and Datenschutz links open the right URL and show an h2. |
| TC-08 | @mobile | Mobile menu | On a phone, the hamburger button is visible and the menu opens ("Karriere" link visible). Runs only on `mobile-chrome`. |
| TC-09 | | Images have alt text | No `<img>` without an `alt` attribute. |

Tags: `@smoke` = main checks (`npm run test:smoke`), `@mobile` = phone-only test.



## Rules (the course criteria)
- **POM:** locators and actions live in `src/`, assertions live in `tests/`.
- **Selectors:** prefer `getByRole` (with name), then `getByText` / `getByLabel`, then `data-testid`. No XPath, no positional CSS.
- **Assertions:** use web-first assertions (`await expect(locator).toBeVisible()`); never `waitForTimeout`; assert exactly what the user sees.
- **Reports:** HTML report in `reports/html`; traces and screenshots are saved on failure.
- **Browsers:** chromium, firefox, webkit + mobile-chrome (only `@mobile` tests). Single browser: `--project=firefox`.
- **Parallel:** `fullyParallel: true`. Tests must not depend on each other. Try `--workers=1` vs `--workers=4` and compare times.
