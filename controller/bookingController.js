const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const appError = require('../utils/appError');
const Booking = require('./../models/bookingModel');
const Tour = require('./../models/toursModel');
const catchAsync = require('./../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price: 'price_1OfdyuCDreqXvF9GwMQY0jdL',
        quantity: 1,
      },
    ],
    currency: 'usd',
    mode: 'subscription',
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});
exports.createBooking = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});
