const path = require('path');
const builtinModules = require('builtin-modules');

const config = require('.');

const dev = process.env.NODE_ENV !== 'production';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: path.join('/', config.baseHref), static: true },
    'src/renderer': path.join('/', config.rendererBaseHref),
  },
  plugins: [
    '@snowpack/plugin-dotenv',
    !dev && path.join(__dirname, '../lib/snowpack-plugin-relative-assets.js'),
  ].filter(Boolean),
  devOptions: {
    output: 'stream',
    open: 'none',
    port: config.snowpackPort,
  },
  buildOptions: {
    out: path.join(config.outputDir, 'renderer'),
  },
  packageOptions: {
    external: [...builtinModules, 'electron'],
  },
};
