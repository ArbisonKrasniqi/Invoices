const {tax_types_repo} = require('../repositories/tax_types/tax_types_repo');
const {ipcMain} = require('electron');
const {items_repo} = require("../repositories/items/items_repo");
const { CustomError } = require('../entities/CustomError');
const CustomSuccess = require('../entities/CustomSuccess');

const setupTaxTypesController = () => {
    ipcMain.handle("addTaxType", async (event, taxType) => {
        try {
            const addedTaxType = await tax_types_repo.insertTaxType(taxType);
            return new CustomSuccess(addedTaxType);
        } catch (err) {
            return CustomError.fromError(err);
        }
    })

    ipcMain.handle("getTaxTypes", async (event) => {
        try {
            const list = (await tax_types_repo.getTaxTypes()) || [];
            return new CustomSuccess(list);
        } catch (err) {
            return CustomError.fromError(err);
        }
    })

    ipcMain.handle("updateTaxType", async (event, taxType) => {
        try {
            if (!taxType) throw new Error('Parameters parent is null');
            if (!taxType.tax_type_id) throw new Error('Tax type id is required');

            const list = await tax_types_repo.getTaxType(taxType.tax_type_id);
            if (list.length === 0) throw new Error("Tax type not found!");
            const toBeUpdated = list[0];

            toBeUpdated.label = taxType.label;
            toBeUpdated.value = taxType.value;

            const updatedTaxType = await tax_types_repo.updateTaxType(toBeUpdated);
            return new CustomSuccess(updatedTaxType);
        } catch (err) {
            return CustomError.fromError(err);
        }
    })

    ipcMain.handle("deleteTaxType", async (event, tax_type_id) => {
        try {
            const list = await tax_types_repo.getTaxType(tax_type_id);
            if (list.length === 0) throw new CustomError(404, "Tax type not found!", null);

            const itemList = await items_repo.getItemsByTaxType(tax_type_id);
            if (itemList.length !== 0) throw new CustomError(409, "Tax type is being used!", itemList);

            const deletedTaxType = await tax_types_repo.deleteTaxType(tax_type_id);
            return new CustomSuccess(deletedTaxType);
        } catch (err) {
            return CustomError.fromError(err);
        }
    })
}

module.exports = { setupTaxTypesController }