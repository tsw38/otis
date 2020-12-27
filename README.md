<div align="center">
<h1>🦺 OTIS 🦺</h1>
<p>Opinionated Testing Interface System</p>
</div>

-----

## The Problem

With using jest, you can get up and running pretty much with no configuration, but when you want to add features, the configuration gets pretty lengthy.

Say, for example, you want to tell jest that it should use a unique config location

`jest --config ./path-to-config`

Say you want to watch changes to your tests or modules AND have a unique config location and you want to collect coverage on those tests and you want a specific set of coverage reporters

`jest --config ./path-to-config --watch --coverage --reporters="default" --reporters="jest-junit"`

...

You get my point. The script gets pretty lengthy and unreadable overtime. And it makes the package.json scripts get pretty ugly.

Yes a lot of these settings can be defined in jest.config or package.json, but wouldn't it be great to not have to think about any of these configurations and have someone tell you what you could use?

## My Solution

Having implemented testing in several projects I've noticed a pattern forming in what I like in my testing suite and I figured it was a good time to centralize that configuration. Why install all these packages that you have to maintain? That's gross, let something else handle that for you so you can start writing tests immediately.

> **This package is really just for me cuz I'm making a lot of assumptions in here, but if you want to use it, be my guest.**

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
    - [CLI](#cli)
    - [React](#react)
    - [Jest](#jest)
- [TODO](#todo)

## Installation

```shell
npm install --save-dev @tsw38/otis
```

## Usage

This package contains one binary executable, one module to use for tests and a couple of jest extensions to add to your testing experiences.

### CLI

#### `otis --help`
Prints out the commands available through the package

#### `otis test`
Runs the testing suite within your codebase, finds any `.(spec|test).js(x)?` file.

|   Option          | Alias | Test Type | Description                                                       |
| ----------------- | ----- | ---- | ---------------------------------------------------------------------- |
| `--unit`          | `-u`  |      | only runs unit tests                                                   |
| `--e2e`           | `-e`  |      | only runs e2e tests                                                    |
| `--watch`         | `-w`  |      | runs test in watch mode                                                |
| `--only-related`  | `-r`  |      | finds and runs only the related tests for the code changes             |
| `--config`        |       |      | prints out the config for jest or cypress                              |
| `--start-command` |       |      | an optional flag for pointing e2e test to a local start server command |

Examples:

`otis test`
* Runs all tests within your application

`otis test -e`
* Runs e2e tests `(cypress run)`
> **This is currently broken for CRA apps spinning up dev servers**

`otis test -e --start-command=test:server`
* Runs e2e tests and instead of using `npm start` use `npm run test:server`

`otis test -u`
* Runs unit tests and collects a coverage report

`otis test -u -w`
* Runs unit tests in watch mode

`otis test -e -w`
* Runs e2e tests in watch mode `(cypress open)`
> **This is currently broken for CRA apps spinning up dev servers**


### React

These exports are all reexports of these packages simply centralizing them all to one location, all documention can be found below.

* [msw](https://www.npmjs.com/package/msw)
* [test-data-bot](https://www.npmjs.com/package/@jackfranklin/test-data-bot)
* [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
* [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)
* [@react-mock/localstorage](https://www.npmjs.com/package/@react-mock/localstorage)

Example:

```jsx
import {
    rest,
    fake,
    build,
    screen,
    render,
    waitFor,
    userEvent,
    setupServer,
    testDataBot: {
        build,
        fake
    }
    LocalStorageMock
} from '@tsw38/otis'

test('', () => {

})
```

### Jest

This package is a zero config extendable testing system, simply install  and you can get going. It will pick up whatever babel and jest configs you have in your application to add to the base defaults that are set up.

#### Threshold Ratchet

|    Option    | Type    | Required? | Default | Description             |
| ------------ | ------- | --------- | ------- | ----------------------- |
| `tolerance`  | Number  |    no     |  5      | a coverage buffer to allow some wiggle room in your tests    |
| `roundDown`  | Boolean |    no     | true    | only runs e2e tests     |

##### `jest.config.json`
```json
{
    "reporters": [
        "@tsw38/otis/lib/modules/threshold-ratchet"
    ]
}
```
##### `package.json`
```json
{
    ...
    "jest": {
        "reporters": [
            "@tsw38/otis/lib/modules/threshold-ratchet"
        ]
    }
}
```

## TODO
* Allow for multiple jest configs for a project (client | server)
  - [Testing Javascript](https://testingjavascript.com/lessons/jest-support-running-multiple-configurations-with-jest-s-projects-feature)
* Do not run E2E test suite with `otis test` if there are no `.e2e.js(x)?` files in the app or if there is a cypress configuration which a different rule for the tests, they are not present