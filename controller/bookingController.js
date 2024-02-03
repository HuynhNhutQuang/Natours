// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const appError = require('../utils/appError');
// const Tour = require('./../models/toursModel');
// const catchAsync = require('./../utils/catchAsync');

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.tourId);
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     success_url: `${req.protocol}://${req.get('host')}/`,
//     cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.id,
//     line_items: [
//       {
//         price: 'price_1OfdyuCDreqXvF9GwMQY0jdL',
//         quantity: 1,
//       },
//     ],
//     mode: 'subscription',
//     currency: 'usd',
//   });
//   res.status(200).json({
//     status: 'success',
//     session,
//   });
// });
