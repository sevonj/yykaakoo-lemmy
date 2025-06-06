[![CI](https://github.com/sevonj/yykaakoo-lemmy/actions/workflows/ci.yml/badge.svg)](https://github.com/sevonj/yykaakoo-lemmy/actions/workflows/ci.yml)
[![GH Pages Deployment](https://github.com/sevonj/yykaakoo-lemmy/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/sevonj/yykaakoo-lemmy/actions/workflows/deploy-pages.yml)
___
# yykaakoo-lemmy

A bad frontend for lemmy. 

![image](https://github.com/user-attachments/assets/f3da7d63-fd83-4901-9db9-0c7b287e4385)

## Acknowledgements

- Not based on, but borrows a few lines of code from [Photon](https://github.com/Xyphyn/photon).

# Development

[➜ Project management](https://github.com/users/sevonj/projects/17)

## Building

- Setup: `npm install`
- Live test server: `npm run dev`
- Build: `npm run build`

## Continuous Integration

Pull requests are gatekept by [this workflow.](.github/workflows/ci.yml) It will check if the code

- builds (run `npm run build`)
- has linter warnings (run `npm run lint`)
- is formatted (run `npm run format`)


<!-- Vue 3 default readme

This template should help get you started developing with Vue 3 in Vite.


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
-->
