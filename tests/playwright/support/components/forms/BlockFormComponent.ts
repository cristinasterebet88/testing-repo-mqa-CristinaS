import { Locator, Page } from 'playwright';
import { BaseFormComponent } from './BaseFormComponent';

export class BlockFormComponent extends BaseFormComponent {
    readonly usingBlockFirstNameInput: Locator;
    readonly usingBlockLastNameInput: Locator;
    readonly usingBlockEmailInput: Locator;
    readonly usingBlockWebsiteInput: Locator;

    constructor(page: Page) {
        super(page, 'block-form-card');
        this.usingBlockFirstNameInput = this.card.getByTestId('firstname-input');
        this.usingBlockLastNameInput = this.card.getByTestId('lastname-input');
        this.usingBlockEmailInput = this.card.getByTestId('email-input');
        this.usingBlockWebsiteInput = this.card.getByTestId('website-input');
    }

    async fillFirstName(value: string) {
        await this.usingBlockFirstNameInput.fill(value);
    }

    async fillLastName(value: string) {
        await this.usingBlockLastNameInput.fill(value);
    }

    async fillEmail(value: string) {
        await this.usingBlockEmailInput.fill(value);
    }

    async fillWebsite(value: string) {
        await this.usingBlockWebsiteInput.fill(value);
    }
}
