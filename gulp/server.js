/*	===============================
		Server
	=============================== */
'use strict';

var gulp = require('gulp'),
	lrserver = require('tiny-lr')(),
	express = require('express'),
	livereload = require('connect-livereload'),
	livereloadport = 35729,
	serverport = 5000,
	EXPRESS_ROOT = __dirname;

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
