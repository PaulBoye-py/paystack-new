import React, { useState } from "react";
import { usePaystackPayment } from 'react-paystack';
import axios from 'axios'; // Make sure to install Axios using npm or yarn
import { InlineWidget } from "react-calendly";

const Form = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [showCalendly, setShowCalendly] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const config = {
        reference: (new Date()).getTime().toString(),
        email: formData.email,
        amount: 20000, // Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_test_0ac923848d2d1f0835372242c4cc4644d45f602c',
    };

    const initializePayment = usePaystackPayment(config);

    const verifyPayment = async (reference) => {
        try {
            const response = await axios.get(`http://localhost:4000/verifyPayment/${reference}`);
            console.log('Payment Verification Response:', response.data);
            // Process the response or update UI based on the payment status

            // Show Calendly widget upon successful payment verification
            setShowCalendly(true);
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };

    const onSuccess = (reference) => {
        // Call your backend to verify the payment status
        verifyPayment(reference.reference);
        console.log(reference.reference);
        console.log("Form submitted:", formData);
    };

    const onClose = () => {
        console.log('closed');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Initialize Paystack payment when the form is submitted
        initializePayment(onSuccess, onClose);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    name="email"
                    placeholder="paul@yahoo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <label>Name</label>
                <input
                    name="name"
                    placeholder="Paul"
                    value={formData.name}
                    onChange={handleInputChange}
                />

                <button type="submit">Pay with Paystack</button>
            </form>

            {/* Conditional rendering of Calendly */}
            {showCalendly && <Calendly />}
        </>
    );
};

export default Form;

// Calendly component definition remains the same
const Calendly = () => {
    return (
        <div className="App">
            {/* Replace 'url' with your Calendly URL */}
            <InlineWidget url="https://calendly.com/paul-aderoju" />
        </div>
    );
};
