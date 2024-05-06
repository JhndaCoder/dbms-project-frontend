import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Customers = () => {
    const [newCustomer, setNewCustomer] = useState({
        cust_fname: '',
        cust_lname: '',
        contact_no: ''
    });

    const [editCustomer, setEditCustomer] = useState({
        cust_id: '',
        cust_fname: '',
        cust_lname: '',
        contact_no: ''
    });

    const [deleteCustomerId, setDeleteCustomerId] = useState('');

    const { createResource: createCustomer, isLoading: isCreateCustomerLoading } = useCreateResource('customers');
    const { editResource: editCustomerMutation, isLoading: isEditCustomerLoading } = useEditResource('customers');
    const { isLoading, data, error, isError } = useFetchResource('customers');
    const { deleteResource: deleteCustomer, isLoading: isDeleteCustomerLoading } = useDeleteResource('customers');

    const onCustomerChange = (event) => {
        setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
    };

    const handleCreateCustomerSubmit = (event) => {
        event.preventDefault();
        createCustomer(newCustomer, {
            onSuccess: () => {
                setNewCustomer({ cust_fname: '', cust_lname: '', contact_no: '' });
            }
        });
    };

    const onEditCustomerChange = (event) => {
        setEditCustomer({ ...editCustomer, [event.target.name]: event.target.value });
    };

    const handleEditCustomerSubmit = (event) => {
        event.preventDefault();
        editCustomerMutation({ id: editCustomer.cust_id, item: editCustomer }, {
            onSuccess: () => {
                setEditCustomer({ cust_id: '', cust_fname: '', cust_lname: '', contact_no: '' });
            }
        });
    };

    const handleDeleteCustomerSubmit = (event) => {
        event.preventDefault();
        deleteCustomer(deleteCustomerId);
        setDeleteCustomerId('');
    };

    if (isLoading) {
        return <p style={{ margin: '1rem' }}>Loading.....</p>;
    }

    if (isError) {
        return <p style={{ margin: '1rem' }}>{error.response.data}</p>;
    }

    return (
        <Fragment>
            {console.log(data)}
            <h1 className="hero-title">List of all Customers:</h1>
            <div className="hero-main-wrapper">    {data.map(customer => (
                <div className="hero-main" key={customer.cust_id}>
                    <p><span>Customer ID:</span>{customer.cust_id}</p>
                    <p><span>Customer Name:</span> {customer.cust_fname} {customer.cust_lname}</p>
                    <p><span>Contact No :</span> {customer.contact_no}</p>
                </div>
            ))}</div>
            <br />
            <div className="create-form">
                <h1>Create Customer</h1>
                <form onSubmit={handleCreateCustomerSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="cust_fname"
                        className="form-input"
                        value={newCustomer.cust_fname}
                        onChange={onCustomerChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="cust_lname"
                        className="form-input"
                        value={newCustomer.cust_lname}
                        onChange={onCustomerChange}
                    />
                    <input
                        type="text"
                        placeholder="Contact No."
                        name="contact_no"
                        className="form-input"
                        value={newCustomer.contact_no}
                        onChange={onCustomerChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateCustomerLoading}>
                        Add Customer
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Customers</h1>
                <form onSubmit={handleEditCustomerSubmit}>
                    <input type="text" placeholder="Customer ID" name="cust_id" value={editCustomer.cust_id} onChange={onEditCustomerChange} />
                    <input type="text" placeholder="First Name" name="cust_fname" value={editCustomer.cust_fname} onChange={onEditCustomerChange} />
                    <input type="text" placeholder="Last Name" name="cust_lname" value={editCustomer.cust_lname} onChange={onEditCustomerChange} />
                    <input type="text" placeholder="Contact No." name="contact_no" value={editCustomer.contact_no} onChange={onEditCustomerChange} />
                    <button type="submit" value="Edit Customer" className="btn" disabled={isEditCustomerLoading}>Edit Customer</button>
                </form>
            </div>
            <br />
            <div>
                <h1>Delete Customer</h1>
                <form onSubmit={handleDeleteCustomerSubmit}>
                    <input type="text" placeholder="Customer ID" value={deleteCustomerId} onChange={(event) => setDeleteCustomerId(event.target.value)} />
                    <button type="submit" className="btn" disabled={isDeleteCustomerLoading}>
                        Delete Customer
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Customers;
