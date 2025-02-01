import {useContext} from "react";
import { GlobalContext } from "../../GlobalContext.jsx";

const SideBarItem = props => {
    const Icon = props.icon;
    const globalContext = useContext(GlobalContext);

    const onClick = () => {
        globalContext.setOpenTab(props.text);
        console.log(globalContext.openTab);
    }

    return (
        <div
            onClick={onClick}
            className={`flex-row mb-1 h-10 w-full text-center rounded flex items-center select-none 
                transition-all duration-75 cursor-pointer hover:shadow-xl hover:border-4 hover:border-b-gray-600 hover:border-l-0 hover:border-r-0 hover:border-t-0
            ${globalContext.openTab === props.text ? "bg-gray-800 text-white shadow-xl" : ""}
            `}
            >
            <div className='h-full w-10 max-w-10 p-0 m-0 flex items-center justify-center'>
                <Icon className='h-6 w-6'></Icon>
            </div>
            <div className='h-full flex items-center pl-2'>
                {props.text}
            </div>
        </div>
    )
}

export default SideBarItem