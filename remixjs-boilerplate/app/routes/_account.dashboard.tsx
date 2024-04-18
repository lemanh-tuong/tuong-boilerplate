import { json } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { authSessionStorage } from '~/packages/common/Auth/sessionStorage';
import type { loader as accountLayoutLoeader } from './_account';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import type { FC } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authSessionStorage.guard({
    request,
    homeUrl: '/dashboard',
  });

  return json({});
};

const Index: FC = () => {
  const accountLayoutLoaderData =
    useRouteLoaderData<typeof accountLayoutLoeader>('routes/_account');

  return (
    <div>
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
        Dashboard page: {JSON.stringify(accountLayoutLoaderData?.session)}
      </div>
    </div>
  );
};

export default Index;
