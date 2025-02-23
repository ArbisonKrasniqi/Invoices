import {useContext, useState, useEffect, useRef} from "react";
import {GlobalContext} from "../GlobalContext.jsx";
import CustomError from "../Entities/CustomError.jsx";
import CustomTableHead from "../components/CustomTableHead.jsx";
import CustomTable from "../components/CustomTable.jsx";
import {Button, Input} from "@material-tailwind/react"
import{
    MagnifyingGlassIcon,
    TrashIcon
} from "@heroicons/react/24/solid/index.js";

const TaxTypes = () => {
    const {taxTypes, setErrors, setResetTaxTypes} = useContext(GlobalContext);

    //Create data
    const [taxLabel, setTaxLabel] = useState("");
    const [taxValue, setTaxValue] = useState("");

    const [search, setSearch] = useState('');
    const [filteredTaxTypes, setFilteredTaxTypes] = useState([]);
    const [selectedTaxType, setSelectedTaxType] = useState(null);

    useEffect(() => {
        setFilteredTaxTypes(taxTypes.filter((taxType) =>
            taxType.tax_type_id.toString().includes(search.toLowerCase()) ||
            taxType.label.toString().includes(search.toLowerCase()) ||
            taxType.value.toString().includes(search.toLowerCase())));
    }, [search, taxTypes])

    const handleAddTaxType = async (e) => {
        e.preventDefault();

        if (!taxLabel.trim() || !taxValue.trim()) return;

        try {
            const createResult = await window.api.addTaxType({label: taxLabel, value: taxValue});
            if (createResult.success) {
                console.log("Tax type: "+ taxLabel+" successfully created");
                setResetTaxTypes((prev) => !prev);
            } else {
                throw new CustomError(createResult.error.code, createResult.error.message, createResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleDeleteTaxType = async (tax_type_id) => {
        const deletingTaxType = filteredTaxTypes.find((tx) => tx.tax_type_id.toString() === tax_type_id.toString());
        setSelectedTaxType(deletingTaxType);
        console.log(tax_type_id);

        if (!window.confirm("Are you sure you want to delete: "+ deletingTaxType.label)) return;

        try {
            const deleteResult = await window.api.deleteTaxType(tax_type_id);
            if (deleteResult.success) {
                console.log("Unit: "+deletingTaxType.label+" successfully deleted");
                setResetTaxTypes((prev => !prev));
                setSelectedTaxType(null);
            } else {
                throw new CustomError(deleteResult.error.code, deleteResult.error.message, deleteResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleUpdateTaxType = async () => {
        try {
            const updateResult = await window.api.updateTaxType(selectedTaxType);
            if (updateResult.success) {
                console.log("Tax type: "+selectedUnit.label+" successfully updated");
                setResetTaxTypes((prev) => !prev);
                setSelectedTaxType(null);
            } else {
                throw new CustomError(updateResult.error.code, updateResult.error.message, updateResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }


    return(
        <>
            <div className="p-6 w-full mx-auto">
                <h2 className="text-2xl font-bold"> Manage Tax Types</h2>
                <div className="flex-col flex gap-4 mb-4 mt-4">
                    <div className="w-5/12 text-gray">
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

                    <form onSubmit={handleAddTaxType} className="relative w-8/12 flex mb-4 gap-2">
                        <Input
                            label="Tax Label"
                            color={taxLabel ? "teal" : "gray"}
                            value={taxLabel}
                            onChange={(e) => setTaxLabel(e.target.value)}
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />

                        <Input
                            label="Tax value"
                            color={taxValue ? "teal" : "gray"}
                            value={taxValue}
                            onChange={(e) => setTaxValue(e.target.value)}
                            className="pr-20"
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />

                        <button
                            type="submit"
                            disabled={!taxValue || !taxLabel}
                            className={`ml-2 p-2.5 w-20 text-xs font-bold text-white rounded shadow-lg ${
                                !taxValue || !taxLabel ? "bg-gray-400" : "bg-teal-500"
                            }`}
                        >
                            CREATE
                        </button>
                    </form>
                </div>

                <CustomTable>
                    <thead>
                    <tr>
                        <CustomTableHead>Tax Type ID</CustomTableHead>
                        <CustomTableHead>Tax Label</CustomTableHead>
                        <CustomTableHead>Tax Value</CustomTableHead>
                        <CustomTableHead>Actions</CustomTableHead>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTaxTypes.map((taxType, index) => {
                        return (
                            <tr className='text-gray-800'>
                                <td className="p-4 border-b border-gray-20">{taxType.tax_type_id}</td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type="text"
                                        value={taxType.tax_type_id === selectedTaxType?.tax_type_id ? selectedTaxType.label : taxType.label}
                                        onChange={(e) => {
                                            setTaxLabel(e.target.value);
                                            const updatedTaxType = {
                                                tax_type_id: taxType.tax_type_id,
                                                label: e.target.value,
                                                value: taxValue
                                            };
                                            setSelectedTaxType(updatedTaxType);
                                        }}
                                        onBlur={() => handleUpdateTaxType(selectedTaxType)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateTaxType(selectedTaxType);
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type="text"
                                        value={taxType.tax_type_id === selectedTaxType?.tax_type_id ? selectedTaxType.value : taxType.value}
                                        onChange={(e) => {
                                            setTaxValue(e.target.value);
                                            const updatedTaxType = {
                                                tax_type_id: taxType.tax_type_id,
                                                label: taxLabel,
                                                value: e.target.value
                                            };
                                            setSelectedTaxType(updatedTaxType);
                                        }}
                                        onBlur={() => handleUpdateTaxType(selectedTaxType)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateTaxType(selectedTaxType);
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <button
                                        onClick={() => handleDeleteTaxType(taxType.tax_type_id)}
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
    )
}

export default TaxTypes;