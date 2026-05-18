import { Page } from 'playwright';
import { BasicFormComponent } from '../support/components/forms/BasicFormComponent';
import { UsingGridComponent } from '../support/components/forms/UsingGridComponent';
import { FormWithoutLabelsComponent } from '../support/components/forms/FormWithoutLabelsComponent';
import { BlockFormComponent } from '../support/components/forms/BlockFormComponent';
import { HorizontalFormComponent } from '../support/components/forms/HorizontalFormComponent';
import { expect, test as base } from 'playwright/test';
import { ApplicationURLs } from '../support/components/main/applicationURLs';

type MyFixtures = {
  onBasicForm: BasicFormComponent;
  onGridForm: UsingGridComponent;
  onFormWithoutLabelsForm: FormWithoutLabelsComponent;
  onBlockFormComponent: BlockFormComponent;
  HorizontalFormComponent: HorizontalFormComponent;
  onApplicationURLs: ApplicationURLs;
};

const createFixture = <T>(Component: new (page: Page) => T) => {
  return async ({ page }: { page: Page }, use: (fixture: T) => Promise<void>) => {
    await use(new Component(page));
  };
};

export const test = base.extend<MyFixtures>({
  onBasicForm: [createFixture(BasicFormComponent), { scope: 'test' }],
  onGridForm: [createFixture(UsingGridComponent), { scope: 'test' }],
  onFormWithoutLabelsForm: [createFixture(FormWithoutLabelsComponent), { scope: 'test' }],
  onBlockFormComponent: [createFixture(BlockFormComponent), { scope: 'test' }],
  HorizontalFormComponent: [createFixture(HorizontalFormComponent), { scope: 'test' }],
  onApplicationURLs: [createFixture(ApplicationURLs), { scope: 'test' }],
});

export { expect };
