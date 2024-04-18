import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();

  return (
    <div className='bg-gray-100 px-2 text-center'>
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className='text-8xl font-extrabold text-status-red'>500</h1>
        <p className='text-4xl font-medium text-gray-800'>
          {t('common:page_error.internal_server_error.title')}
        </p>
        <p className='text-xl text-gray-800 my-4'>
          {t('common:page_error.internal_server_error.title')}
        </p>
        <button
          className='flex items-center gap-2 rounded-xl border-2 border-solid border-primary-base bg-primary-base px-6 py-3 text-sm font-semibold text-neutral-100 outline-none transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base'
          onClick={() => navigate('/')}
        >
          {t('common:page_error.back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
