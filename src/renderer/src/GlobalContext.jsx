import React, {createContext, useEffect, useState} from 'react';
import CustomError from './Entities/CustomError';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [openTab, setOpenTab] = useState('CreateInvoice');

    const [settings, setSettings] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [units, setUnits] = useState(null);
    const [taxTypes, setTaxTypes] = useState(null);
    const [items, setItems] = useState(null);

    //Reset Variables
    const [reset, setReset] = useState(false);
    const [resetSettings, setResetSettings] = useState(false);
    const [resetCustomers, setResetCustomers] = useState(false);
    const [resetUnits, setResetUnits] = useState(false);
    const [resetTaxTypes, setResetTaxTypes] = useState(false);
    const [resetItems, setResetItems] = useState(false);


    const [errors, setErrors] = useState([]);


    //Fetch Settings
    useEffect(() => {

            const fetchSettingsData = async () => {
                try {
                    const settingsResult = await window.api.getSettings();

                    if (settingsResult.success) {
                        console.log("Fetched Settings");
                        setSettings(settingsResult.data)
                    }
                    else {
                        setErrors(prev => [...prev, settingsResult.error] );
                        console.log("Settings error");
                    }
                } catch (err) {
                    const error = CustomError.fromError(err);
                    setErrors(prev => [...prev, error]);
                }
            }

            fetchSettingsData();
    }, [reset, resetSettings])


    //Fetch Customers
    useEffect( () => {
        const fetchCustomersData = async () => {
            try {
                const customersResult = await window.api.getCustomers();

                if (customersResult.success) {
                    console.log("Fetched Customers");
                    setCustomers(customersResult.data);
                }
                else {
                    setErrors( prev => [...prev, customersResult.error] );
                }
            } catch (err) {
                const error = CustomError.fromError(err);
                setErrors(prev => [...prev, error]);
            }
        }

        fetchCustomersData();
    }, [reset, resetCustomers])


    //Fetch Units
    useEffect( () => {
        const fetchUnitsData = async () => {
            try {
                const unitsResult = await window.api.getUnits();

                if (unitsResult.success) {
                    console.log("Fetched Units");
                    setUnits(unitsResult.data);
                }
                else {
                    setErrors( prev => [...prev, unitsResult.error] );
                }
            } catch (err) {
                const error = CustomError.fromError(err);
                setErrors(prev => [...prev, error]);
            }
        }

        fetchUnitsData();
    }, [reset, resetUnits])


    //Fetch TaxTypes
    useEffect( () => {
        const fetchTaxTypesData = async () => {
            try {
                const taxTypesResult = await window.api.getTaxTypes();

                if (taxTypesResult.success) {
                    console.log("Fetched TaxTypes");
                    setTaxTypes(taxTypesResult.data);
                }
                else {
                    console.log(taxTypesResult.error);
                    setErrors( prev => [...prev, taxTypesResult.error] );
                }
            } catch (err) {
                const error = CustomError.fromError(err);
                setErrors(prev => [...prev, error]);
            }
        }

        fetchTaxTypesData();
    }, [reset, resetTaxTypes])


    //Fetch Items
    useEffect( () => {
        const fetchItemsResult = async () => {
            try {
                const itemsResult = await window.api.getItems();

                if (itemsResult.success) {
                    console.log("Fetched Items");
                    setItems(itemsResult.data);
                }
                else {
                    setErrors( prev => [...prev, itemsResult.error] );
                }
            } catch (err) {
                const error = CustomError.fromError(err);
                setErrors(prev => [...prev, error]);
            }
        }

        fetchItemsResult();
    }, [reset, resetItems])

    const values = {openTab, setOpenTab, errors, setErrors, settings, customers, units, taxTypes, items, setReset, setResetUnits, setResetItems, setResetTaxTypes, setResetSettings, setResetCustomers} //Qitu values
    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
}