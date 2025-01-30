const { app, BrowserWindow} = require('electron');
const path = require('path');
const {initializeDatabase} = require("./src/main/db/db");
const customerController = require("./src/main/controllers/customers_controller");
const unitsController = require("./src/main/controllers/units_controller");
const taxTypeController = require("./src/main/controllers/tax_types_controller");
const itemsController = require("./src/main/controllers/items_controller");
const settingsController = require("./src/main/controllers/settings_controller");

let mainWindow;

//Disabled for GetVsyncParametersIfAvailable() Failures
app.disableHardwareAcceleration();

app.on('ready', async () => {
    // Initialize the database
    await initializeDatabase();

    settingsController.setupSettingsController();
    customerController.setupCustomerController();
    unitsController.setupUnitsController();
    taxTypeController.setupTaxTypesController();
    itemsController.setupItemsController();

    // Create the main window
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'src/main/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    await mainWindow.loadURL('http://localhost:5173');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
