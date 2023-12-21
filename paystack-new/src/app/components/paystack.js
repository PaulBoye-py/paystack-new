// import React, { useState } from 'react';
// import { usePaystackPayment } from 'react-paystack';
// import axios from 'axios'; // Ensure Axios is installed using npm or yarn

// const PaystackHookExample = () => {
//   const [paymentReference, setPaymentReference] = useState('');

//   const initiatePayment = async () => {
//     const config = {
//       email: "user@example.com",
//       amount: 20000,
//       publicKey: 'pk_test_0ac923848d2d1f0835372242c4cc4644d45f602c',
//     };

//     try {
//       const response = await axios.post('/initiatePayment', config);
//       const { reference } = response.data; // Assuming the server responds with the payment reference

//       setPaymentReference(reference);

//       // Verify payment after a delay (adjust this as per your requirements)
//       setTimeout(() => {
//         verifyPayment(reference);
//       }, 3000); // Example: Verify payment after 3 seconds
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     }
//   };

//   const verifyPayment = async (reference) => {
//     try {
//       const response = await axios.get(`/verifyPayment/${reference}`);
//       // Handle the response from the server after payment verification
//       console.log('Payment Verification Response:', response.data);
//       // Process the response or update UI based on the payment status
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={initiatePayment}>Initiate Payment</button>
//       <p>Payment Reference: {paymentReference}</p>
//     </div>
//   );
// };

// export default PaystackHookExample;

import { usePaystackPayment } from 'react-paystack';
import axios from 'axios'; // Make sure to install Axios using npm or yarn

const config = {
  reference: (new Date()).getTime().toString(),
  email: "user@example.com",
  amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: 'pk_test_0ac923848d2d1f0835372242c4cc4644d45f602c',
};


const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);

//   const backendURL = 'http://localhost:4000'; 

  const verifyPayment = async (reference) => {
    try {
      const response = await axios.get(`http://localhost:4000/verifyPayment/${reference}`);
      console.log('Payment Verification Response:', response.data);
      // Process the response or update UI based on the payment status
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const onSuccess = (reference) => {
    // Call your backend to verify the payment status
    verifyPayment(reference.reference);
    console.log(reference.reference)
  };

  const onClose = () => {
    console.log('closed');
  };
  

  return (
    <div>
      <button onClick={() => initializePayment(onSuccess, onClose)}>Paystack Hooks Implementation</button>
    </div>
  );
};

export default PaystackHookExample;
