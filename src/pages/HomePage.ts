import { Locator, Page } from '@playwright/test';
import { FooterComponent } from '../components/FooterComponent';
import { HeaderComponent } from '../components/HeaderComponent';

export class HomePage {
  readonly header: HeaderComponent;
  readonly footer: FooterComponent;
  readonly heroHeading: Locator;
  readonly heroBtn: Locator;

  constructor(readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.footer = new FooterComponent(page);
    this.heroHeading = page.getByRole('heading', { level: 1 });
    this.heroBtn = page.getByRole('link', { name: 'Expertengespräch vereinbaren' }).first();
  }

  serviceCard(title: string): Locator {
    return this.page.locator('.eael-elements-flip-box-container').filter({ hasText: `${title}` });
  }

  //To improve: should use this one instead of direct locator on test case, but doesn't work yet
  // serviceCardMehrErfahren(title: string): Locator {
  //   return this.page
  //     .locator('.eael-elements-flip-box-container')
  //     .getByRole('link', { name: 'Mehr erfahren' })
  //     .first();
  // }

  heroBtn_click() {
    this.heroBtn.click();
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
