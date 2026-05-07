const types = ['fix', 'feature', 'chore', 'ci'];
const appsNames = ['webapp', 'addin', 'tablet', 'iot', 'root'];
const packageNames = [
  'core',
  'env',
  'api',
  'ui',
  'i18n',
  'eslint-config-custom',
  'fullcalendar',
  'utils',
  'testing',
  'tsconfig',
  'tailwind-config',
  'storage',
  'msw',
  'logger',
];
const appNamesString = appsNames.join('|');
const typesString = types.join('|');
const appsAndPackagesString = [...appsNames, ...packageNames].join('|');
const issuePrefix = 'ND';
const issueNumber = '\\d{1,6}';
const pattern = `^(develop)|(main)|(release(-(${appNamesString}))?\/.*)|(hotfix(-(${appNamesString}))?\/.*)|((${typesString})-(${appsAndPackagesString}))\/${issuePrefix}-${issueNumber}(-.*)?$`;

module.exports = {
  pattern: [pattern],
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
