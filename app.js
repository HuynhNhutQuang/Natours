const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const csp = require('express-csp');
const globalErrorHandler = require('./controller/errorController');
const appError = require('./utils/appError');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many resquest from this IP, please try after 1 hour',
});
// Require routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
// GLOBAL MIDDLEWARE

app.use(helmet());
csp.extend(app, {
  policy: {
    directives: {
      'default-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'ws://localhost:*/',
      ],
      'style-src': ['self', 'unsafe-inline', 'https:'],
      'font-src': ['self', 'https://fonts.gstatic.com'],
      'script-src': [
        'self',
        'unsafe-inline',
        'data',
        'blob',
        'https://js.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'ws://localhost:50800/',
      ],
      'worker-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'ws://localhost:*/',
      ],
      'frame-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'ws://localhost:*/',
      ],
      'img-src': [
        'self',
        'unsafe-inline',
        'data:',
        'blob:',
        'https://*.stripe.com',
        'https://*.mapbox.com',
        'https://*.cloudflare.com/',
        'https://bundle.js:*',
        'ws://localhost:*/',
      ],
      // 'connect-src': [
      //   'self',
      //   'unsafe-inline',
      //   'data:',
      //   'blob:',
      //   'wss://<HEROKU-SUBDOMAIN>.herokuapp.com:<PORT>/',
      //   'https://*.stripe.com',
      //   'https://*.mapbox.com',
      //   'https://*.cloudflare.com/',
      //   'https://bundle.js:*',
      //   'ws://localhost:*/',
      // ],
    },
  },
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'price',
      'difficulty',
      'ratingsQuantity',
      'maxGroupSize',
    ],
  })
);
// third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//read static file
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// your own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});
app.use('/api', limiter);
// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/booking', bookingRouter);
app.all('*', (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} link`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
