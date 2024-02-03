const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const appError = require('./../utils/appError');
const castErrorHandler = (err) => {
  const message = `Invalid ${err.path} value ${err.value}`;
  return new appError(message, 400);
};
const dupplicateErrorHandler = (err) => {
  // const value = err.errmss.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const message = `Dupplicate arr value '${err.keyValue.name}'. Please use another value`;
  return new appError(message, 400);
};
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input, ${errors.join('. ')}`;
  return new appError(message, 400);
};
const JsonWebTokenErrorHandler = () => {
  return new appError('Invalid token', 400);
};
const TokenExpiredErrorHandler = () => {
  return new appError('Token expired', 400);
};
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational === true) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong !',
    });
  } else {
    if (err.isOperational === true) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong',
        msg: err.message,
      });
    }
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: 'Please try again!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV.trim() === 'production') {
    error = JSON.parse(JSON.stringify(err));
    error.message = err.message;
    if (error.name === 'CastError') error = castErrorHandler(error);
    if (error.code === 11000) error = dupplicateErrorHandler(error);
    if (error.name === 'ValidationError') error = validationErrorHandler(error);
    if (error.name === 'JsonWebTokenError') error = JsonWebTokenErrorHandler();
    if (error.name === 'TokenExpiredError') error = TokenExpiredErrorHandler();
    sendErrorProd(error, req, res);
  }
};
