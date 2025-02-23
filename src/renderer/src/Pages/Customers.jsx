import {useContext, useState, useEffect} from "react";
import {GlobalContext} from "../GlobalContext.jsx";
import CustomError from "../Entities/CustomError.jsx";
import {Input} from "@material-tailwind/react"
import {MagnifyingGlassIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";
import CustomTable from "../components/CustomTable.jsx";
import CustomTableHead from "../components/CustomTableHead.jsx";

const Customers = () => {
    
    const {customers, setErrors, setResetCustomers} = useContext(GlobalContext);

    //Form data for create and edit
    const [isOpen, setIsOpen] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    //For searching and editing
    const [search, setSearch] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        setFilteredCustomers(customers.filter((customer) => {
            return customer.customer_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                customer.name.toString().toLowerCase().includes(search.toLowerCase()) ||
                customer.address.toString().toLowerCase().includes(search.toLowerCase()) ||
                customer.email.toString().toLowerCase().includes(search.toLowerCase()) ||
                customer.contact_number.toString().toLowerCase().includes(search.toLowerCase());
        }));
    }, [search, customers]);

    const validateForm = () => {
        const idExists = customers.filter((customer) => customer.customer_id.toString().toLowerCase().includes(customerId));
        if (idExists) {
            return false;
        }
        if (!customerId.length) return false;
        if (!name.length) return false;
    }
    const handleAddCustomer = async (e) => {
        e.preventDefault();
        //Validate form
        if (validateForm()) return;

        try {
            const createResult = await window.api.addCustomer({
                customer_id: customerId,
                name: name,
                address: address,
                email: email,
                contact_number: contactNumber,
            });

            if (createResult.success) {
                console.log("Customer: "+name+" successfully created");
                setResetCustomers((prev => !prev));
            }
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleDeleteCustomer = async (id) => {
        const deletingCustomer = filteredCustomers.find((customer) => customer.id === id);
        setSelectedCustomer(deletingCustomer);
        console.log(id);

        if (!window.confirm("Are you sure you want to delete: "+ deletingCustomer.customer_id)) return;

        try {
            const deleteResult = await window.api.deleteCustomer(id);
            if (deleteResult.success) {
                console.log("Customer: "+deletingCustomer.name+" successfully deleted");
                setResetCustomers((prev => !prev));
                setSelectedCustomer(null);
            } else {
                throw new CustomError(deleteResult.error.code, deleteResult.error.message, deleteResult.error.data);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    }

    const handleUpdateCustomer = async () => {
        try {
            const updateResult = await window.api.updateCustomer(selectedCustomer);
            if (updateResult.success) {
                setResetCustomers((prev => !prev));
                setSelectedCustomer(null);
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
                <h2 className="text-2xl font-bold">Manage Customers</h2>
                <div className="flex-col flex gap-4 mb-4 mt-4">
                    <div className="w=5/12 text-gray">
                        <Input
                            label="Search customers"
                            color="gray"
                            icon={<MagnifyingGlassIcon/>}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-20"
                            containerProps={{
                                className: "min-w-0",
                            }}

                        />
                    </div>

                    <div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition">
                            Add Customer
                        </button>

                        {isOpen && (
                            <div
                                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                                onClick={() => setIsOpen(false)}>
                                <div
                                    className="bg-white p-6 rounded-lg shadow-lg w-96"
                                    onClick={(e) => e.stopPropagation()}>
                                    <h2 className="text-xl font-bold mb-4">Add New Customer</h2>

                                    <form onSubmit={handleAddCustomer} className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Customer ID"
                                            value={customerId}
                                            onChange={(e) => setCustomerId(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Customer Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Customer Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Customer Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Customer Contact Number"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={!name || !customerId}
                                            className={`w-full p-2 text-white rounded ${
                                                !customerId || !name ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
                                            }`}
                                        >
                                            CREATE
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
                            <CustomTableHead>CustomerID</CustomTableHead>
                            <CustomTableHead>Name</CustomTableHead>
                            <CustomTableHead>Address</CustomTableHead>
                            <CustomTableHead>Email</CustomTableHead>
                            <CustomTableHead>Contact</CustomTableHead>
                            <CustomTableHead>Actions</CustomTableHead>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredCustomers.map((customer, index) => {
                        return (
                            <tr className="text-gray-800">
                                <td className="p-4 border-b border-gray-20">{customer.id}</td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type='text'
                                        value={customer.id === selectedCustomer?.id ? selectedCustomer.customer_id : customer.customer_id}
                                        onChange={(e) => {
                                            const updatedCustomer = {...customer, customer_id: e.target.value};
                                            setSelectedCustomer(updatedCustomer);
                                        }}
                                        onBlur={() => handleUpdateCustomer()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateCustomer();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type='text'
                                        value={customer.id === selectedCustomer?.id ? selectedCustomer.name : customer.name}
                                        onChange={(e) => {
                                            const updatedCustomer = {...customer, name: e.target.value};
                                            setSelectedCustomer(updatedCustomer);
                                        }}
                                        onBlur={() => handleUpdateCustomer()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateCustomer();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type='text'
                                        value={customer.id === selectedCustomer?.id ? selectedCustomer.address : customer.address}
                                        onChange={(e) => {
                                            const updatedCustomer = {...customer, address: e.target.value};
                                            setSelectedCustomer(updatedCustomer);
                                        }}
                                        onBlur={() => handleUpdateCustomer()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateCustomer();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type='text'
                                        value={customer.id === selectedCustomer?.id ? selectedCustomer.email : customer.email}
                                        onChange={(e) => {
                                            const updatedCustomer = {...customer, email: e.target.value};
                                            setSelectedCustomer(updatedCustomer);
                                        }}
                                        onBlur={() => handleUpdateCustomer()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateCustomer();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <input
                                        type='text'
                                        value={customer.id === selectedCustomer?.id ? selectedCustomer.contact_number : customer.contact_number}
                                        onChange={(e) => {
                                            const updatedCustomer = {...customer, contact_number: e.target.value};
                                            setSelectedCustomer(updatedCustomer);
                                        }}
                                        onBlur={() => handleUpdateCustomer()}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUpdateCustomer();
                                            }
                                        }}
                                    />
                                </td>
                                <td className="p-4 border-b border-gray-20">
                                    <button
                                        onClick={() => handleDeleteCustomer(customer.id)}
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

export default Customers;