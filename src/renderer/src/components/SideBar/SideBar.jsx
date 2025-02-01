import {
    ShoppingBagIcon,
    DocumentCurrencyEuroIcon,
    Cog6ToothIcon,
    DocumentPlusIcon,
    Squares2X2Icon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import SideBarItem from "./SideBarItem.jsx";
import SideBarList from "./SideBarList.jsx";

const SideBar = () => {

    return (
        <SideBarList>
            <SideBarItem icon={DocumentPlusIcon} text='Create Invoice'/>
            <SideBarItem icon={UserGroupIcon} text='Customers'/>
            <SideBarItem icon={ShoppingBagIcon} text='Products'/>
            <SideBarItem icon={DocumentCurrencyEuroIcon} text='Tax Types'/>
            <SideBarItem icon={Squares2X2Icon} text='Units'/>
            <SideBarItem icon={Cog6ToothIcon} text='Settings'/>
        </SideBarList>
    )
}

export default SideBar;