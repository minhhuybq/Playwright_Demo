import { test, expect } from '../src/fixtures/fixtures';
import { SERVICE_CARDS } from '../src/data/testData';
import { MAIN_MENU } from '../src/data/testData';
import { LEGAL_PAGES } from '../src/data/testData';

test('TC-01 Homepage loads', { tag: '@smoke' }, async ({ homePage }) => {
  //Open homepage
  const hero = homePage.heroHeading;
  // Expected: title contains "Softwaretesting"
  await expect(hero).toHaveText('Softwaretesting');
});

test('TC-02 Header shows menu and booking button', { tag: '@smoke' }, async ({ homePage }) => {
  // Expected: all MAIN_MENU entries (Services, News & Insights, Unternehmen, Karriere) visible
  for (const name of MAIN_MENU) {
    await expect(homePage.header.menuItem(name)).toBeVisible();
  }

  // Expected: "Termin vereinbaren" visible
  await expect(homePage.header.bookAppointmentButton).toBeVisible();
});

test('TC-03 Navigate to QA-Suite via Services menu', async ({ page, homePage }) => {
  // Step:    open submenu "Services", click "QA-Suite"
  await homePage.header.openSubmenuItem('Services', 'QA-Suite');

  // Expected: URL changed; h1 is visible
  await expect(page, 'URL must change after the click').toHaveURL('/qa-suite');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test(
  'TC-04 Hero button "Expertengespräch vereinbaren"',
  { tag: '@smoke' },
  async ({ page, homePage }) => {
    // Click the hero button
    //const hero = homePage.heroHeading;
    await expect(homePage.heroHeading).toBeVisible();
    await page.waitForTimeout(2000); //To improve: Wait for cookie popup to completely disappear and heroBtn to be pressable.
    await homePage.heroBtn_click();

    // Expected: iframe appears
    const iframe = page.frameLocator('iframe');
    await expect(iframe.getByRole('heading', { level: 1 })).toHaveText('Expertengespräch buchen');
  },
);

// One test per card (data-driven from SERVICE_CARDS)
for (const card of SERVICE_CARDS) {
  test(`TC-05 Service card: ${card}`, async ({ homePage, page }) => {
    const serviceCard = homePage.serviceCard(card);
    await serviceCard.scrollIntoViewIfNeeded();
    await serviceCard.hover();
    //To improve: bring this locator into Page Object
    await serviceCard.getByRole('link', { name: 'Mehr erfahren' }).first().click();

    // Expected: URL changed
    await expect(page, 'URL must change after the click').not.toHaveURL('/');
  });
}

test('TC-06 Footer shows contact data', { tag: '@smoke' }, async ({ homePage }) => {
  // Expected: address (street + city) and mail link visible; mail link href is "mailto:..."
  const { footer } = homePage;

  await footer.root.scrollIntoViewIfNeeded();
  // expect.soft: all three checks run, even if one fails, so the report shows every problem.
  await expect.soft(footer.street).toBeVisible();
  await expect.soft(footer.city).toBeVisible();
  await expect.soft(footer.mailLink).toHaveAttribute('href', /^mailto:/i);
});

// One test is generated per entry in LEGAL_PAGES (data-driven).
for (const legal of LEGAL_PAGES) {
  test(`TC-07 Legal page: ${legal.linkName}`, async ({ page, homePage }) => {
    await homePage.footer.legalLink(legal.linkName).click();

    await expect(page).toHaveURL(legal.urlPart);
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();
  });
}

test('TC-08 Mobile menu opens', { tag: '@mobile' }, async ({ page, homePage }) => {
  // Runs only on project "mobile-chrome".
  const { mobileMenuToggle, mobileMenuClose } = homePage.header;

  await expect(mobileMenuToggle).toBeVisible();
  await expect(mobileMenuClose).toBeHidden(); // menu is closed at the start
  await page.waitForTimeout(1000); //to improve: how to pass without this timeout?

  // Steps:    tap hamburger button
  await mobileMenuToggle.tap();

  // Expected: toggle visible before tapping; menu entries visible after tapping
  // "Karriere" link is the last item in the mobile menu
  await expect(page.getByRole('link', { name: 'Karriere', exact: true }).last()).toBeVisible();
});

test('TC-09 Images have alt attribute', async ({ page }) => {
  // Expected: no <img> without an alt attribute
  await expect(page.locator('img:not([alt])')).toHaveCount(0);
});
