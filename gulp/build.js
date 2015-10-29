/*	===============================
		Build & Watch
	=============================== */

'use strict';

var gulp = require('gulp'),
	gutil = require('gulp-util'),
	del = require('del'),
	filePath = require('./../paths')(),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	bump = require('gulp-bump'), // Bumps Version of App
	// File Compilation
	browserify = require('browserify'),
	mainBowerFiles = require('main-bower-files'),
	debowerify = require('debowerify'),
	source = require('vinyl-source-stream'),
	concat = require('gulp-concat'), // Concat an existing file
	filter = require('gulp-filter'), // Filter by filename

	// Javascript
	jshint = require('gulp-jshint'), // Run jshint on files
	stylish = require('jshint-stylish'),
	babel = require('gulp-babel'), // ES6 support
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),

	// Templates
	templateCache = require('gulp-angular-templatecache'),

	// SASS/CSS
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	bourbon = require('node-bourbon');

/**
 * Development
 */

/**
 * Processes Template Files
 * @return {function} Finds all HTML templates, concats them in a template cache, and serves them in its own js file
 */
function processTemplates() {
	console.log('processTemplates');
	return gulp.src(filePath.html.src)
		.pipe(templateCache(filePath.html.dest, {
			module: 'topicGraphEditor'
		}))
		/* jshint camelcase: false */
		.pipe(gulp.dest(filePath.html.dest_dir));
}

/**
 * Processes Javascript Files
 * @param  {[type]} bundler [description]
 */
function processJavascript(bundler) {
	return bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(babel({
			compact: false
		}))
		// .pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		/* jshint camelcase: false */
		.pipe(gulp.dest(filePath.js.dest_dir));
}

/**
 * Compiler for Javascript
 * @param  {bool} watch 			Watchify true or false
 * @param  {bool} production 	Build for production
 */
function process(watch) {
	console.log('process');
	processTemplates();

	// create a watcher wrapped bundler or a direct one
	var bundler;

	if (!!watch) {
		bundler = watchify(browserify('./build/index.js', watchify.args));
		bundler.transform(debowerify);
		bundler.on('update', function() {
			processJavascript(bundler);
		});

		gulp.watch('./build/templates/**/*.html', ['templates', 'build']);
		gulp.watch(['./build/stylesheets/*.scss', './build/stylesheets/**/*.scss'], ['styles']);
		gulp.watch('./build/src/**/*.js', ['lint']);
		gulp.watch(['./tests/karma/*.js', './build/src/**/*.js'], ['test']);
		// gulp.watch(['./tests/protractor/**/*.js'], ['protractor-test']);
	} else {
		bundler = browserify('./build/index.js');
		bundler.transform(debowerify);
	}

	bundler.transform('brfs');
	return processJavascript(bundler);
}

function filterByExtension(extension) {
	return filter(function(file) {
		return file.path.match(new RegExp('.' + extension + '$'));
	});
}

function processLibraries() {
	// console.log('processLibraries :: Vendor JS Libraries');
	var mainFiles = mainBowerFiles({
		checkExistence: true
	});

	var jsFilter = filterByExtension('js');

	if (!mainFiles.length) {
		// No files found
		return;
	}

	return gulp.src(mainFiles)
		.pipe(jsFilter)
		.pipe(concat('lib.js'))
		.pipe(uglify())
		/* jshint camelcase: false */
		.pipe(gulp.dest(filePath.vendor.dest_dir));
}

function processStyleSheets() {
	return gulp.src(filePath.sass.src)
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
		.pipe(gulp.dest(filePath.sass.dest_dir));
}

function processStylesheetLibraries() {
	var mainFiles = mainBowerFiles({
		checkExistence: true
	});

	var cssFilter = filterByExtension('css');

	if (!mainFiles.length) {
		// No files found
		return;
	}

	return gulp.src(mainFiles)
		.pipe(cssFilter)
		.pipe(concat(filePath.vendorCSS.dest))
		/* jshint camelcase: false */
		.pipe(gulp.dest(filePath.vendorCSS.dest_dir));
}

function jsHint() {
	return gulp.src(filePath.lint.src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
}

function processVendorFonts() {
	console.log('ProcessVendorFonts');
	/* jshint -W100 */
	return gulp.src(['./bower_components/components-font-awesome/fonts/fontawesome-webfont.*']) 
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(gulp.dest('./server/public/fonts')); 
}

/**
 * Production
 */

/**
 * Bundles app to a pre-compiled state before including the libraries
 */
function bundleProductionApp() {
	// Delete old app
	del(filePath.prod.clean.js);

	var bundler = browserify(filePath.prod.buildJs);
	bundler.transform(debowerify);
	bundler.transform('brfs');
	// Bundles App
	bundler.bundle()
		// log errors if they happen
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('pre-bundled-app.js'))
		.pipe(buffer())
		.pipe(babel({
			compact: false
		}))
		.pipe(uglify())
		.on('error', gutil.log)
		/* jshint camelcase: false */
		.pipe(gulp.dest(filePath.js.dest_dir));

	// Concats Library and app
	return gulp.src(filePath.prod.concatLib)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(filePath.prod.js));
}

/**
 * Compiles all of the stylesheets
 */
function bundleProductionStyles() {
	// Delete old stylesheet
	del(filePath.prod.clean.css);

	return gulp.src(filePath.prod.concatCSSLib)
		.pipe(concat('main.css'))
		// .pipe(sass({
		// 	style: 'expanded',
		// 	includePaths: bourbon.includePaths
		// }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.on('error', gutil.log)
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest(filePath.prod.css));
}

/**
 * Bump Version for patch release
 * @param {string}	feature 	Semantic type version (i.e. major or minor)
 */
function bumpVersion(feature) {
	var config = {};
	// If we pass major or minor as string, add it to configuration
	if (feature) {
		config.type = feature;
	}

	return gulp.src(['./package.json', './bower.json'])
  .pipe(bump(config))
  .pipe(gulp.dest('./'));
	// IDEA https://www.npmjs.com/package/gulp-tag-version
}

/**
 * Tasks
 */

// Build entire project
gulp.task('dist', ['templates', 'styles', 'library', 'lint', 'build']);

// Watch build
gulp.task('watch', function() {
	return process(true);
});

// One time build javascript
gulp.task('build', function() {
	return process(false);
});

// JSHint task
gulp.task('lint', function() {
	return jsHint();
});

// Build templates
gulp.task('templates', function() {
	return processTemplates();
});

// Consolidate vendor libraries
gulp.task('library', ['css-library', 'js-library']);

// Compile vendor stylesheets
gulp.task('css-library', function() {
	return processStylesheetLibraries();
});

// Compile vendor js libraries
gulp.task('js-library', function() {
	return processLibraries();
});

// Build styles
gulp.task('styles', function() {
	return processStyleSheets();
});

// Build fonts
gulp.task('fonts', function() {
	return processVendorFonts();
});

// Compile Production Ready Styles
gulp.task('production-styles', ['css-library', 'styles'], function() {
	return bundleProductionStyles();
});

// Compile Production Ready App
gulp.task('production-app', function() {
	return bundleProductionApp();
});

// Bump version patch
gulp.task('bump', function() {
	return bumpVersion();
});

// Bump version major
gulp.task('bump-major', function() {
	return bumpVersion('major');
});
// Bump version minor
gulp.task('bump-minor', function() {
	return bumpVersion('minor');
});

// Production Ready
gulp.task('prod', ['templates', 'library', 'styles', 'production-styles', 'production-app', 'unit-ci-test', 'bump']);
