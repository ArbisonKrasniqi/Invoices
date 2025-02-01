import {Typography} from "@material-tailwind/react";

const CustomTableHead = props => {
    return (
        <th className="border-b text-white bg-gray-800 p-4">
            <Typography
                variant="small"
                className="font-bold leading-none opacity-90"
            >
                { props.children }
            </Typography>
        </th>
    );
}

export default CustomTableHead