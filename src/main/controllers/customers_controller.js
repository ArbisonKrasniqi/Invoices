const { customers_repo } = require('../repositories/customers/customers_repo');
const { ipcMain } = require('electron');
const Customer = require('../entities/customer');
const { CustomError } = require('../entities/CustomError');
const CustomSuccess = require('../entities/CustomSuccess');

const setupCustomerController = () => {
    ipcMain.handle("addCustomer", async (event, customer) => {
        try {
            Customer.validateCreate(customer);
            //Check a ekziston by customer_id
            const list = await customers_repo.getCustomer(customer.customer_id);
            if (list.length > 0) throw new CustomError(409, "Customer Id already exists!", customer.customer_id);

            //Add to database
            const savedCustomer = await customers_repo.insertCustomer(customer);
            return new CustomSuccess(savedCustomer);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("getCustomers", async (event) => {
        try {
            const customersList = (await customers_repo.getCustomers()) || [];
            return new CustomSuccess(customersList);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("deleteCustomer", async (event, id) => {
        try {
            if (!id) throw new CustomError(400, "Missing id", null);
            const customersList = await customers_repo.getCustomer(id);
            if (customersList.length === 0) throw new CustomError(404, "Customer not found!", null);

            const customer = customersList[0];
            await customers_repo.deleteCustomer(id);
            return new CustomSuccess(customer);
        } catch (err) {
            return CustomError.fromError(err)
        }
    });

    ipcMain.handle("updateCustomer", async (event, customer) => {
        try {
            if (!customer) throw new CustomError(400, "Parameters parent is null", null);
            const list = await customers_repo.getCustomer(customer.id);
            if (list.length === 0) throw new CustomError(404, "Customer does not exist!", customer);
            const toBeUpdated = list[0];

            Customer.validateCreate(toBeUpdated);
            //Update attributes
            toBeUpdated.name = customer.name;
            toBeUpdated.address = customer.address;
            toBeUpdated.email = customer.email;
            toBeUpdated.contact_number = customer.contact_number;
            toBeUpdated.customer_id = customer.customer_id;

            const updatedCustomer = await customers_repo.updateCustomer(toBeUpdated);
            return new CustomSuccess(updatedCustomer);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })
}

module.exports = { setupCustomerController }
