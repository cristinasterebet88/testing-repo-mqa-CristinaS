import { test } from '../fixtures/base_fixture';
import { argosFullScreenshot } from '../support/utils/argosSmartScreenshot';

test.describe('Window — visual', () => {
    test('full page', async ({ page, onApplicationURLs }) => {
        await onApplicationURLs.navigateToWindow();
        await argosFullScreenshot({ page, snapshotName: 'window/window-full' });
    });
});
