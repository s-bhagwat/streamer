const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');

const app = express();

const mainRouter = require('./routers/mainRoutes');
const showFilesRouter = require('./routers/showFilesRouter');
const showDetailRouter = require('./routers/showDetailRoutes');
const chooseFilesRouter = require('./routers/chooseFilesRouter');
const streamRouter = require('./routers/streamRouter');
const downloadRouter = require('./routers/downloadRouter');

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' })); //for session variables

//Routers
app.use(
  '/',
  express.urlencoded({
    extended: true,
  })
);
app.use('/', mainRouter);
app.use('/showFiles', showFilesRouter);
app.use('/showDetail', showDetailRouter);
app.use('/chooseFiles', chooseFilesRouter);
app.use('/stream', streamRouter);
app.use('/download', downloadRouter);

module.exports = app;
