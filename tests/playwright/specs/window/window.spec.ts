import { test } from '../../fixtures/base_fixture';

test.describe('Window page', () => {
  test('user should be able to open window form', async ({
    onApplicationURLs,
    onWindowComponent,
  }) => {
    await test.step('Navigate to the window page', async () => {
      await onApplicationURLs.navigateToWindow();
    });

    await test.step('Open window form', async () => {
      await onWindowComponent.clickButton('windowFormButton');
    });

  });

  test('user should be able to open window with template', async ({
    onApplicationURLs,
    onWindowComponent,
  }) => {
    await test.step('Navigate to the window page', async () => {
      await onApplicationURLs.navigateToWindow();
    });

    await test.step('Open window with template', async () => {
      await onWindowComponent.clickButton('windowWithTemplateButton');
    });

  });

  test('user should be able to open window with backdrop', async ({
    onApplicationURLs,
    onWindowComponent,
  }) => {
    await test.step('Navigate to the window page', async () => {
      await onApplicationURLs.navigateToWindow();
    });

    await test.step('Open window with backdrop button', async () => {
      await onWindowComponent.clickButton('windowWithBackdropButton');
    });

  });

  test('user should be able to open window without backdrop', async ({
    onApplicationURLs,
    onWindowComponent,
  }) => {
    await test.step('Navigate to the window page', async () => {
      await onApplicationURLs.navigateToWindow();
    });

    await test.step('Open window without backdrop button', async () => {
      await onWindowComponent.clickButton('windowWithoutBackdropButton');
    });

  });
});
