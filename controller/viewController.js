const Tour = require('./../models/toursModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const User = require('./../models/usersModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All Tours', tours });
});
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(new appError("Can't find tour with that name", 404));
  }
  res.status(200).render('tour', { title: tour.name, tour });
});
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', { title: 'Login Form' });
};
exports.getAccount = (req, res) => {
  res.status(200).render('account', { title: 'Your account' });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: false }
  );
  res.status(200).render('account', {
    user: updatedUser,
  });
});
