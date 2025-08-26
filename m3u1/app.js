var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var pool = require('./models/bd');
var secured = require('./middlewares/auth'); // ✅ corregido



var indexRouter = require('./routes/index');
var visitanosRouter = require('./routes/visitanos');
var contactanosRouter = require('./routes/contactanos');
var quienesomosRouter = require('./routes/quienesomos');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminrouter = require('./routes/admin'); // ✅ corregido
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'pamelasoledadelizalde1234',
  resave: false,
  saveUninitialized: true
}));


// app.use('/admin/login', loginRouter);

app.use('/', indexRouter);
app.use('/visitanos', visitanosRouter);
app.use('/contactanos', contactanosRouter);
app.use('/quienesomos', quienesomosRouter);

// ✅ ahora usa productos
app.use('/admin', adminrouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ✅ solo exportamos app
module.exports = app;
