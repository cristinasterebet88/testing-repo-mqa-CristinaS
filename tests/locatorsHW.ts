import test, { expect } from 'playwright/test';

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:4200/');
      await page.getByText('Forms').click();
      await page.getByText('Block Form').click();
    });

  test('Scoping + getByLabel', async ({ page }) => {
    const blockFormComponent = page.locator('nb-card', { hasText: 'Block form' });
    await expect(blockFormComponent).toBeVisible();

    const firstNameInputByLabel = blockFormComponent.getByLabel('First Name');
    await firstNameInputByLabel.fill('Ada');
    await expect(firstNameInputByLabel).toHaveValue('Ada');

    const lastNameInputByLabel = blockFormComponent.getByLabel('Last Name');
    await lastNameInputByLabel.fill('Lovelace');
    await expect(lastNameInputByLabel).toHaveValue('Lovelace');

    const websiteInputByLabel = blockFormComponent.getByLabel('Website');
    await websiteInputByLabel.fill('https://ada.dev');
    await expect(websiteInputByLabel).toHaveValue('https://ada.dev');
  });

  test('.filter({ has })', async ({ page }) => {
    const blockFormComponent = page.locator('nb-card', { hasText: 'Block form' });
    await expect(blockFormComponent).toBeVisible();
});
})
