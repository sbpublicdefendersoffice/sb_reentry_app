# Thrive SBC

A joint project between [Code for America](https://www.codeforamerica.org/) and [The County of Santa Barbara Public Defender's Office](https://www.countyofsb.org/defender)

### _Created By_

Jeanmarie Levy, Design (jlevy@codeforamerica.org)

Victor Sauceda, Engineering (vsauceda@codeforamerica.org)

Timothy Malstead, Engineering (tmalstead@codeforamerica.org)

## Getting Started

### _Tools Used_

This is a [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [modified](https://nextjs.org/docs/basic-features/typescript) to use [TypeScript](https://www.typescriptlang.org/)

In addition, [Docker](https://www.docker.com/) is used in production deployment and to host the dev database locally.

### _Setup_

To install, open your cli and run:

```
git clone https://github.com/sbpublicdefendersoffice/sb_reentry_app.git
```

Naviagate to your created directory and install the needed dependencies by running:

```
yarn
```

Then, run the development server:

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.

The app will auto-update as you edit components and pages.

### _Running Data Locally_

We recommend that you install [Docker Desktop](https://www.docker.com/products/docker-desktop) to aid you in using data for local development.

After installing, run:

```
yarn build_data
```

from the root directory of the project.

This will create an instance of a `PostgreSQL` database and seed it with information to get you up and running quickly.

### _Git Conventions and Branching_

We kindly ask that if you are working on a feature, you checkout to a branch named with the following convention

```
your_github_username/feature_name
```

once you have completed work on your feature, please push your work using:

```
git push origin feature_name
```

and make a pull request.

Please feel free to submit any information you feel is relevant along with your PR. If we do not currently have you on our list of contributors, please reach out so that we can add you.

### _Production and Deployment_

To initiate a production build, run:

```
yarn build
```

To serve the build run:

```
yarn start
```

and you will see your build being served in a production environment on [http://localhost:3000](http://localhost:3000).

## Linting and Formatting

We are using `ESLint`, `stylelint` and `Prettier` as well as the `TypeScript` compiler to ensure consistent and readable code in our project.

Please refer to the top level `**rc.json` files to view specific rules and configurations.

If you feel you need to change or update any of the settings to accommodate work on your feature, please include a brief description of how and why in your PR.

### _Running Code Cleaning Tools_

To type-check `.ts` and `.tsx` files, please run:

```
yarn type-check
```

To check `.js`, `.jsx`, `.ts` and `.tsx` files, run:

```
yarn lint-es
```

To check `.css` and `.module.css` files, run:

```
yarn lint-css
```

To format all files with `Prettier`, run:

```
yarn format
```

`Each command will show a message printed on the console if it was executed sucessfully.`

## Testing

We make use of [Jest](https://jestjs.io/), [Testing_Library](https://testing-library.com/) and [Next_Page_Tester](https://github.com/toomuchdesign/next-page-tester) to ensure reliability of our components, pages and APIs.

To start the test suites, run:

```
yarn test
```

### _Code Check_

To run ALL code testing, linting and formatting, run:

```
yarn code-check
```

### _Pre-commit Hooks_

We are using `husky` and `lint-staged` to code check staged files in `git`.

These hooks include _all_ testing, linting and formatting procedures.

Please note, `Next Page Tester` can take a bit to run full page rendering tests. Be patient! It'll get there.

The check will run automatically when you add a local commit, and there is no need to configure them.

If there are errors in your staged code, please fix or comment them out and then run the checks again.

If there is something that you feel you _must_ commit that is not passing the code formatting standards, you can commit using a `--no-verify` flag. Please keep this to a minimum and only use it when absolutely necessary. Linting, testing and formatting tools can be annoying, but in the end they are helping us write a better application.

## Source Maps

In `dev` mode, by default, we run source maps in `eval-source-map` mode. This is a good mix of performance and thoroughness.

Should you need to examine even more exhaustive source maps in a production build, please enter:

```
yarn build_with_source_maps
```

This will create a production build with full `source-map` level source maps.

Please note that this is a resource intensive information, thus we have increased the memory available to `node` to 4 gigabytes. That will likely be all that's necessary, but please feel free to adjust should your system need more.

## Bundle Analysis

When building a local production build, we have a `webpack` bundle visualizer to help you better understand the final bundle output.

_After_ a production build has finished, enter:

```
yarn analyze
```

to view the visualization.

## Case and Naming Conventions

All `jsx` components must be written in `PascalCase` as they will be interpreted as standard `DOM` tags if they are not begun with a capital letter.

In addition we ask that you write `interface`, `type` and `CSS` module class names in `PascalCase` as well.

In the case of `CSS` modules, we write them this way instead of the normal `kabob-case` because Type/JavaScript will not understand expressions with a `-` in them.

For the rest of the Type/JavaScript code, please use the standard `camelCase` naming convention.

Lastly, please title environmental variables or references to them in `SCREAMING_SNAKE_CASE`.

All of this will help the readability of the code by showing a clear demarcation between standard code and functions, `React` and `TypeScript` specific code and functions and other special types of code.
