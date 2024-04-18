import { redirect } from '@remix-run/node';
import { authSessionStorage } from '~/packages/common/Auth/sessionStorage';
import type { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionFunctionArgs) => {
  return authSessionStorage.destroySession(request);
};

export const loader = async () => redirect('/login');
