const { ipcMain } = require('electron');
const { items_repo } = require('../repositories/items/items_repo');
const { CustomError } = require('../entities/CustomError');
const CustomSuccess = require('../entities/CustomSuccess');

const setupItemsController = () => {
    ipcMain.handle("addItem", async (event, item) => {
        try {
            const savedItem = await items_repo.insertItem(item);
            return new CustomSuccess(savedItem);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("getItems", async (event) => {
        try {
        const list = (await items_repo.getItems()) || [];
            return new CustomSuccess(list);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("deleteItem", async (event, item) => {
        try {
            const list = await items_repo.getItem(item.item_id);
            if (list.length === 0) throw new Error("Item not found");

            const deletedItem = await items_repo.deleteItem(item.item_id);
            return new CustomSuccess(deletedItem);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("updateItem", async (event, item) => {
        try {
            if (!item) throw new Error("Parameters parent is null");
            if (!item.item_id) throw new Error("Item id is required");

            const list = await items_repo.getItem(item.item_id);
            if (list.length === 0) throw new Error("Item not found");
            const toBeUpdated = list[0];

            //Vyn ni check a ekziston unitId edhe taxTypeId
            toBeUpdated.name = item.name;
            toBeUpdated.price = item.price;
            toBeUpdated.unit_id = item.unit_id;
            toBeUpdated.tax_type_id = item.tax_type_id;

            const updatedItem = await items_repo.updateItem(toBeUpdated);
            return new CustomSuccess(updatedItem);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })
}

module.exports = {setupItemsController};