# OPEN

OpenTheWindow games project.

1.  Angular2 
2.  Electron 
3.  Express (node backend server)
4.  Jasmine (unit tests) + Karma (test runner)
5.  Protractor (end to end testing)
6.  Webpack

## File Structure
Component approach is used. 
This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. 
A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. 
Here's how it looks:
```
angular2-webpack-starter/
 ├──src/                                * our source files that will be compiled to javascript
 |   ├──app.ts                          * our entry file for our browser environment
 │   │        
 |   ├──index.html                      * Index.html: where we generate our index page
 │   │        
 |   ├──polyfills.ts                    * our polyfills file
 │   │        
 |   ├──vendor.ts                       * our vendor file
 │   │        
 │   ├──app/                            * WebApp: folder
 │   │   ├──components                  * folder that holds specific components
 │   │   │  └──component                * specific component business group
 │   │   │      ├──component.ts         * a specific component typescript
 │   │   │      └──component.spec.ts    * a simple test of the component
 │   │   │
 │   │   ├──shared                      * folder that holds shared components
 │   │   │  ├──enums                    * a folder where enumerations are stored
 │   │   │  ├──pipes                    * a folder for pipes
 │   │   │  ├──models                   * a folder where models are stored
 │   │   │  ├──plugins                  * a folder for third party components (not written by us)
 │   │   │  └──services                 * a folder for services used wide across the application
 │   │   │
 │   │   └──tests                       * folder that holds e2e tests and page objects for the components
 │   │        
 │   └──assets/                         * static assets are served here
 │       ├──css/                        * our stylesheets are here
 │       ├──images/                     * images are stored here
 │       ├──js/                         * only requiring jquery statement is stored here (this might be changed)
 │       ├──robots.txt                  * for search engines to crawl your website
 │       └──db.json                     * json database where users are stored        
 │        
 ├──tslint.json                         * typescript lint config
 ├──typedoc.json                        * typescript documentation generator
 ├──tsconfig.json                       * config that webpack uses for typescript
 ├──typings.json                        * our typings manager
 └──package.json                        * what npm uses to manage it's dependencies
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v4.1.x`+ and NPM `2.14.x`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install --global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)
* `typings` (`npm install --global typings`)
* `typescript` (`npm install --global typescript`)
* `electron-packager` (`npm install --global electron-packager`)

## Instalation
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `typings install` to install necessary typings
* `npm start` to start the app on [localhost:3000](localhost:3000)

## Running the app
After you have installed all dependencies you can now run the app. Run `npm start` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

## Building the exe file using electron
Electron can be used with any framework, so once Electron is set in place, we simply create the Angular 2 app as we would for the web.
The Electron configuration is contained in `./main.js`.

To build application exe file for win32 x64 run the following command:
```bash
electron-packager . OPEN --platform=win32 --arch=x64 --version=version=0.36.9
```

## Other commands
### server
```bash
# development
npm run server
# production
npm run build:prod
npm run server:prod
```

### run tests
```bash
npm run test
```
### watch and run our tests
```bash
npm run watch:test
```
### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

## Use latest TypeScript compiler
TypeScript 1.7.x includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.
```
npm install --global typescript
```
## Use a TypeScript-aware editor
* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

# Typings
> When you include a module that doesn't include Type Definitions inside of the module you need to include external Type Definitions with Typings
## Use latest Typings module
```
npm install --global typings
```
## Custom Type Definitions
When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with typings
```
typings install node --save
```
If you can't find the type definition in the registry we can make an ambient definition in
this file for now. For example
```typescript
declare module "my-module" {
  export function doesSomething(value: string): string;
}
```
If you're prototyping and you will fix the types later you can also declare it as type any
```typescript
declare var assert: any;
```
If you're importing a module that uses Node.js modules which are CommonJS you need to import as
```typescript
import * as _ from 'lodash';
```