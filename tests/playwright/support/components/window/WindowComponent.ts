import { Locator, Page } from 'playwright';
import { expect } from 'playwright/test';

export type WindowButton =
    | 'windowFormButton'
    | 'windowWithTemplateButton'
    | 'windowWithBackdropButton'
    | 'windowWithoutBackdropButton';

export class WindowComponent {
    readonly page: Page;
    readonly container: Locator;
    readonly openedWindow: Locator;

    readonly windowFormCard: Locator;
    readonly windowWithoutBackdropCard: Locator;

    readonly windowFormButton: Locator;
    readonly windowWithTemplateButton: Locator;
    readonly windowWithBackdropButton: Locator;
    readonly windowWithoutBackdropButton: Locator;
    readonly getOptionButton: (key: WindowButton) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.getByTestId('window');
        this.openedWindow = this.page.locator('nb-window');

        this.windowFormCard = this.page.locator('nb-card', { hasText: 'Window Form' });
        this.windowFormButton = this.windowFormCard.getByTestId('open-window-form');
        this.windowWithTemplateButton = this.windowFormCard.getByTestId('open-window-with-template');

        this.windowWithoutBackdropCard = this.page.locator('nb-card', { hasText: 'Window Without Backdrop' });
        this.windowWithBackdropButton = this.windowWithoutBackdropCard.getByTestId('open-window-with-backdrop');
        this.windowWithoutBackdropButton = this.windowWithoutBackdropCard.getByTestId(
            'open-window-without-backdrop',
        );

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
        };
    }

    async assertVisibility(visibility = true) {
        if (visibility) {
            await expect(this.container).toBeVisible();
            await expect(this.windowFormCard).toBeVisible();
            await expect(this.windowWithoutBackdropCard).toBeVisible();
        } else {
            await expect(this.container).not.toBeVisible();
        }
    }

    async clickButton(key: WindowButton) {
        const button = this.getOptionButton(key);
        await expect(button).toBeVisible();
        await expect(this.openedWindow).not.toBeAttached();
        await button.click();
        await expect(this.openedWindow).toBeVisible();
    }
}
