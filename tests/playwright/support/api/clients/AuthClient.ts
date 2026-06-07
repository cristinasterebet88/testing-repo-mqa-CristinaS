import { APIResponse } from 'playwright';
import { LoginPayload, RegisterPayload, UpdateProfilePayload } from '../types';
import { BaseApiClients } from './BaseAPIClients';

export class AuthClient extends BaseApiClients {
  async register(payload: RegisterPayload): Promise<APIResponse> {
    return this.post('/auth/register', payload);
  }

  async login(payload: LoginPayload): Promise<APIResponse> {
    return this.post('/auth/login', payload);
  }

  async updateProfile(payload: UpdateProfilePayload): Promise<APIResponse> {
    return this.patch('/auth/updateprofile', payload);
  }
}