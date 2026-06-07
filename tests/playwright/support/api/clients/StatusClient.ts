import { APIResponse } from 'playwright';
import { BaseApiClients } from './BaseAPIClients';

export class StatusClient extends BaseApiClients {
  async getStatus(): Promise<APIResponse> {
    return this.get('/status');
  }
}