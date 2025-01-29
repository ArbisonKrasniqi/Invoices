const { contextBridge, ipcRenderer } = require('electron');

//Cdo metod shtohet ketu per me pas front-end qasje ne to
contextBridge.exposeInMainWorld('api', {
    addCustomer: async (customer) => await ipcRenderer.invoke('addCustomer', customer),
    getCustomers: async (customer) => await ipcRenderer.invoke('getCustomers', customer),
    updateCustomer: async (customer) => await ipcRenderer.invoke('updateCustomer', customer),
    deleteCustomer: async (customer_id) => await ipcRenderer.invoke('deleteCustomer', customer_id),
});
