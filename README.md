Topic Graph Editor
==================

A user interface used to make modifications to the topic graph. Built on top of the [topic graph's](https://github.com/reverb/topic-loader) API.

___

### Local Development:

Start by following the instructions in [Local Installation](#local-installation).

After installing your assets, you can watch the app via gulp with `gulp watch`, and make changes. Watching the app means it will build all assets for you and include it in the `dist` folder where it can be served by gulp with `gulp serve`. That will serve the application on port `5000`, so then you can open a browser to `localhost:5000` and use the app.

For my own local environment, I have one terminal window serving `gulp watch`, another serving `gulp serve`, and another window for typical tasks like `git`. `Livereload` is active for serving the application, so every time a Javascript file changes, the app reloads. You will need to install [Livereload](http://livereload.com/) on your browser of choice.

Unit testing is automatic with `gulp watch`. Each time a Javascript file changes, the tests will automatically run. For integration tests, you will need to have webdriver-manager running in the background. I didn't figure out how to configure it in conjunction with gulp, and it's easier with webdriver. Simply run `gulp protractor-test` to run all tests. In a future release, I'll make it so you can also specify the suite.

#### File Structure

```
build
├── config.js
├── images
├── index.js
├── routes.js
├── src
│   ├── common
│   │   ├── directives
│   │   └── filters
│   ├── form
│   └── topic
├── stylesheets
└── templates
```

All development is in the `build` folder, and results are built in the `dist` folder.

The main file is `index.js`, which includes all files included to the final `app.js`. This includes initial configuration in `config.js` and routes in `routes.js`. We're utilizing **UI-Router** for doing nested routes and namespacing. All controllers, services, directives, and filters are found in the `src/` folder. Specifically, controllers are found in their model folders, `src/form/` and `src/topic` for this project. Services are found in `src/common`, directives have their own folder within common, `src/common/directives`, as does filters, `src/common/filters`.

On the last require line for templates, that is provided by `package.json`, and it tells us where the templates should be.

```json
"browser": {
    "templates": "./build/.templates.js"
}
```

Styles are served via the `stylesheets/` folder, and we're using [Sass](http://sass-lang.com/) as a preprocessor. The main file that branches off everything else is `main.scss`, which imports all other files and assets. The main assets we're using are [Bourbon/Neat/Bitters](http://bourbon.io/) plugins from [Thoughtbot](https://thoughtbot.com/). Go to the [Bourbon Docs](http://bourbon.io/) to see what mixins and features are available to use. `Bourbon` is the Sass mixin library, `Neat` is the grid library, and `Bitters` is the scaffolds, variables, and structure library. ~~No Twitter Bootstrap or Zurb's Foundation here.~~

___

### Local Installation
```shell
npm install
bower install
gulp dist
gulp serve
```

Open browser to `localhost:5000`.

If you're having trouble with `npm install`, you may not have it correctly configured so you don't have to include the `sudo` line. If that's the case, use `sudo npm install` and then enter your credentials.

___

### Tasks:

Awesome Features to build in a future sprint:

- Create Concept Form
    - Adding category like adding netype
- Edit Sense Probabilities (scores) of related topics
- Replace Spaces Refactor
- Add Topic: Based off of your inputted related topics, return related topics associated with those inputted topics
- Might be able to utilize local session caching to save data in case user refreshes page
    - [Angular Local Storage](https://github.com/grevory/angular-local-storage)
    - [$cacheFactory](https://docs.angularjs.org/api/ng/service/$cacheFactory)
- After searching for a topic and the topic does not exist, the user can add that topic
- Show more for results on searching within adding/editing search section
- Give message if the nested topics within forms are ALL empty arrays
- Escaped Unicode issue

___

### Packages

[Full package List](./packages.md).

Includes Development, Production, and Testing

### Project File Management

#### AngularJS

The Angular project is broken up in the `build/src` folder, as well as three important files:

* `build/index.js`
* `build/routes.js`
* `build/config.js`
* `build/.templates.js`

The main project is build in the `index.js` file, so every Angular dependency goes here, including third party vendors. Configurations also go here, as well as every controller, service, and directive file.

##### Routes

In the `routes.js` file, you will find the pages broken up into one large object as well as the `$stateProvider`, which includes what the route paths and state names are.

##### Templates

This is built through a gulp task. Every change to a template file will automatically build and enter to the `.templates.js` file.

#### Sass/CSS

Styles are broken down in its own folder, `build/stylesheets`. This includes the `main.scss` file that imports everything else. Vendors go into its own folder, as well as the different pages. Also, reusable common components are placed in the `components.scss` file. They are all build by the `gulp styles` task and are watched in the `gulp watch` task. As said before, if you're utilizing `gulp watch`, there's an error that if you break the sass build, it will also quit out of the gulp task.

___

### App Testing

#### Unit Testing

##### Installation

```shell
npm install -g karma
npm install -g jasmine
# Skip these two steps if you ran the installation at the top
bower install # For Angular-mocks
npm install
```

##### Load Tests

```shell
# Main Folder
gulp karma
```

#### E2E Testing

Loading the tests:

```shell
# Main Folder
# Run Server
gulp server
# Another terminal window: start the webdriver
webdriver-start
# Another terminal window: run protractor
gulp protractor

# to exit webdriver, simply hit `ctrl + c`
```

Note: by default, gulp protractor runs full suite. If you don't want protractor to everything, simple run `protractor protractor.conf.js --suite [suite name]`.

**TODO**: have webdriver start within gulp instead of opening another terminal window

___

### Production

For production ready, all tests must pass. Run `gulp prod`, which should do the following:

* Builds application assets
    * One JS file that includes libraries/dependencies and the main app
    * Compiles all `.scss` files into one CSS file, including Bourbon library dependency
    * Creates a sprite of all image files (not currently in use)
    * Files them into the node server public files
* *Pending* Runs Unit Tests once
* *Pending* Runs Feature Tests once
* Bumps Version of `.json` configuration files

___

### Requirements:

![Topic Graph Diagram](https://github.com/reverb/concepts-load/blob/master/topic_graph.png)

* User should be able to create, read, update, and delete a concept or form
* When relating forms to concepts, there should be a way to give equal or custom weights to the forms
* Should show related concepts
* Should show related forms
* Should be able to add connections to related concepts
* Should be able to add forms to this concept after shown the related forms
* User should be able to search for other concepts or forms, and come back with their respective relations to other concepts and forms
    * e.g. Search Furious 7 should return forms such as "Fast and the Furious", "Fast and Furious", etc. as well as concepts such as "Vin Diesel", "Paul Walker", etc.
* Editor
    * Search for a Concept or Form and have the ability to edit its attributes, which as the same as the ones you see in Create
