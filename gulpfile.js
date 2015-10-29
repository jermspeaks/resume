'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var bourbon = require('node-bourbon');
var lrserver = require('tiny-lr')();
var express = require('express');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var serverport = 5000;
var EXPRESS_ROOT = __dirname;

gulp.paths = {
  build: 'build',
  dist: 'dist'
};

gulp.task('default', function () {
    gulp.start('dist');
});

function processStyleSheets() {
  return gulp.src('./build/stylesheets/main.scss')
    .pipe(buffer())
    .pipe(sass({
      style: 'expanded',
      includePaths: bourbon.includePaths
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .on('error', gutil.log)
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    /* jshint camelcase: false */
    .pipe(gulp.dest('./dist/css'));
}

// Build styles
gulp.task('styles', function() {
  return processStyleSheets();
});

gulp.task('styles:watch', function() {
  processStyleSheets();
  gulp.watch(['./build/stylesheets/*.scss', './build/stylesheets/**/*.scss'], ['styles']);
});

// SERVER

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({
  port: livereloadport
}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendFile('index.html', {
    root: 'dist'
  });
});

function notifyLivereload(event) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  lrserver.changed({
    body: {
      files: [fileName]
    }
  });
  console.log('Changed %s', fileName);
}

// Dev task
gulp.task('serve', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);

  console.log('Serving on port 5000');
  // Run the watch task, to keep taps on changes
  gulp.watch(['./dist/index.html', './dist/css/*.css', './dist/js/*.js'], notifyLivereload);
});