const { customers_repo } = require('../repositories/customers/customers_repo');
const { ipcMain } = require('electron');
const Customer = require('../entities/customer');

const setupCustomerController = () => {
    ipcMain.handle("addCustomer", async (event, customer) => {
        try {
            Customer.validateCreate(customer);
            //Check a ekziston by customer_id
            const list = await customers_repo.getCustomer({customer_id: customer.customer_id});
            if (list.length > 0) throw new Error("Customer Id already exists!");

            //Add to database
            const savedCustomer = await customers_repo.insertCustomer(customer);
            return { success: true, data: savedCustomer };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                error: { message: err.message, stack: err.stack }
            }
        }
    })

    ipcMain.handle("getCustomers", async (event, customer) => {
        try {
            if (!customer) throw new Error("Parameters parent is null")
            const customersList = await customers_repo.getCustomer(customer);
            return { success: true, data: customersList };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                error: { message: err.message, stack: err.stack }
            }
        }
    })

    ipcMain.handle("deleteCustomer", async (event, customer_id) => {
        try {
            const customersList = await customers_repo.getCustomer({customer_id: customer_id});
            if (customersList.length === 0) throw new Error("Customer not found!");

            const customer = customersList[0];
            await customers_repo.deleteCustomer(customer_id);
            return { success: true, data: customer };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                error: { message: err.message, stack: err.stack }
            }
        }
    });

    ipcMain.handle("updateCustomer", async (event, customer) => {
        try {
            if (!customer) throw new Error("Parameters parent is null");
            const list = await customers_repo.getCustomer({customer_id: customer.customer_id});
            if (list.length === 0) throw new Error("Customer does not exist!");
            const toBeUpdated = list[0];

            Customer.validateCreate(toBeUpdated);
            //Update attributes
            toBeUpdated.name = customer.name;
            toBeUpdated.address = customer.address;
            toBeUpdated.email = customer.email;
            toBeUpdated.contact_number = customer.contact_number;

            const updatedCustomer = await customers_repo.updateCustomer(toBeUpdated);
            return { success: true, data: updatedCustomer };
        } catch (err) {
            console.error(err.stack);
            return {
                success: false,
                error: { message: err.message, stack: err.stack }
            }
        }
    })
}

module.exports = { setupCustomerController }
