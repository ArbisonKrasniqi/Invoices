const { units_repo } = require('../repositories/units/units_repo');
const { ipcMain } = require('electron');
const {items_repo} = require("../repositories/items/items_repo");
const { CustomError } = require('../entities/CustomError');
const CustomSuccess = require('../entities/CustomSuccess');

const setupUnitsController = () => {
    ipcMain.handle("addUnit", async (event, name) => {
        try {
            if (!name) throw new CustomError(400, "Unit name is required!");
            const unitName = await units_repo.insertUnit(name);
            return new CustomSuccess(unitName);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("getUnits", async (event) => {
        try {
            const list = (await units_repo.getUnits()) || [];
            return new CustomSuccess(list);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("deleteUnit", async (event, unit_id) => {
        try {
            if (!unit_id) throw new CustomError(400, "Unit id is required!", null);

            const list = await units_repo.getUnit(unit_id);
            if (list.length === 0) throw new CustomError(404, "Unit not found!", null);

            const itemsWithUnit = await items_repo.getItemsByUnit(unit_id);
            if (itemsWithUnit.length !== 0) throw new CustomError(409, "Unit is being used!", itemsWithUnit);

            const deletedUnit = await units_repo.deleteUnit(unit_id);
            return new CustomSuccess(deletedUnit);
        } catch (err) {
            return CustomError.fromError(err)
        }
    })

    ipcMain.handle("updateUnit", async (event, unit) => {
        try {
            if (!unit) throw new CustomError(400, "Parameters parent is null", null);
            if (!unit.unit_id) throw new CustomError(400, 'Unit id is required', null);
            if (!unit.name) throw new CustomError(400, 'Unit name is required', null);

            const list = await units_repo.getUnit(unit.unit_id);
            if (list.length === 0) throw new CustomError(404, "Unit not found!", null);
            const toBeUpdated = list[0];

            toBeUpdated.name = unit.name;

            const updatedUnit = await units_repo.updateUnit(toBeUpdated);
            return new CustomSuccess(updatedUnit);

        } catch (err) {
            return CustomError.fromError(err)
        }
    })

}

module.exports = { setupUnitsController }