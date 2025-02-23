import {useContext, useState, useEffect} from "react";
import {GlobalContext} from "../GlobalContext.jsx";
import CustomError from "../Entities/CustomError.jsx";
import CustomTable from "../components/CustomTable.jsx";
import {Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";
import CustomTableHead from "../components/CustomTableHead.jsx";

const Products = () => {

    const {items, taxTypes, units, setErrors, setResetItems} = useContext(GlobalContext);

    const [isOpen, setIsOpen] = useState(false);
    const [itemId, setItemId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState(null);
    const [taxType, setTaxType] = useState(null);

    const [search, setSearch] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setFilteredItems(items.filter((item) => {
            return item.item_id.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.price.toLowerCase().includes(search.toLowerCase()) ||
            item.unit_id.toString().includes(search.toLowerCase()) ||
            item.tax_type_id.toString().includes(search.toLowerCase())
        }));
    }, [search, items])

    const validateForm = () => {
        if (!name.length) return false;
        if (!price.length) return false;
        if (!unit) return false;
        if (!taxType) return false;
    }

    const handleAddItem = async (e) => {
        e.preventDefault();

        if (validateForm()) return;

        try {
            const createResult = await window.api.addItem({
                name: name,
                item_id: itemId,
                price: price,
                unit_id: unit,
                tax_type_id: taxType,
            });

            if (createResult.success) {
                console.log(`Item: ${name} successfully added`);
                setResetItems((prev => !prev));
            }
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleDeleteItem = async (id) => {
        const deletingItem = filteredItems.find((item) => item.item_id === id);
        setSelectedItem(deletingItem);
        console.log(id);

        if (!window.confirm("Are you sure you want to delete: "+ deletingItem.name)) return;

        try {
            const deleteResult = await window.api.deleteItem(id);
            if (deleteResult.success) {
                console.log(`Item: ${name} successfully deleted`);
                setResetItems((prev => !prev));
                setSelectedItem(null);
            } else {
                throw new CustomError(deleteResult.error.code, deleteResult.error.message, deleteResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleUpdateItem = async () => {
        try {
            const updateResult = await window.api.updateItem(selectedItem);
            if (updateResult.success) {
                setResetItems((prev => !prev));
                setSelectedItem(null);
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
            <div className='p-6 w-full mx-auto'>
                <h2 className='text-2xl font-bold'>Manage Products</h2>
                <div className="flex-col flex gap-4 mb-4 mt-4">
                    <div className='w-5/12 text-gray'>
                        <Input
                            label='Search customers'
                            color='gray'
                            icon={<MagnifyingGlassIcon/>}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-20"
                            containerProps={{
                                className: "min-w-0"
                            }}
                        />
                    </div>
                    <div>
                        <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition">
                            Add Product
                        </button>

                        {isOpen && (
                            <div
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                onClick={() => setIsOpen(false)}>
                                <div
                                    className="bg-white p-6 rounded-lg shadow-lg w-96"
                                    onClick={(e) => e.stopPropagation()}>
                                    <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                                    <form onSubmit={handleAddItem} className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <select
                                            value={taxType}
                                            onChange={(e) => setTaxType(e.target.value)}
                                            className="w-full p-2 border rounded">
                                            <option value="" disabled>Select Tax Type</option>
                                            {taxTypes.map((tax) => (
                                                <option key={tax.tax_type_id} value={tax.tax_type_id}>
                                                    {tax.label}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            value={unit}
                                            onChange={(e) => {
                                                setUnit(e.target.value);
                                                console.log(unit);
                                            }}
                                            className="w-full p-2 border rounded">
                                            <option value="" disabled>Select Unit</option>
                                            {units.map((unit) => (
                                                <option key={unit.unit_id} value={unit.unit_id}>
                                                    {unit.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="submit"
                                            disabled={!name || !price}
                                            className={`w-full p-2 text-white rounded ${
                                                !name || !price ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
                                            }`}
                                        >
                                            Add Product
                                        </button>
                                </form>
                            </div>
                            </div>
                            )}
                    </div>
                </div>

                <CustomTable>
                    <thead>
                        <tr>
                            <CustomTableHead>ID</CustomTableHead>
                            <CustomTableHead>Name</CustomTableHead>
                            <CustomTableHead>Price</CustomTableHead>
                            <CustomTableHead>Unit</CustomTableHead>
                            <CustomTableHead>Tax</CustomTableHead>
                            <CustomTableHead>Actions</CustomTableHead>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredItems.map((item) => {
                        return (
                            <tr className="text-gray-800">
                                <td className="p-4 border-b border-gray-200">{item.item_id}</td>
                                <td className="p-4 border-b border-gray-200">
                                    <input
                                        type='text'
                                        value={item.item_id === selectedItem?.item_id ? selectedItem.name : item.name}
                                        onChange={(e) => {
                                            const updatedItem = {...item, name: e.target.value};
                                            setSelectedItem(updatedItem);
                                        }}
                                        onBlur={() => handleUpdateItem()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateItem();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    <input
                                        type='text'
                                        value={item.item_id === selectedItem?.item_id ? selectedItem.price : item.price}
                                        onChange={(e) => {
                                            const updatedItem = {...item, price: e.target.value};
                                            setSelectedItem(updatedItem);
                                        }}
                                        onBlur={() => handleUpdateItem()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateItem();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    <select
                                        value={item.item_id === selectedItem?.item_id ? selectedItem.unit_id : item.unit_id}
                                        onChange={(e) => {
                                            const updatedItem = {...item, unit_id: e.target.value};
                                            setSelectedItem(updatedItem);
                                        }}
                                        onBlur={() => handleUpdateItem()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateItem();
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Select Unit</option>
                                        {units.map((unit) => (
                                            <option key={unit.unit_id} value={unit.unit_id}>
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 border-b border-gray-200">
                                    <select
                                        value={item.item_id === selectedItem?.item_id ? selectedItem.tax_type_id : item.tax_type_id}
                                        onChange={(e) => {
                                            const updatedItem = {...item, tax_type_id: e.target.value};
                                            setSelectedItem(updatedItem);
                                        }}
                                        onBlur={() => handleUpdateItem()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateItem();
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Select Tax Type</option>
                                        {taxTypes.map((taxType) => (
                                            <option key={taxType.tax_type_id} value={taxType.tax_type_id}>
                                                {taxType.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <button
                                        onClick={() => handleDeleteItem(item.item_id)}
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

export default Products;