import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authSessionStorage } from '~/packages/common/Auth/sessionStorage';
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import type { ChangeEvent } from 'react';
import type { SessionData } from '~/packages/common/Auth/sessionStorage';

export interface LoaderResponse {
  session: SessionData;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  return json({
    session: session.data,
  });
};

const Page = () => {
  const { t, i18n } = useTranslation();
  const { session } = useLoaderData<typeof loader>();
  const [langState, setLangState] = useState(i18n.language);

  useEffect(() => {
    setLangState(i18n.language);
  }, [i18n.language]);

  const handleChange = (lang: 'en' | 'fr') => (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setLangState(lang);
      i18n.changeLanguage(lang);
    }
  };

  return (
    <div>
      <div className='hidden lg:inline-block'>
        <div>Language: </div>
        <div className='inline-flex gap-3'>
          <div>
            <div>EN </div>
            <input type='checkbox' checked={langState === 'en'} onChange={handleChange('en')} />
          </div>
          <div>
            <div>FR </div>
            <input type='checkbox' checked={langState === 'fr'} onChange={handleChange('fr')} />
          </div>
        </div>
      </div>
      <div>Test I18n: {t('welcome', { name: 'User' })}</div>
      <div>Account Layout: {JSON.stringify(session)}</div>
      <Outlet />
    </div>
  );
};

export default Page;
