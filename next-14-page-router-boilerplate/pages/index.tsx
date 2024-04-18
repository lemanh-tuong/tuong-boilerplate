import { Button } from 'antd';
import { GetStaticProps } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18nextConfig from '../next-i18next.config';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const { t, i18n } = useTranslation(['common']);

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  };

  const changeTo = router.locale === 'en' ? 'fr' : 'en';

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <button onClick={() => onToggleLanguageClick(changeTo)}>
          SSR {t('change-locale', { changeTo })}
        </button>
      </div>
      <div>
        <button onClick={() => clientSideLanguageChange(changeTo)}>
          CSR {t('change-locale', { changeTo })}
        </button>
      </div>
      <Button>{t('common:hello', { name: 'world' })}</Button>
      <Image
        className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
        src='/next.svg'
        alt='Next.js Logo'
        width={180}
        height={37}
        priority
      />
      <Image
        className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
        src='/vercel.svg'
        alt='Next.js Logo'
        width={180}
        height={37}
        priority
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? nextI18nextConfig.i18n.defaultLocale, ['common'])),
    },
  };
};
