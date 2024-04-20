var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var Handlebars = require('hbs');
const { auth } = require('express-openid-connect');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var membersRouter = require('./routes/members');
var memberInfoRouter = require('./routes/memberinfo');
var gamesRouter = require('./routes/games');
var openGamesRouter = require('./routes/opengames');

var app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://uusudnd-frontend.azurewebsites.net',
  clientID: 'xzCN1A9EH6ujU6V19VuhaWcM1NU12SsV',
  issuerBaseURL: 'https://dev-u15cfnmqexzcnfbq.us.auth0.com'
};

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://uusudnd-api.azurewebsites.net']
}

app.use(auth(config));
app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/members', membersRouter);
app.use('/member', memberInfoRouter);
app.use('/games', gamesRouter);
app.use('/opengames', openGamesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
