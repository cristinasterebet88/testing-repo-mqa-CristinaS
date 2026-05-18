import test, { expect } from 'playwright/test';

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
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
    const blockFormComponent = page.locator('nb-card', {
      has: page.locator('textarea'),
    });
  
    await expect(blockFormComponent).toHaveCount(1);
  
    await expect(blockFormComponent.locator('nb-card-header'))
      .toHaveText('Form without labels');
  });

  test('Strict mode + counting + indexing', async ({ page }) => {
    const emailInputs = page.locator('input[type="email"]');

    await expect(emailInputs).toHaveCount(4);

    const firstEmail = emailInputs.first();
    await firstEmail.fill('first@email.com');
  
    const lastEmail = emailInputs.last();
    await lastEmail.fill('last@email.com');
  
    await expect(firstEmail).toHaveValue('first@email.com');
    await page.waitForTimeout(3000);
    await expect(lastEmail).toHaveValue('last@email.com');
    await page.waitForTimeout(3000);
  });
  });
