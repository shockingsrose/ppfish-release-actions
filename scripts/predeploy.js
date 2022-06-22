const { promises: fs } = require('fs');
const path = require('path');
const pkg = require('../package.json');
const core = require('@actions/core')

const changeLogPath = path.join(__dirname, '../CHANGELOG.md');

const run = async () => {
  const changeLogData = await fs.readFile(changeLogPath, { encoding: 'utf-8' })
  const version = pkg.version;

  const [, changeLog] = /(###\s+[\w.]+\n[\s\S]+?)###/.exec(changeLogData);

  const outputs = { version, changeLog };

  const isPrerelease = /[\d.]+-[\w.]+/.test(version);
  outputs.prerelease = isPrerelease;

  Object.entries(outputs).forEach(([key, value]) => {
    core.setOutput(key, value);
  })

}

run();