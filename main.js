const { app, BrowserWindow} = require('electron');
const path = require('path');
const {initializeDatabase} = require("./src/main/db/db");
const customerController = require("./src/main/controllers/customers_controller");

let mainWindow;

//Disabled for GetVsyncParametersIfAvailable() Failures
app.disableHardwareAcceleration();

app.on('ready', async () => {
    // Initialize the database
    await initializeDatabase();

    customerController.setupCustomerController();

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
