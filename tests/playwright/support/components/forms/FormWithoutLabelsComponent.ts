import { Locator, Page } from 'playwright';
import { BaseFormComponent } from './BaseFormComponent';

export class FormWithoutLabelsComponent extends BaseFormComponent {
    readonly formWithoutLabelsRecipientsInput: Locator;
    readonly formWithoutLabelsSubjectInput: Locator;
    readonly formWithoutLabelsMessage: Locator;

    constructor(page: Page) {
        super(page, 'form-without-labels-card');
        this.formWithoutLabelsRecipientsInput = this.card.getByTestId('recipients-input');
        this.formWithoutLabelsSubjectInput = this.card.getByTestId('subject-input');
        this.formWithoutLabelsMessage = this.card.getByTestId('message-input');
    }

    async fillRecipients(value: string) {
        await this.formWithoutLabelsRecipientsInput.fill(value);
    }

    async fillSubject(value: string) {
        await this.formWithoutLabelsSubjectInput.fill(value);
    }

    async fillMessage(value: string) {
        await this.formWithoutLabelsMessage.fill(value);
    }
}
