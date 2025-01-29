const customer_queries = require('./customers_queries');
const { getDB } = require('../../db/db');

class customers_repo {

    static async updateCustomer(customer) {
        const query = customer_queries.UPDATE_CUSTOMER;

        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,
                [
                    customer.name,
                    customer.address,
                    customer.email,
                    customer.contact_number,
                    customer.customer_id
                ],
                function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(customer);

            });
        });
    }

    static async insertCustomer(customer) {
        const query = customer_queries.INSERT_CUSTOMER; // The query string

        // Make sure to get the DB instance by awaiting the promise returned by getDB()
        const db = await getDB(); // Wait for the database connection to resolve

        return new Promise((resolve, reject) => {
            db.run(query,
                [
                    customer.customer_id,
                    customer.name,
                    customer.address,
                    customer.email,
                    customer.contact_number
                ],
                function (err) {
                    if (err) {
                        return reject(err); // Reject if there is an error
                    }
                    resolve(customer); // Resolve with the customer data
                }
            );
        });
    }

    static async getCustomer(customer) {
        let query = customer_queries.GET_CUSTOMERS_DYNAMIC;

        const db = await getDB();

        const conditions = [];
        const values = [];

        if (customer.customer_id) {
            conditions.push("customer_id = ?");
            values.push(customer.customer_id);
        }

        if (customer.name) {
            conditions.push("name = ?");
            values.push(customer.name);
        }

        if (customer.address) {
            conditions.push("address = ?");
            values.push(customer.address);
        }

        if (customer.email) {
            conditions.push("email = ?");
            values.push(customer.email);
        }

        if (customer.contact_number) {
            conditions.push("contact_number = ?");
            values.push(customer.contact_number);
        }

        if (conditions.length === 0) {
            throw new Error("No parameters sent");
        }

        query += ` ${conditions.join(" AND ")}`;

        return new Promise ((resolve, reject) => {
            db.all(query, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async deleteCustomer(customer_id) {
        const db = await getDB();
        const query = customer_queries.DELETE_CUSTOMER;

        return new Promise((resolve, reject) => {
            db.run(query, [customer_id.toString()], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve()
            })
        })
    }
}

module.exports = {
    customers_repo,
};
