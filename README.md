Resume
======

My Resume as a website & for print
___

### Local Development:

Start by following the instructions in [Local Installation](#local-installation).

After installing your assets, you can watch the app via gulp with `gulp watch`, and make changes. Watching the app means it will build all assets for you and include it in the `dist` folder where it can be served by gulp with `gulp serve`. That will serve the application on port `5000`, so then you can open a browser to `localhost:5000` and use the app.

For my own local environment, I have one terminal window serving `gulp watch`, another serving `gulp serve`, and another window for typical tasks like `git`. `Livereload` is active for serving the application, so every time a Javascript file changes, the app reloads. You will need to install [Livereload](http://livereload.com/) on your browser of choice.

Styles are served via the `stylesheets/` folder, and we're using [Sass](http://sass-lang.com/) as a preprocessor. The main file that branches off everything else is `main.scss`, which imports all other files and assets. The main assets we're using are [Bourbon/Neat/Bitters](http://bourbon.io/) plugins from [Thoughtbot](https://thoughtbot.com/). Go to the [Bourbon Docs](http://bourbon.io/) to see what mixins and features are available to use. `Bourbon` is the Sass mixin library, `Neat` is the grid library, and `Bitters` is the scaffolds, variables, and structure library. ~~No Twitter Bootstrap or Zurb's Foundation here.~~

___

### Local Installation
```bash
npm install
gulp styles:watch
# in another terminal window
gulp serve
```

Open browser to `localhost:5000`.

If you're having trouble with `npm install`, you may not have it correctly configured so you don't have to include the `sudo` line. If that's the case, use `sudo npm install` and then enter your credentials.

___

### Project File Management

#### Sass/CSS

Styles are broken down in its own folder, `build/stylesheets`. This includes the `main.scss` file that imports everything else. Vendors go into its own folder, as well as the different pages. Also, reusable common components are placed in the `components.scss` file. They are all build by the `gulp styles` task and are watched in the `gulp watch` task. As said before, if you're utilizing `gulp watch`, there's an error that if you break the sass build, it will also quit out of the gulp task.
