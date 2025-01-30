const INSERT_CUSTOMER = `
    INSERT INTO Customers (customer_id, name, address, email, contact_number)
    VALUES (?, ?, ?, ?, ?);
`;

const GET_CUSTOMERS = `
    SELECT DISTINCT * FROM customers
`;

const UPDATE_CUSTOMER = `
    UPDATE Customers
    SET
        name = ?,
        address = ?,
        email = ?,
        contact_number = ?
    WHERE customer_id = ?; 
`

const DELETE_CUSTOMER = `
    DELETE FROM Customers WHERE customer_id = ?;
`;

module.exports = {
    INSERT_CUSTOMER,
    GET_CUSTOMERS,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
}
