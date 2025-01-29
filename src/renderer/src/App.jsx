import React from "react";
import AddCustomerForm from "../components/AddCustomerForm.jsx";
import DeleteCustomerForm from "../components/DeleteCustomerForm.jsx";
import UpdateCustomerForm from "../components/UpdateCustomerForm.jsx";

function App() {
  return (
    <>
        <h1>Development Mode</h1>
        <AddCustomerForm></AddCustomerForm>
        <DeleteCustomerForm></DeleteCustomerForm>
        <UpdateCustomerForm></UpdateCustomerForm>
    </>
  )
}

export default App
