import { APIResponse } from 'playwright/test';
import { expect, test } from '../../fixtures/api-fixture';
import { buildRegisterPayload } from '../../support/api/builders/payloads';

function expectClientError(response: APIResponse) {
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);
}

test.describe('Auth API', () => {
  test('should register a new user', async ({ unauthedAuthClient }) => {
    const payload = buildRegisterPayload();
    let response!: APIResponse;

    await test.step('call POST /auth/register', async () => {
      response = await unauthedAuthClient.register(payload);
    });

    await test.step('assert status is 201 with a user object', async () => {
      expect(response.status()).toBe(201);

      const body = (await response.json()) as { user?: { email?: string } };
      expect(body.user).toHaveProperty('email');
      expect(body.user?.email).toEqual(payload.email);
    });
  });

  test('should reject duplicate email addresses', async ({ unauthedAuthClient, testUser }) => {
    const payload = buildRegisterPayload({ email: testUser.email });
    let response!: APIResponse;

    await test.step('call POST /auth/register', async () => {
      response = await unauthedAuthClient.register(payload);
    });

    await test.step('assert status is 400 with a error message', async () => {
      expectClientError(response);
    });
  });
});