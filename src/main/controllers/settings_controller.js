const { settings_repo } = require('../repositories/settings/settings_repo');
const { ipcMain } = require('electron');
const { CustomError } = require('../entities/CustomError');
const CustomSuccess = require('../entities/CustomSuccess');

const setupSettingsController = () => {
    ipcMain.handle('getSettings', async (event) => {
        try {
            const settings = await settings_repo.getSettings();
            return new CustomSuccess(settings);
        } catch (err) {
            CustomError.fromError(err);
        }
    })

    ipcMain.handle('setSettings', async (event, settings) => {
        try {
            const updatedSettings = await settings_repo.updateSettings(settings);
            return new CustomSuccess(updatedSettings);
        } catch (err) {
            CustomError.fromError(err);
        }
    })
}

module.exports = { setupSettingsController };