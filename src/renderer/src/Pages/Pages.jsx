import {GlobalContext} from "../GlobalContext.jsx";
import {useContext} from "react";

import CreateInvoice from "./CreateInvoice.jsx";
import Customers from "./Customers.jsx";
import Products from "./Products.jsx";
import Settings from "./Settings.jsx";
import TaxTypes from "./TaxTypes.jsx";
import Units from "./Units.jsx";

const Pages = () => {
    const globalContext = useContext(GlobalContext);

    const pages = {
        'Create Invoice' : <CreateInvoice />,
        'Customers': <Customers />,
        'Products': <Products />,
        'Settings': <Settings />,
        'Tax Types': <TaxTypes />,
        'Units': <Units />,
    };


    return(
        <div className='h-full w-full'>
            {pages[globalContext.openTab] || <p> Page not found </p>}
        </div>
    )
}

export default Pages;