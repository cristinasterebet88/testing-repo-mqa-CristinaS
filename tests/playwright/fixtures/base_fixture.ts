import { Page } from 'playwright';
import { BasicFormComponent } from '../support/components/forms/BasicFormComponent';
import { UsingGridComponent } from '../support/components/forms/UsingGridComponent';
import { FormWithoutLabelsComponent } from '../support/components/forms/FormWithoutLabelsComponent';
import { BlockFormComponent } from '../support/components/forms/BlockFormComponent';
import { HorizontalFormComponent } from '../support/components/forms/HorizontalFormComponent';
import { WindowComponent } from '../support/components/window/WindowComponent';
import { PopoverPositionComponent } from '../support/components/popover/PopoverPositionComponent';
import { expect, test as base } from 'playwright/test';
import { ApplicationURLs } from '../support/components/main/applicationURLs';
import { PopoverTemplateComponent } from '../support/components/popover/PopoverTemplateComponent';

type MyFixtures = {
  onBasicFormComponent: BasicFormComponent;
  onUsingGridComponent: UsingGridComponent;
  onFormWithoutLabelsForm: FormWithoutLabelsComponent;
  onBlockFormComponent: BlockFormComponent;
  onHorizontalFormComponent: HorizontalFormComponent;
  onWindowComponent: WindowComponent;
  onPopoverPositionComponent: PopoverPositionComponent;
  onPopoverTemplateComponent: PopoverTemplateComponent;
  onApplicationURLs: ApplicationURLs;
};

const createFixture = <T>(Component: new (page: Page) => T) => {
  return async ({ page }: { page: Page }, use: (fixture: T) => Promise<void>) => {
    await use(new Component(page));
  };
};

export const test = base.extend<MyFixtures>({
  onBasicFormComponent: [createFixture(BasicFormComponent), { scope: 'test' }],
  onUsingGridComponent: [createFixture(UsingGridComponent), { scope: 'test' }],
  onFormWithoutLabelsForm: [createFixture(FormWithoutLabelsComponent), { scope: 'test' }],
  onBlockFormComponent: [createFixture(BlockFormComponent), { scope: 'test' }],
  onHorizontalFormComponent: [createFixture(HorizontalFormComponent), { scope: 'test' }],
  onWindowComponent: [createFixture(WindowComponent), { scope: 'test' }],
  onPopoverPositionComponent: [createFixture(PopoverPositionComponent), { scope: 'test' }],
  onPopoverTemplateComponent: [createFixture(PopoverTemplateComponent), { scope: 'test' }],
  onApplicationURLs: [createFixture(ApplicationURLs), { scope: 'test' }],
});

export { expect };