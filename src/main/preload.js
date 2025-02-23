const { contextBridge, ipcRenderer } = require('electron');

//Cdo metod shtohet ketu per me pas front-end qasje ne to
contextBridge.exposeInMainWorld('api', {

    //Customers
    addCustomer: async (customer) => await ipcRenderer.invoke('addCustomer', customer),
    getCustomers: async () => await ipcRenderer.invoke('getCustomers'),
    deleteCustomer: async (id) => await ipcRenderer.invoke('deleteCustomer', id),
    updateCustomer: async (customer) => await ipcRenderer.invoke('updateCustomer', customer),

    //Units
    addUnit: async (name) => await ipcRenderer.invoke('addUnit', name),
    getUnits: async () => await ipcRenderer.invoke('getUnits'),
    deleteUnit: async (unit_id) => await ipcRenderer.invoke('deleteUnit', unit_id),
    updateUnit: async (unit) => await ipcRenderer.invoke('updateUnit', unit),

    //Tax types
    addTaxType: async (taxType) => await ipcRenderer.invoke('addTaxType', taxType),
    getTaxTypes: async () => await ipcRenderer.invoke('getTaxTypes'),
    deleteTaxType: async (tax_type_id) => await ipcRenderer.invoke('deleteTaxType', tax_type_id),
    updateTaxType: async (taxType) => await ipcRenderer.invoke('updateTaxType', taxType),

    //Items
    addItem: async (item) => await ipcRenderer.invoke('addItem', item),
    getItems: async () => await ipcRenderer.invoke('getItems'),
    deleteItem: async (item_id) => await ipcRenderer.invoke('deleteItem', item_id),
    updateItem: async (item) => await ipcRenderer.invoke('updateItem', item),

    //Settings
    getSettings: async () => await ipcRenderer.invoke('getSettings'),
    setSettings: async (settings) => await ipcRenderer.invoke('setSettings', settings),
});
