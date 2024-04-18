import { StyleProvider, createCache } from '@ant-design/cssinjs';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps,
} from 'next/document';
import nextI18nextConfig from '~/next-i18next.config';
import { doExtraStyle } from '../scripts/genAntdCss';

const MyDocument = ({ __NEXT_DATA__ }: DocumentProps) => {
  const currentLocale = __NEXT_DATA__.locale || nextI18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  let fileName = '';
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  // 1.1 extract style which had been used
  fileName = doExtraStyle({
    cache,
  });
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        {/* 1.2 inject css */}
        {fileName && <link rel='stylesheet' href={`/${fileName}`} />}
      </>
    ),
  };
};

export default MyDocument;
