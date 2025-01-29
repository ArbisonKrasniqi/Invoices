import React, { useState } from 'react';

const UpdateCustomerForm = () => {
    const [customerData, setCustomerData] = useState({
        customer_id: null,
        name: null,
        address: null,
        email: null,
        contact_number: null
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(customerData);
        try {
            const response = await window.api.updateCustomer(customerData);
            if (response.success) {
                console.log('Customer updated:', response.data);
            } else {
                setErrorMessage(response.error.message); // Set only the message for rendering
            }
        } catch (error) {
            console.error('Error calling updateCustomer:', error);
            setErrorMessage(error.message); // Use error.message here for the UI
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="customer_id"
                    value={customerData.customer_id}
                    onChange={handleInputChange}
                    placeholder="Customer ID"
                    required // Ensure customer_id is mandatory for updating
                />
                <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="address"
                    value={customerData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                />
                <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="contact_number"
                    value={customerData.contact_number}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                />
                <button type="submit">Update Customer</button>
            </form>

            {errorMessage && <p>Error: {errorMessage}</p>}
        </div>
    );
};

export default UpdateCustomerForm;
