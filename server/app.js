const express = require('express');
const axios = require('axios'); // You might need to install this package using npm or yarn
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST'], // Add other HTTP methods you need
  credentials: true, // Enable credentials (if needed)
}));

// Endpoint to handle payment verification
app.get('/verifyPayment/:reference', async (req, res) => {
  const reference = req.params.reference;
  console.log(reference)

  try {
    const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer sk_test_29c86c6683f85c4badd6f0459fe30b766f798903`, // Replace with your Paystack secret key
      },
    });

    // Handle the response from Paystack API
    const { data } = paystackResponse.data;
    // You can process 'data' here and extract payment status or other details

    res.status(200).json(data);
    console.log('Sucess, Reference:', data.status)
  } catch (error) {
    console.error('Error verifying payment:', error.response.data);
    res.status(500).send('Error verifying payment');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
