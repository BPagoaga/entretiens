# Sandbox app for interview

This is an SPA bootstrapped with vite, using react + react-router

## Installation

- Clone the project
- Install dependencies using npm: `npm i`
- Build models locally: `npm run make-public-api:staging`
- Launch local server: `npm run dev`

## List of relevant librairies used in this project

- React
- open-api-generator
- react-hook-form
- zod
- aws-amplify
- axios
- react-router
- zustand

## Development

The development workflow involves some branch naming and commit message conventions,
which are enforced using husking to enable git hooks.
The configuration files are `.validate-branch-namerc.js` and `commitlint.config.js`

For the sake of simplicity, just create a new branch following above conventions.
Commit your work to this branch using atomic commits, and squash to one or more relevant commit before pushing.
