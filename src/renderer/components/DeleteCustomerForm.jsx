import React, { useState } from 'react';

const DeleteCustomerForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await window.api.deleteCustomer(customerId);
            if (response.success) {
                console.log(response);
                setSuccessMessage('Customer deleted successfully.');
                setErrorMessage('');
            } else {
                setErrorMessage(response.error.message);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error calling deleteCustomer:', error);
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="customer_id"
                    value={customerId}
                    onChange={handleInputChange}
                    placeholder="Customer ID"
                />
                <button type="submit">Delete Customer</button>
            </form>

            {errorMessage && <p>Error: {errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default DeleteCustomerForm;
