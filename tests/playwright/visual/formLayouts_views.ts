import { test } from '../fixtures/base_fixture';
import {
    argosComponentScreenshot,
    argosFullScreenshot,
} from '../support/utils/argosSmartScreenshot';

test.describe('Form layouts — visual', () => {
    test('full page', async ({ page, onApplicationURLs }) => {
        await onApplicationURLs.navigateToFormsLayouts();
        await argosFullScreenshot({ page, snapshotName: 'forms/form-layouts-full' });
    });

    test('Basic Form Component', async ({ page, onApplicationURLs, onBasicFormComponent }) => {
        await onApplicationURLs.navigateToFormsLayouts();
        await onBasicFormComponent.assertVisibility(true);
        await argosComponentScreenshot({
            page,
            snapshotName: 'forms/basic-form-component',
            selector: onBasicFormComponent.card,
        });
    });
});
