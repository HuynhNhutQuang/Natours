const express = require('express');
const viewController = require('./../controller/viewController');
const authController = require('./../controller/authController');
const bookingController = require('./../controller/bookingController');
const router = express.Router();
router.route('/me').get(authController.protect, viewController.getAccount);
router.route('/my-tour').get(authController.protect, viewController.getMyTour);
router
  .route('/')
  .get(
    bookingController.createBooking,
    authController.isLoggedIn,
    viewController.getOverview
  );
router
  .route('/login')
  .get(authController.isLoggedIn, viewController.getLoginForm);
router.route('/:slug').get(authController.isLoggedIn, viewController.getTour);
// router.post(
//   '/send-user-data',
//   authController.protect,
//   viewController.updateUserData
// );
module.exports = router;
