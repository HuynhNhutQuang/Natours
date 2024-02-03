const Review = require('./../models/reviewsModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controller/handlerFactory');

exports.setTourIdAndUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getReview = factory.getOne(Review, { path: 'user', select: 'name' });
exports.getAllReviews = factory.getAll(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
