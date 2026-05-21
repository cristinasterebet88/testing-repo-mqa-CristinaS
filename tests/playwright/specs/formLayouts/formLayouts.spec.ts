import { test } from '../../fixtures/base_fixture';

test.describe('Form Layouts page', () => {
  test('user should be able to complete the Basic form and submit it', async ({
    onApplicationURLs,
    onBasicFormComponent,
  }) => {
    const testEmail = 'test@test.com';
    const testPassword = 'password';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the basic form', async () => {
      await onBasicFormComponent.assertVisibility(true);
      await onBasicFormComponent.fillEmail(testEmail);
      await onBasicFormComponent.fillPassword(testPassword);
    });

    await test.step("Check the 'Check me out' checkbox", async () => {
      await onBasicFormComponent.toggleCheckMeOut();
    });

    await test.step('Submit the form', async () => {
      await onBasicFormComponent.submit();
    });
  });

  test('user should be able to complete the Grid form and submit it', async ({
    onApplicationURLs,
    onUsingGridComponent,
  }) => {
    const testEmail = 'test@test.com';
    const testPassword = 'password';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the grid form', async () => {
      await onUsingGridComponent.assertVisibility(true);
      await onUsingGridComponent.fillEmail(testEmail);
      await onUsingGridComponent.fillPassword(testPassword);
      await onUsingGridComponent.selectOption('option2');
    });

    await test.step('Submit the form', async () => {
      await onUsingGridComponent.submit();
    });
  });

  test('user should be able to complete the Form without labels form and submit it', async ({
    onApplicationURLs,
    onFormWithoutLabelsForm,
  }) => {
    const testRecipints = 'test@test.com';
    const testSubject = 'Welcome Email';
    const testMessage = 'Welcome to IoT Dashboard';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the Form without labels ', async () => {
      await onFormWithoutLabelsForm.assertVisibility(true);
      await onFormWithoutLabelsForm.fillRecipients(testRecipints);
      await onFormWithoutLabelsForm.fillSubject(testSubject);
      await onFormWithoutLabelsForm.fillMessage(testMessage);
    });

    await test.step('Submit the form', async () => {
      await onFormWithoutLabelsForm.submit();
    });
  });

  test('user should be able to complete the Block form and submit it', async ({
    onApplicationURLs,
    onBlockFormComponent,
  }) => {
    const testFirstNAme = 'Cristina';
    const testLastName = 'Sterebet';
    const testEmail = 'test@test.com';
    const testWebsite = 'bnm.md';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the Block form', async () => {
      await onBlockFormComponent.assertVisibility(true);
      await onBlockFormComponent.fillFirstName(testFirstNAme);
      await onBlockFormComponent.fillLastName(testLastName);
      await onBlockFormComponent.fillEmail(testEmail);
      await onBlockFormComponent.fillWebsite(testWebsite);
    });

    await test.step('Submit the form', async () => {
      await onBlockFormComponent.submit();
    });
  });

  test('user should be able to complete the Horizontal form and submit it', async ({
    onApplicationURLs,
    onBlockFormComponent,
  }) => {
    const testFirstName = 'Cristina';
    const testLastName = 'Sterebet';
    const testEmail = 'test@test.com';
    const testWebsite = 'bnm.md';

    await test.step('Navigate to the form layouts page', async () => {
      await onApplicationURLs.navigateToFormsLayouts();
    });

    await test.step('Complete the Block form', async () => {
      await onBlockFormComponent.assertVisibility(true);
      await onBlockFormComponent.fillFirstName(testFirstName);
      await onBlockFormComponent.fillLastName(testLastName);
      await onBlockFormComponent.fillEmail(testEmail);
      await onBlockFormComponent.fillWebsite(testWebsite);
    });

    await test.step('Submit the form', async () => {
      await onBlockFormComponent.submit();
    });
  });
});
