import { Outlet } from '@remix-run/react';
import { authSessionStorage } from '~/packages/common/Auth/sessionStorage';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authSessionStorage.guard({
    request,
    homeUrl: '/dashboard',
  });

  return null;
};

const AuthLayoutRoot = () => {
  return <Outlet />;
};

export default AuthLayoutRoot;
