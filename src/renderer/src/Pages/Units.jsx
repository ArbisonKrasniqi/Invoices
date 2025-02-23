import {useContext, useState, useEffect} from "react";
import {GlobalContext} from "../GlobalContext.jsx";
import CustomError from "../Entities/CustomError.jsx";
import CustomTableHead from "../components/CustomTableHead.jsx";
import CustomTable from "../components/CustomTable.jsx";
import {Button, Input} from "@material-tailwind/react"
import{
    MagnifyingGlassIcon,
    TrashIcon
} from "@heroicons/react/24/solid/index.js";

const Units = () => {
    const {units, setErrors, setResetUnits} = useContext(GlobalContext);

    //Form data will be used for create and edit
    const [unitName, setUnitName] = useState("");
    const [search, setSearch] = useState("");
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);

    //Use Effect for filtering
    useEffect(() => {
        setFilteredUnits(units.filter((unit) => unit.name.toLowerCase().includes(search.toLowerCase()) || unit.unit_id.toString().includes(search.toLowerCase())));
    }, [search, units])

    const handleAddUnit = async (e) => {
        e.preventDefault();
        if (!unitName.trim()) return;

        try {
            const createResult = await window.api.addUnit(unitName);
            if (createResult.success){
                console.log("Unit: "+unitName+" successfully created");
                setResetUnits((prev => !prev));
            } else {
                throw new CustomError(createResult.error.code, createResult.error.message, createResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleDeleteUnit = async (unit_id) => {
        const deletingUnit = filteredUnits.find((unit) => unit.unit_id === unit_id);
        setSelectedUnit(deletingUnit);
        console.log(unit_id);

        if (!window.confirm("Are you sure you want to delete: "+ deletingUnit.name)) return;

        try {
            const deleteResult = await window.api.deleteUnit(unit_id);
            if (deleteResult.success){
                console.log("Unit: "+deletingUnit.name+" successfully deleted");
                setResetUnits((prev => !prev));
                setSelectedUnit(null);
            } else {
                throw new CustomError(deleteResult.error.code, deleteResult.error.message, deleteResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleUpdateUnit = async () => {
        try {
            const updateResult = await window.api.updateUnit(selectedUnit);
            if (updateResult.success){
                console.log("Unit: "+selectedUnit.name +" successfully updated");
                setResetUnits((prev => !prev));
                setSelectedUnit(null);
            } else {
                throw new CustomError(updateResult.error.code, updateResult.error.message, updateResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }
    return (
        <>
        <div className="p-6 w-full mx-auto">
            <h2 className="text-2xl font-bold">Manage Units</h2>
            <div className='flex-col flex gap-4 mb-4 mt-4'>
                <div className='w-5/12 text-gray'>
                    <Input
                        label="Search units"
                        color="gray"
                        icon={<MagnifyingGlassIcon/>}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                </div>

                <form onSubmit={handleAddUnit} className="relative flex w-5/12 mb-4">
                    <Input
                        label="Create Unit"
                        color={unitName ? "teal" : "gray"}
                        value={unitName}
                        onChange={(e) => setUnitName(e.target.value)}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={!unitName}
                        className={`ml-2 p-2.5 w-20 text-xs font-bold text-white rounded shadow-lg ${
                            !unitName ? "bg-gray-400" : "bg-teal-500"
                        }`}
                    >
                        CREATE
                    </button>
                </form>
            </div>

            <CustomTable>
                <thead>
                <tr>
                    <CustomTableHead>Unit ID</CustomTableHead>
                    <CustomTableHead>Name</CustomTableHead>
                    <CustomTableHead>Actions</CustomTableHead>
                </tr>
                </thead>
                <tbody>
                {filteredUnits.map((unit, index) => {
                    return (
                        <tr className='text-gray-800'>
                            <td className="p-4 border-b border-gray-20">{unit.unit_id}</td>
                            <td className="p-4 border-b border-gray-20">
                                <input
                                    type="text"
                                    value={unit.unit_id === selectedUnit?.unit_id ? selectedUnit.name : unit.name}
                                    onChange={(e) => {
                                        const updatedUnit = {unit_id: unit.unit_id, name: e.target.value};
                                        setSelectedUnit(updatedUnit);
                                    }}
                                    onBlur={() => handleUpdateUnit(selectedUnit)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleUpdateUnit(selectedUnit);
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <button
                                        onClick={() => handleDeleteUnit(unit.unit_id)}
                                        className="bg-gray-800 text-white p-1.5 rounded
                                        transition-all hover:bg-red-600 duration-75
                                        "
                                    >
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </CustomTable>
        </div>

        </>
    );
}

export default Units;