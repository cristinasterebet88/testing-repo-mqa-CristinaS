import { Locator, Page } from 'playwright';
import { expect } from 'playwright/test';

export type PopoverPosition = 'left' | 'top' | 'bottom' | 'right';

export class PopoverPositionComponent {
    readonly page: Page;
    readonly card: Locator;

    readonly getPositionButton: (key: PopoverPosition) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.card = this.page.locator('nb-card', { hasText: 'Popover Position' });
        this.getPositionButton = (key) =>
            this.card.getByTestId(`popover-position-${key}`);
    }

    async assertVisibility(visibility = true) {
        if (visibility) {
            await expect(this.card).toBeVisible();
        } else {
            await expect(this.card).not.toBeVisible();
        }
    }

    async hoverPositionButtons(key: PopoverPosition) {
        await this.getPositionButton(key).hover();
        await expect(this.page.getByText('Hello, how are you today?')).toBeVisible();
    }

}
