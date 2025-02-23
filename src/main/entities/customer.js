class Customer {
    constructor(id = null, customer_id = null, name = null, address = null, email = null, contact_number = null) {
        this.id = null;
        this.customer_id = customer_id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact_number = contact_number;
    }

    static validateCreate(customer) {
        const missingFields = [];
        if (!customer.customer_id) missingFields.push("Customer Id");
        if (!customer.name) missingFields.push("Name");

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: (${missingFields.join(", ")})`);
        }
    }
}

module.exports = Customer;