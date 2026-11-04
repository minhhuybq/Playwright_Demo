import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly root: Locator;
  readonly bookAppointmentButton: Locator;
  readonly mobileMenuToggle: Locator;
  readonly mobileMenuClose: Locator;

  constructor(readonly page: Page) {
    this.root = page.getByRole('banner').or(page.locator('header')).first();

    this.bookAppointmentButton = this.root
      .getByRole('link', { name: 'Termin vereinbaren' })
      .or(this.root.getByRole('button', { name: 'Termin vereinbaren' }))
      .first();

    this.mobileMenuToggle = page
      .locator('.icon-menu-button-of-three-horizontal-lines:visible')
      .first();
    this.mobileMenuClose = page.locator('a[href*="popup%3Aclose"]:visible').first();
  }

  // Menu Item
  menuItem(name: string): Locator {
    return this.root.getByRole('link', { name, exact: true }).first();
  }

  //Submenu Item
  async openSubmenuItem(group: string, item: string): Promise<void> {
    // Hover on the group, then click the item).
    await this.menuItem(group).first().hover();
    await this.menuItem(group).first().click(); //To improve: can skip this click and simply hover?
    await this.menuItem(item).first().click();
  }
}
