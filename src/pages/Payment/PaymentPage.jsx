import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentPage.less';

const stripePromise = loadStripe('pk_test_51PM4JAJVBSSkhR5Yhikhb7VqZT1DuHVYLChAXkUmddWmTKmfDoNK7e8DJhq3QFVsG58LbTrcuwzvc9GeugHIts8E005T3tfKO5'); // Replace with your Stripe publishable key

const PaymentForm = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    cardOwnerName: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.cardOwnerName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate('/profile/orders');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <input
        name="cardOwnerName"
        value={formData.cardOwnerName}
        onChange={handleChange}
        placeholder="Card Owner Name"
        required
      />
      <label>
        Card Number
        <CardNumberElement />
      </label>
      <label>
        Expiration Date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCvcElement />
      </label>
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${amount / 100}`}
      </button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Payment successful!</div>}
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { amount } = location.state;
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/payments/create-payment-intent', { amount });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching payment intent:', error);
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  return (
    <div className="payment-page">
      <h1>Complete your payment</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} amount={amount} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
