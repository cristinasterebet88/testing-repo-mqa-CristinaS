import { Locator, Page } from 'playwright';
import { BaseFormComponent } from './BaseFormComponent';
import { expect } from 'playwright/test';

export class HorizontalFormComponent extends BaseFormComponent {
    readonly usingHorizontalEmailInput: Locator;
    readonly usingHorizontalPasswordInput: Locator;
    readonly usingHorizontalCheckMeOut: Locator;

    constructor(page: Page) {
        super(page, 'horizontal-form-card');
        this.usingHorizontalEmailInput = this.card.getByTestId('email-input');
        this.usingHorizontalPasswordInput = this.card.getByTestId('website-input');
    }

    async fillFirstName(value: string) {
        await this.usingHorizontalEmailInput.fill(value);
    }

    async fillLastName(value: string) {
        await this.usingHorizontalPasswordInput.fill(value);
    }

    async toggleCheckMeOut() {
        await expect(this.usingHorizontalCheckMeOut).not.toBeChecked();
        await this.usingHorizontalCheckMeOut.check({ force: true });
        await expect(this.usingHorizontalCheckMeOut).toBeChecked();
    }

    async unToggleCheckMeOut() {
        await expect(this.usingHorizontalCheckMeOut).toBeChecked();
        await this.usingHorizontalCheckMeOut.uncheck({ force: true });
        await expect(this.usingHorizontalCheckMeOut).not.toBeChecked();
    }

}