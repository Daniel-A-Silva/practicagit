var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); 
var pool = require('./models/bd');  


var indexRouter = require('./routes/index');
var visitanosRouter = require('./routes/visitanos');
var contactanosRouter = require('./routes/contactanos');
var quienesomosRouter = require('./routes/quienesomos');

var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var adminrouter = require('./routes/admin/novedades');
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
  secret: 'asdf', // puede ser cualquier string único
  resave: false,
  saveUninitialized: true
}));

app.use('/admin/login', loginRouter);



secured = async (req, res, next) => {
  try {
    if (req.session.id_usuario) { 
      next();
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/admin/login');
  }
};  

app.use('/', indexRouter);
app.use('/visitanos', visitanosRouter);
app.use('/contactanos', contactanosRouter);
app.use('/quienesomos', quienesomosRouter);


app.use('/admin/novedades',secured , adminrouter);

//  select from mysql

pool.query('select nombre ,telefono from empleados').then(function (resultados) {
  console.log(resultados); 
})
.catch(function (error) {
  console.error('Error en la consulta:', error);
});

// INSERT MYSQL

var obj = {
  nombre: 'Juan ',
  apellido: 'Perez',
  telefono: '1234567890',
  edad: 99,
  email: 'juanperez@bignet.com'
};

pool.query('insert into empleados set ?', [obj]). then(function (resultados) {
  console.log(resultados);
})
.catch(function (error) {
  console.error('Error en la inserción:', error);
}); 


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

module.exports = app , secured;
