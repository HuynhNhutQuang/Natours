const express = require('express');
const bookingController = require('./../controller/bookingController');
const authController = require('./../controller/authController');
// create Router by express
const router = express.Router();
router
  .route('/checkout-session/:tourId')
  .get(authController.protect, bookingController.getCheckoutSession);
module.exports = router;
