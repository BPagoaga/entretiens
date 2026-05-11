const types = ['fix', 'feature', 'chore', 'ci'];
const typesString = types.join('|');
const issuePrefix = 'ND';
const issueNumber = '\\d{1,6}';
const pattern = `^(develop)|(main)|((${typesString})\/${issuePrefix}-${issueNumber}(-.*)?$`;

module.exports = {
  pattern: [pattern],
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
