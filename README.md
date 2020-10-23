# Santa Barbara Reentry

A joint project between [Code for America](https://www.codeforamerica.org/) and [The County of Santa Barbara Public Defender's Office](https://www.countyofsb.org/defender)

### _Created By_

Jeanmarie Levy, Design (jlevy@codeforamerica.org)

Victor Sauceda, Engineering (vsauceda@codeforamerica.org)

Timothy Malstead, Engineering (tmalstead@codeforamerica.org)

## Getting Started

This is a [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [modified](https://nextjs.org/docs/basic-features/typescript) to use [TypeScript](https://www.typescriptlang.org/)

### _Setup_

To install, open your cli and run:

```
git clone https://github.com/codeforamerica/sb_reentry_app.git
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

Please feel free to submit any information you feel is relevant along with your PR.

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

To run ALL code linting and formatting, run:

```
yarn code-check
```

### _Pre-commit Hooks_

We are using `husky` and `lint-staged` to code check staged files in `git`.

The check will run automatically when you add a local commit, and there is no need to configure them.

If there are errors in your staged code, please fix or comment them out and then run the checks again.

If there is something that you feel you _must_ commit that is not passing the code formatting standards, you can commit using a `--no-verify` flag. Please keep this to a minimum and only use it when absolutely necessary. Linting and formatting tools can be annoying, but in the end they are helping us write a better application!

## Testing

Coming Soon!

## Case and Naming Conventions

All `jsx` components must be written in `PascalCase` as they will be interpreted as standard `DOM` tags if they are not begun with a capital letter.

In addition we ask that you write `interface`, `type` and `CSS` module class names in `PascalCase` as well.

In the case of `CSS` modules, we write them this way instead of the normal `kabob-case` because Type/JavaScript will not understand expressions with a `-` in them.

For the rest of the Type/JavaScript code, please use the standard `camelCase` naming convention.

Lastly, please title environmental variables or references to them in `SCREAMING_SNAKE_CASE`.

All of this will help the readability of the code by showing a clear demarcation between standard code and functions, `React` and `TypeScript` specific code and functions and other special types of code.
