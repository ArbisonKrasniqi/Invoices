import React, { useState } from 'react';

const AddCustomerForm = () => {
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

        try {
            const response = await window.api.addCustomer(customerData);
            if (response.success) {
                console.log('Customer added:', response.data);
            } else {
                setErrorMessage(response.error.message); // Set only the message for rendering
            }
        } catch (error) {
            console.error('Error calling addCustomer:', error);
            setErrorMessage(error.stackTrace); // Use error.message here for the UI
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
                <button type="submit">Add Customer</button>
            </form>

            {errorMessage && <p>Error: {errorMessage}</p>}
        </div>
    );
};

export default AddCustomerForm;
