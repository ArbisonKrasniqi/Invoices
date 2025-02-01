import { Card, Typography } from "@material-tailwind/react";
const CustomTable = (props) => {

    const TABLE_HEAD = ["Name", "Job", "Employed", ""];

    const TABLE_ROWS = [
        {
            name: "John Michael",
            job: "Manager",
            date: "23/04/18",
        },
        {
            name: "Alexa Liras",
            job: "Developer",
            date: "23/04/18",
        },
        {
            name: "Laurent Perrier",
            job: "Executive",
            date: "19/09/17",
        },
        {
            name: "Michael Levi",
            job: "Developer",
            date: "24/12/08",
        },
        {
            name: "Richard Gran",
            job: "Manager",
            date: "04/10/21",
        },
    ];

    return (
        <div className="h-full w-100% overflow-x-hidden">
            <table className="w-full min-w-max table-auto text-left">
                {props.children}
            </table>
        </div>
    );
}

export default CustomTable;