var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Handlebars = require('hbs');
const { auth } = require('express-openid-connect');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var membersRouter = require('./routes/members');
var memberInfoRouter = require('./routes/memberinfo');
var gamesRouter = require('./routes/games');
var openGamesRouter = require('./routes/opengames');
var gameInfoRouter = require('./routes/gameinfo');
var contactUsRouter = require('./routes/contactus');
var fundsRouter = require('./routes/funds');
var eventsRouter = require('./routes/events');

var app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'mzHWIEuded42Vox2xgczbkBUOFz7gVHn',
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://uusudnd-frontend.azurewebsites.net',
  clientID: 'xzCN1A9EH6ujU6V19VuhaWcM1NU12SsV',
  issuerBaseURL: 'https://dev-u15cfnmqexzcnfbq.us.auth0.com'
};

app.use(auth(config));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('local', function(context) {
  var date = new Date(context);
  return date.toLocaleString();
});

Handlebars.registerHelper('date', function(context) {
  var date = new Date(context);
  return date.toISOString().split('T')[0];
});

Handlebars.registerHelper('time', function(context) {
  var date = new Date(context);
  time = date.toTimeString().split(':')
  return time[0]+":"+time[1];
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifContains', function(list, item, options) {
  contains = false;
  list.forEach(e => {
    if (e.member_id == item.member_id) {
      contains = true;
    }
  })
  return contains ? options.fn(this) : options.inverse(this);
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
app.use('/game', gameInfoRouter);
app.use('/contactus', contactUsRouter);
app.use('/funds', fundsRouter);
app.use('/events', eventsRouter);

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
