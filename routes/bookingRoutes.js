const express = require('express');
const bookingController = require('./../controller/bookingController');
const authController = require('./../controller/authController');
// create Router by express
const router = express.Router();
router.use(authController.protect);
router
  .route('/checkout-session/:tourId')
  .get(bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));
router.route('/api/v1/').get(bookingController.getAllBooking);
router
  .route('/api/v1/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
