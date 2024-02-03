import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51OfcuaCDreqXvF9GbRGe7Z6Pb1mqJDfIg4OG3df9QdBqw4f7HvvIksamhiPbhlae5BYMp7cqP3ZcJL0GS1Yf5gAz00w2mnPtEo'
);
export const bookingTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/booking/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    showAlert('error', err);
  }
};
