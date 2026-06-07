import { APIResponse } from 'playwright/test';
import { expect, test } from '../../fixtures/api-fixture';
import { buildGoalPayload } from '../../support/api/builders/payloads';
import { buildUpdateGoalPayload } from '../../support/api/builders/payloads';
import { Goal, GoalsListResponse } from '../../support/api/types';

async function unwrapGoal(response: APIResponse): Promise<Goal> {
  const body = (await response.json()) as { goal?: Goal } & Record<string, unknown>;
  return (body.goal ?? (body as unknown as Goal)) as Goal;
}

async function unwrapGoalsList(response: APIResponse): Promise<Goal[]> {
  const body = (await response.json()) as GoalsListResponse;
  return body.goals ?? [];
}

test.describe('Goals API', () => {
  test('should create a default goal', async ({ goalsClient }) => {
    const payload = buildGoalPayload({
      title: 'Test Goal',
      description: 'Test Description',
    });

    let response!: APIResponse;

    await test.step('call POST /goals', async () => {
      response = await goalsClient.create(payload);
    });

    await test.step('assert status is 201 with a goal object', async () => {
      expect(response.status()).toBe(201);

      const created = await unwrapGoal(response);

      expect(created.title).toBe(payload.title);
      expect(created.description).toBe(payload.description);
      expect(created.status).toBe('to-do');
      expect(created.priority).toBe('low');
    });
  });

  test('should create a goal with custom status and priority', async ({ seedGoal }) => {
    let goal!: Goal;

    await test.step('call POST /goals', async () => {
      goal = await seedGoal({
        status: 'in-progress',
        priority: 'medium',
      });
    });

    await test.step('assert status is 201 with a goal object', async () => {
      expect(goal.status).toBe('in-progress');
      expect(goal.priority).toBe('medium');
    });
  });

  test('should get all goals', async ({ seedGoal, goalsClient }) => {
    let firstGoal!: Goal;
    let secondGoal!: Goal;
    let response!: APIResponse;

    await test.step('create test goals', async () => {
      firstGoal = await seedGoal({
        title: 'First Goal',
      });

      secondGoal = await seedGoal({
        title: 'Second Goal',
      });
    });

    await test.step('call GET /goals', async () => {
      response = await goalsClient.list();
    });

    await test.step('assert created goals are returned', async () => {
      expect(response.status()).toBe(200);

      const returnedGoals = await unwrapGoalsList(response);

      const ids = returnedGoals.map((g) => g._id ?? g.id);

      expect(ids).toContain(firstGoal._id ?? firstGoal.id);
      expect(ids).toContain(secondGoal._id ?? secondGoal.id);
    });
  });

  test('should get a goal by id', async ({ seedGoal, goalsClient }) => {
    let goal!: Goal;
    let response!: APIResponse;

    await test.step('create a goal', async () => {
      goal = await seedGoal({
        title: 'Test Goal',
        description: 'Test Description',
      });
    });

    await test.step('call GET /goals/:id', async () => {
      response = await goalsClient.getById(goal._id ?? goal.id!);
    });

    await test.step('assert goal is returned', async () => {
      expect(response.status()).toBe(200);

      const returnedGoal = await unwrapGoal(response);

      expect(returnedGoal.title).toBe(goal.title);
      expect(returnedGoal.description).toBe(goal.description);
      expect(returnedGoal.status).toBe(goal.status);
      expect(returnedGoal.priority).toBe(goal.priority);
    });
  });

  test('should update a goal', async ({ seedGoal, goalsClient }) => {
    let goal!: Goal;
    let response!: APIResponse;

    await test.step('create a goal', async () => {
      goal = await seedGoal({
        status: 'to-do',
        priority: 'low',
      });
    });

    await test.step('call PATCH /goals/:id', async () => {
      const payload = buildUpdateGoalPayload();

      response = await goalsClient.update(goal._id ?? goal.id!, payload);
    });

    await test.step('assert goal was updated', async () => {
      expect(response.status()).toBe(200);

      const updated = await unwrapGoal(response);

      expect(updated.status).toBe('completed');
      expect(updated.priority).toBe('high');
    });
  });

  test('should show progress', async ({ seedGoal, goalsClient }) => {
    let response!: APIResponse;

    await test.step('create goals with different statuses', async () => {
      await seedGoal({
        status: 'to-do',
        priority: 'low',
      });

      await seedGoal({
        status: 'in-progress',
        priority: 'medium',
      });

      await seedGoal({
        status: 'completed',
        priority: 'high',
      });
    });

    await test.step('call GET /goals/showprogress', async () => {
      response = await goalsClient.showProgress();
    });

    await test.step('assert progress is returned', async () => {
      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.myProgress['to-do']).toBeGreaterThanOrEqual(1);
      expect(body.myProgress['in-progress']).toBeGreaterThanOrEqual(1);
      expect(body.myProgress.completed).toBeGreaterThanOrEqual(1);
    });
  });
});
