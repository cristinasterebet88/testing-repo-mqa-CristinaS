import { expect, test } from '../../fixtures/base_fixture';

test.describe('Popover page', () => {
    test('user should be able to hover over left button on Popover Position Form', async ({
        onApplicationURLs,
        onPopoverPositionComponent,
    }) => {
        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('Hover over left button', async () => {
            await onPopoverPositionComponent.hoverPositionButtons('left');
        });

    });

    test('user should be able to hover over top button on Popover Position Form', async ({
        onApplicationURLs,
        onPopoverPositionComponent,
    }) => {
        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('over over top button', async () => {
            await onPopoverPositionComponent.hoverPositionButtons('top');
        });

    });

    test('user should be able to hover over bottom button on Popover Position Form', async ({
        onApplicationURLs,
        onPopoverPositionComponent,
    }) => {
        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('over over bottom button', async () => {
            await onPopoverPositionComponent.hoverPositionButtons('bottom');
        });

    });

    test('user should be able to hover over right button on Popover Position Form', async ({
        onApplicationURLs,
        onPopoverPositionComponent,
    }) => {
        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('over over right button', async () => {
            await onPopoverPositionComponent.hoverPositionButtons('right');
        });

    });

    test('user should be able to hover over WITH TABS button on the Template Popover form and see the popover', async ({
        onApplicationURLs,
        onPopoverTemplateComponent,
    }) => {
        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('Hover over With tabs button', async () => {
            await onPopoverTemplateComponent.hoverTemplateButton('with-tabs');
        });

        await test.step('See the popover with first tab content', async () => {
            await expect(onPopoverTemplateComponent.popover).toBeVisible();
            await expect(onPopoverTemplateComponent.whatsUpTab).toBeVisible();
            await onPopoverTemplateComponent.assertTabsContent('Such a wonderful day!');
        });

        await test.step('Click on the second tab', async () => {
            await onPopoverTemplateComponent.openSecondTab();
        });

        await test.step('See the popover with second tab content', async () => {
            await expect(onPopoverTemplateComponent.popover).toBeVisible();
            await expect(onPopoverTemplateComponent.secondTab).toBeVisible();
            await onPopoverTemplateComponent.assertTabsContent('Indeed!');
        });
    });

    test('user should be able to hover over WITH FORM button on the Template Popover form and fill&send the popover', async ({
        onApplicationURLs,
        onPopoverTemplateComponent,
    }) => {
        const testRecipients = 'Cristina';
        const testSubject = 'Sterebet';
        const testMessage = 'Welcome';

        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('Hover over With form button', async () => {
            await onPopoverTemplateComponent.hoverTemplateButton('with-form');
        });

        await test.step('Complete the form', async () => {
            await onPopoverTemplateComponent.assertVisibility(true);
            await onPopoverTemplateComponent.fillForm(testRecipients, testSubject, testMessage);
        });

        await test.step('Submit the form', async () => {
            await onPopoverTemplateComponent.submit();
        });
    });

    test('user should be able to hover over WITH CARD button on the Template Popover form and see the popover', async ({
        onApplicationURLs,
        onPopoverTemplateComponent,
    }) => {
        const header = 'Cristina';
        const body = 'Sterebet';

        await test.step('Navigate to the popover page', async () => {
            await onApplicationURLs.navigateToPopover();
        });

        await test.step('Hover over With card button', async () => {
            await onPopoverTemplateComponent.hoverTemplateButton('with-card');
        });

        await onPopoverTemplateComponent.assertCardContent(
            'Hello!',
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.'
        );
    });
});
