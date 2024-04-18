/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  tailwind: true,
  serverModuleFormat: 'cjs',
   // Add the following section to specify ESM packages
   serverDependenciesToBundle: [
    /@apollo\/client*/,
    /ts-invariant*/,
    'zen-observable-ts',
    '@wry/trie',
    '@wry/equality',
    'filesize',
    'optimism',
    '@wry/context',
    'axios',
  ],
};
