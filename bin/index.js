#!/usr/bin/env node
const { getDefaultUrl } = require('./lib/util')
const { DEFAULT_PORT } = require('./lib/const')

// optionを共通化してしまっているので、ビルドごとに必要なものだけを定義する。
const buildOption = {
  open: {
    default: true,
    describe:
      'When server execute, open browser. If you do not use it, please use `--no-open` or `--open false`.',
    type: 'boolean'
  },
  port: {
    alias: 'p',
    default: DEFAULT_PORT,
    describe: "Set port for am-mocktimes's pattern list server.",
    type: 'number'
  },
  pattern: {
    default: 'mock/pattern.yml',
    describe:
      "Set location of mock pattern file (.yml | .js | .json) for am-mocktimes's display.",
    type: 'string'
  },
  config: {
    default: 'mock/config.js',
    describe: 'Set location of js file with mock action is defined.',
    type: 'string'
  },
  app: {
    alias: 'a',
    default: 'src/index.html',
    describe: 'Set product html file.',
    type: 'string'
  },
  'script-src': {
    alias: 's',
    default: 'app.js',
    describe: 'Set main script src in product html file.',
    type: 'string'
  },
  'sub-files': {
    alias: 'ss',
    default: [],
    describe:
      'Set sub html files. If you want to set multiple files, please set like this. `-ss src/demo/*.html -ss doc/*.html`',
    type: 'array'
  },
  'out-dir': {
    alias: 'd',
    default: '.am-mocktimes',
    describe: 'Set output directory for am MockTimes.',
    type: 'string'
  },
  'public-url': {
    describe:
      'Set the public URL to serve on. defaults to the same as the --out-dir option',
    type: 'string'
  },
  'use-parcel': {
    default: true,
    describe: 'Use parcel.',
    type: 'boolean'
  },
  'mock-reload': {
    alias: 'r',
    default: false,
    describe: 'Mock html reload when hot module replacement.',
    type: 'boolean'
  }
}

const argv = require('yargs')
  .command(
    'screenshot',
    'Capture all mock pages. Make sure to access the mock page.',
  {
    width: {
      alias: 'w',
      describe: 'Set viewport width.',
      default: 1440
    },
    height: {
      alias: 'h',
      describe: 'Set viewport height.',
      default: 900
    },
    url: {
      alias: 'u',
      describe: "Set port for am-mocktimes's pattern url.",
      default: getDefaultUrl({
        port: DEFAULT_PORT
      })
    },
    'out-dir': {
      alias: 'd',
      default: './am-mocktimes-img',
      describe: 'Set output directory for mock images.'
    }
  }
  )
  .command('watch', 'Watch and output pattern & mock pages.', buildOption)
  .command('build', 'Output pattern & mock pages.', buildOption)
  .command(
    'generate-template',
    'Generate page files. Mock and application sources.',
    buildOption
  ).argv

const [command] = argv._

switch (command) {
  case 'screenshot':
    require('./screenshot')(argv)
    break
  case 'watch':
    require('./watch')(argv)
    break
  case 'build':
    require('./build')(argv)
    break
  case 'generate-template':
    require('./generate-template')(argv)
    break
  default:
    throw new Error(`command not find: '${command}'`)
}
