import test, { expect, Locator, Page } from 'playwright/test';

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('pressSequentially + keyboard + getAttribute', async ({ page }) => {
        const usingBasicFormEmailInput = page
            .locator('nb-card', { hasText: 'Basic form' })
            .getByRole('textbox', { name: 'Email address' });
        await usingBasicFormEmailInput.pressSequentially('John@test.com', { delay: 50 });
        await usingBasicFormEmailInput.press('Tab');
        await expect(usingBasicFormEmailInput).toHaveValue('John@test.com');
        await expect(usingBasicFormEmailInput).toHaveAttribute('type', 'email');
        await expect(usingBasicFormEmailInput).not.toBeFocused();
    });

    test('Radio group exclusivity (with Nebular force gotcha)', async ({ page }) => {
        const option1 = page
            .locator('nb-card', { hasText: 'Using the Grid' })
            .getByRole('radio', { name: 'Option 1' });
        const option2 = page
            .locator('nb-card', { hasText: 'Using the Grid' })
            .getByRole('radio', { name: 'Option 2' });
        const disabledOption = page
            .locator('nb-card', { hasText: 'Using the Grid' })
            .getByRole('radio', { name: 'Disabled Option' });

        await test.step('check both radios are unchecked', async () => {
            await expect(option1).not.toBeChecked();
            await expect(option2).not.toBeChecked();
        });

        await test.step('check option1', async () => {
            await option1.check({ force: true });
        });
        await test.step('check option2', async () => {
            await option2.check({ force: true });
        });
        await expect(option1).not.toBeChecked();
        await expect(option2).toBeChecked();
        await expect(disabledOption).toBeDisabled();
    });

    test('checkbox buttons - action', async ({ page }) => {
        const rememberMeCheckbox = page
            .locator('nb-card', { hasText: 'Inline form' })
            .locator('nb-checkbox', { hasText: 'Remember me' });

        const basicFormComponent = page
            .locator('nb-card', { hasText: 'Basic form' })
            .locator('nb-checkbox', { hasText: 'Check me out' });

        const horizontalFormComponent = page
            .locator('nb-card', { hasText: 'Horizontal form' })
            .locator('nb-checkbox', { hasText: 'Remember me' });

        const checkboxes = [rememberMeCheckbox, basicFormComponent, horizontalFormComponent];

        for (const checkbox of checkboxes) {
            const input = checkbox.locator('input[type="checkbox"]');
            if (!(await input.isChecked())) {
                await checkbox.click();
            }
            await expect(input).toBeChecked();
        }

        if (await checkboxes[1].locator('input[type="checkbox"]').isChecked()) {
            await checkboxes[1].click();
        }

        await expect(checkboxes[0].locator('input[type="checkbox"]')).toBeChecked();
        await expect(checkboxes[1].locator('input[type="checkbox"]')).not.toBeChecked();
        await expect(checkboxes[2].locator('input[type="checkbox"]')).toBeChecked();

        for (const checkbox of checkboxes) {
            await checkbox.click();
        }

        await expect(rememberMeCheckbox.locator('input[type="checkbox"]')).not.toBeChecked();
        await expect(basicFormComponent.locator('input[type="checkbox"]')).toBeChecked();
        await expect(horizontalFormComponent.locator('input[type="checkbox"]')).not.toBeChecked();
    });
});