module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "evol",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ["NG-", "ND-"],
      // change convention so it follow our git flow
      headerPattern: /^(N[G|D]-\d{1,4}) (\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/,
      headerCorrespondence: ["jira", "type", "scope", "subject"],
    },
  },
};
