import { expect, Locator, Page } from '@playwright/test';

export type PopoverTemplateButton = 'with-tabs' | 'with-form' | 'with-card';

export class PopoverTemplateComponent {
    readonly page: Page;
    readonly card: Locator;

    readonly getTemplateButton: (key: PopoverTemplateButton) => Locator;

    readonly popover: Locator;
    readonly whatsUpTab: Locator;
    readonly secondTab: Locator;

    readonly popoverRecipientsInput: Locator;
    readonly popoverSubjectInput: Locator;
    readonly popoverMessageInput: Locator;
    readonly submitButton: Locator;

    readonly popoverCard: Locator;
    readonly popoverHeader: Locator;
    readonly popoverBody: Locator;

    constructor(page: Page) {
        this.page = page;

        this.card = this.page.locator('nb-card', { hasText: 'Template Popovers' });
        this.getTemplateButton = (key) =>
            this.card.getByTestId(`popover-template-${key}`);

        this.popover = page.locator('.cdk-overlay-pane');

        this.whatsUpTab = this.popover.getByText("What's up?");
        this.secondTab = this.popover.getByText('Second Tab');

        this.popoverRecipientsInput = this.popover.getByTestId('popover-recipients-input');
        this.popoverSubjectInput = this.popover.getByTestId('popover-subject-input');
        this.popoverMessageInput = this.popover.getByTestId('popover-message-input');
        this.submitButton = this.popover.getByTestId('submit-button');

        this.popoverCard = page.locator('nb-card.popover-card');
        this.popoverHeader = this.popoverCard.locator('nb-card-header');
        this.popoverBody = this.popoverCard.locator('nb-card-body');
    }

    async assertVisibility(visibility = true) {
        if (visibility) {
            await expect(this.card).toBeVisible();
        } else {
            await expect(this.card).not.toBeVisible();
        }
    }

    //WITH TABS
    async clickTemplateButton(key: PopoverTemplateButton) {
        await this.getTemplateButton(key).click();
    }

    async hoverTemplateButton(key: PopoverTemplateButton) {
        await this.getTemplateButton(key).hover();
    }

    async openWhatsUpTab() {
        await this.whatsUpTab.click();
    }

    async assertTabsContent(expected: string) {
        const tabPanel = this.popover.locator('.p-4').filter({ hasText: expected });
        await expect(tabPanel).toBeVisible();
    }

    async openSecondTab() {
        const button = this.getTemplateButton('with-tabs');
        await button.hover();
        await expect(this.popover).toBeVisible();
        await this.popover.hover({ position: { x: 8, y: 8 } });
        await this.secondTab.click();
        await expect(this.popover.locator('nb-tab.content-active .p-4')).toContainText('Indeed!');
    }

    //WITH FORM

    async fillForm(recipients: string, subject: string, message: string) {
        await this.popover.hover({ position: { x: 16, y: 16 } });
        await this.popoverRecipientsInput.fill(recipients);
        await this.popoverSubjectInput.fill(subject);
        await this.popoverMessageInput.fill(message);
    }

    async submit() {
        await this.submitButton.click();
    }

    //WITH CARD
    async assertCardContent(header: string, body: string) {
        await expect(this.popoverHeader).toContainText(header);
        await expect(this.popoverBody).toContainText(body);
    }
}
