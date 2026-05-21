import { test } from '../fixtures/base_fixture';
import {
    argosComponentScreenshot,
    argosFullScreenshot,
} from '../support/utils/argosSmartScreenshot';

test.describe('Form Popover — visual', () => {
    test('full page', async ({ page, onApplicationURLs }) => {
        await onApplicationURLs.navigateToFormsLayouts();
        await argosFullScreenshot({ page, snapshotName: 'forms/popover-full' });
    });

    test('Popover Position Component', async ({ page, onApplicationURLs, onPopoverPositionComponent }) => {
        await onApplicationURLs.navigateToFormsLayouts();
        await onPopoverPositionComponent.assertVisibility(true);
        await argosComponentScreenshot({
            page,
            snapshotName: 'forms/popover-component',
            selector: onPopoverPositionComponent.card,
        });
    });
});
