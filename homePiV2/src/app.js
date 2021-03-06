
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));


//Rotas
const loginRouter = require('./routes/login.routes');
const apiRouter = require('./routes/api.routes');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const adminRouter = require('./routes/adminRouter');

app.use('/', loginRouter)
app.use('/', indexRouter);
app.use('/', cartRouter);
app.use('/', adminRouter);
app.use('/product', productRouter);
// Rota para API
app.use('/', apiRouter)



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
