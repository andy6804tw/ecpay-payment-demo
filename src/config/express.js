import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';

import APPError from '../server/helper/AppError';
import config from './config';
import index from '../server/routes/index.route';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// HTTP request logger middleware for node.js
if (config.env === 'development') {
  app.use(logger('dev'));
}

// prevent GET /favicon.ico
app.use((req, res, next) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
});

// mount all routes on /api path
app.use('/', index);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  let errorMessage;
  let errorTag;
  let errorCode;
  let errorStatus;
  // express validation error 所有傳入參數驗證錯誤
  if (err instanceof expressValidation.ValidationError) {
    if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
      errorTag = 'REQUEST_ERROR';
      errorMessage = err.errors.map((error) => { return error.messages.join('. '); }).join(' and ');
      errorCode = 400;
      errorStatus = httpStatus.BAD_REQUEST;
    }
    const error = new APPError.APIError(errorStatus, errorMessage, errorTag, errorCode);
    return next(error);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APPError.APIError(httpStatus.NOT_FOUND, 'API not found', 'API_NOT_FOUND', 404);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    code: err.code,
    tag: config.env === 'development' ? err.tag : '',
    message: config.env === 'development' ? err.message : '',
    stack: config.env === 'development' ? err.stack : {}
  });
});

export default app;
