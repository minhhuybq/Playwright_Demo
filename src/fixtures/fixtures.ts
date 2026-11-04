import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Fixture: every test that asks for `homePage` gets a page object that is already opened.
export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // Accept cookies: if cookie banner shows up -> accept it
    const accept = page.getByRole('button', { name: /akzeptieren|alle zulassen/i });
    if (await accept.isVisible()) {
      await accept.click();
      console.log('Accepted');
    }
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
