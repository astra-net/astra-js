const { task, src } = require('gulp');
const del = require('del');
const fs = require('fs');
const path = require('path');

const packages = [
  'astra-core',
  'astra-crypto',
  'astra-account',
  'astra-network',
  'astra-contract',
  'astra-utils',
  'astra-transaction',
  'astra-staking',
];

task('cleanBrowser', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/lib`;
    return del.sync([pathToLib]);
  });
});

task('cleanServer', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/dist`;
    return del.sync([pathToLib]);
  });
});

task('cleanUnexpected', async () => {
  await packages.map((p) => {
    const pathToLib = `packages/${p}/tsconfig.tsbuildinfo`;
    return del.sync([pathToLib]);
  });
});

task('cleanDocs', async () => {
  await packages.map((p) => {
    const pathToLib = `docs/${p}`;
    return del.sync([pathToLib]);
  });
});
