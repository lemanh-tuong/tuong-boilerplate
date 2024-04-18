import { cssBundleHref } from '@remix-run/css-bundle';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';
import { FixedProgressLoader } from './components/FixedProgressLoader';
import antd from './css/antd.min.css';
import reset from './css/reset.css';
import tailwind from './css/tailwind.css';
import { KeyOfI18nInSearchParams } from './packages/common/I18n/constants';
import { i18nCookie, i18next } from './packages/common/I18n/i18next.server';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from './utils/functions/updateURLSearchParamsOfBrowserWithoutNavigation';
import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwind },
  { rel: 'stylesheet', href: reset },
  { rel: 'stylesheet', href: antd },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const ErrorBoundary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/500');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const meta: MetaFunction = () => {
  return [
    {
      charset: 'utf-8',
      title: 'Remixjs boilerplate',
      viewport: 'width=device-width,initial-scale=1',
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);
  const publicEnv = Object.keys(process.env).reduce<Record<string, string>>((result, item) => {
    const value = process.env[item];
    if (item.startsWith('PUBLIC_') && value) {
      return {
        ...result,
        [item]: value,
      };
    }
    return result;
  }, {});

  return json(
    { locale, env: publicEnv },
    {
      headers: { 'Set-Cookie': await i18nCookie.serialize(locale) },
    },
  );
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: ['common'],
};

const Root = () => {
  const navigation = useNavigation();
  const { locale, env } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const [currentUrlSearchParams] = useSearchParams();

  useChangeLanguage(locale);

  useEffect(() => {
    const isI18nParams = currentUrlSearchParams.get(KeyOfI18nInSearchParams);
    if (isI18nParams) {
      currentUrlSearchParams.delete(KeyOfI18nInSearchParams);
      updateURLSearchParamsOfBrowserWithoutNavigation(currentUrlSearchParams);
    }
  }, [currentUrlSearchParams]);

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(env)}`,
        }}
      />
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <FixedProgressLoader done={navigation.state === 'idle'} />
      </body>
    </html>
  );
};

export default Root;
