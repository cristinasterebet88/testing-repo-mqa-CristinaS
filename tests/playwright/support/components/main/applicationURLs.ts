import { Page } from 'playwright';
import { BasicFormComponent } from '../forms/BasicFormComponent';
import { WindowComponent } from '../window/WindowComponent';
import { PopoverPositionComponent } from '../popover/PopoverPositionComponent';

export class ApplicationURLs {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToFormsLayouts() {
    await this.page.goto('/pages/forms/layouts', { waitUntil: 'domcontentloaded' });

    const basicForm = new BasicFormComponent(this.page);
    await basicForm.assertVisibility(true);
  }

  async navigateToWindow() {
    await this.page.goto('/pages/modal-overlays/window', { waitUntil: 'domcontentloaded' });

    const window = new WindowComponent(this.page);
    await window.assertVisibility(true);
  }

  async navigateToPopover() {
    await this.page.goto('/pages/modal-overlays/popover', { waitUntil: 'domcontentloaded' });

    const popoverForm = new PopoverPositionComponent(this.page);
    await popoverForm.assertVisibility(true);
  }
}
