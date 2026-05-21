import { Locator, Page } from 'playwright';
import { expect } from 'playwright/test';

export type WindowButton = 'windowFormButton' | 'windowWithTemplateButton' | 'windowWithBackdropButton' | 'windowWithoutBackdropButton';

export class WindowComponent {
    readonly page: Page;
    readonly card: Locator;

    readonly windowFormCard: Locator;
    readonly windowWithoutBackdropCard: Locator;

    readonly windowFormButton: Locator;
    readonly windowWithTemplateButton: Locator;
    readonly windowWithBackdropButton: Locator;
    readonly windowWithoutBackdropButton: Locator;
    readonly getOptionButton: (key: WindowButton) => Locator;

    constructor(page: Page) {
        this.page = page;

        this.windowFormCard = this.page.locator('nb-card', { hasText: 'Window Form' });
        this.windowFormButton = this.windowFormCard.getByTestId('open-window-form');
        this.windowWithTemplateButton = this.windowFormCard.getByTestId('open-window-with-template');

        this.windowWithoutBackdropCard = this.page.locator('nb-card', { hasText: 'Window Without Backdrop' });
        this.windowWithBackdropButton = this.windowWithoutBackdropCard.getByTestId('open-window-with-backdrop');
        this.windowWithoutBackdropButton = this.windowWithoutBackdropCard.getByTestId('open-window-without-bakdrop');

        this.getOptionButton = (key) => {
            switch (key) {
                case 'windowFormButton':
                    return this.windowFormButton;
                case 'windowWithTemplateButton':
                    return this.windowWithTemplateButton;
                case 'windowWithBackdropButton':
                    return this.windowWithBackdropButton;
                case 'windowWithoutBackdropButton':
                    return this.windowWithoutBackdropButton;
            }
        }
    }

    async assertVisibility(visibility = true) {
        if (visibility) {
            await expect(this.windowFormCard).toBeVisible();
        } else {
            await expect(this.windowFormCard).not.toBeVisible();
        }
    }

    async clickButon(Key: WindowButton) {
        await this.getOptionButton(Key).click();
    }

}
