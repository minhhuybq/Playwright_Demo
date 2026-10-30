import { Locator, Page } from '@playwright/test';

export class FooterComponent {
  readonly root: Locator;
  readonly mailLink: Locator;
  readonly street: Locator;
  readonly city: Locator;

  constructor(private readonly page: Page) {
    this.root = page.getByRole('contentinfo').or(page.locator('footer')).first();
    this.mailLink = this.root.getByRole('link', { name: /kontakt@bequalified\.de/i }).first();
    this.street = this.root.getByText('Daimlerstraße 11').first();
    this.city = this.root.getByText('50859 Köln').first();
  }

  legalLink(name: string): Locator {
    return this.root.getByRole('link', { name }).first();
  }
}
