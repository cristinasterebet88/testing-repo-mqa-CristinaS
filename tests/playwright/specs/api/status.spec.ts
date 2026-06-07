import { APIResponse } from 'playwright/test';
import { expect, test } from '../../fixtures/api-fixture';
import type { StatusResponse } from '../../support/api/types';

test.describe('Status API', () => {
  test('should return the status 200 OK of the API', async ({ statusClient }) => {
    let response = await statusClient.getStatus();

    await test.step('call GET /status', async () => {
      response = await statusClient.getStatus();
    });

    await test.step('verify status 200 OK', async () => {
      expect(response.status()).toBe(200);
    });
  });
});
