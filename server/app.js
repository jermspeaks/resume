'use strict';

var cluster = require('cluster');
var domain  = require('domain');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var compress = require('compression');

var routes = require('./routes/index');
var BootstrapService = require('./node-service-bootstrap');

function startApp(config) {
	console.log(config);
	var port = 8000;

	if (cluster.isMaster) {
		cluster.fork();

		cluster.on('disconnect', function(worker) {
			console.log(worker);
			console.error('disconnect!');
			cluster.fork();
		});

	} else {
		var publicFolder = './public';
		var app = express();
		app.set('view engine', 'ejs');
		app.set('views', path.join(__dirname, 'views'));
		//following line only necessary for pulling the js during local testing if you don't have nginx running
		app.use(compress());
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: false
		}));
		app.use(cookieParser());
		app.use(express.static(publicFolder));
		app.use(session({
			secret: 'pin7ol2ku2',
			resave: true,
			saveUninitialized: true
		}));
		app.use(favicon(publicFolder + '/favicon.ico'));
		app.use('/', routes);

		app.use(function domainMiddleware(req, res, next) {

			var reqDomain = domain.create();

			reqDomain.on('error', function(err) {
				console.error('error', err.stack);
				try {
					// make sure we close down within 30 seconds
					var killtimer = setTimeout(function() {
						process.exit(1);
					}, 30000);
					// But don't keep the process open just for that!
					killtimer.unref();

					// Let the master know we're dead.  This will trigger a 'disconnect' in the cluster master, and then it will fork a new worker.
					cluster.worker.disconnect();

					// try to send an error to the request that triggered the problem
					res.statusCode = 500;
					res.setHeader('content-type', 'text/plain');
					res.end('Oops, there was a problem!\n');
				} catch (er2) {
					// oh well, not much we can do at this point.
					console.error('Error sending 500!', er2.stack);
				}
			});

			reqDomain.run(next);
		});

		app.listen(port, function() {
			console.log('node listening on port ' + port);
		});

	}

}

new BootstrapService({}, startApp);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
// 	app.use(function(err, req, res) {
// 		res.status(err.status || 500);
// 		res.render('error', {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res) {
// 	res.status(err.status || 500);
// 	res.render('error', {
// 		message: err.message,
// 		error: {}
// 	});
// });


// module.exports = app;
