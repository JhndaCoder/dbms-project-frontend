import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Bills = () => {
    const [newBill, setNewBill] = useState({
        tot_price: '',
        tax: '',
        discount: '',
        ord_no: ''
    });

    const [editBill, setEditBill] = useState({
        bill_no: '',
        tot_price: '',
        tax: '',
        discount: '',
        ord_no: ''
    });

    const [deleteBillNo, setDeleteBillNo] = useState('');

    const { createResource: createBill, isLoading: isCreateBillLoading } = useCreateResource('bills');
    const { editResource: editBillMutation, isLoading: isEditBillLoading } = useEditResource('bills');
    const { isLoading, data, error, isError } = useFetchResource('bills');
    const { deleteResource: deleteBill, isLoading: isDeleteBillLoading } = useDeleteResource('bills');

    const onBillChange = (event) => {
        const { name, value } = event.target;
        setNewBill({ ...newBill, [name]: value });
    };

    const handleCreateBillSubmit = (event) => {
        event.preventDefault();
        const net_payable = (parseFloat(newBill.tot_price) + (parseFloat(newBill.tot_price) * parseFloat(newBill.tax) / 100) - (parseFloat(newBill.tot_price) * parseFloat(newBill.discount) / 100)).toFixed(2);
        const newBillData = {
            ...newBill,
            tot_price: parseFloat(newBill.tot_price),
            tax: parseFloat(newBill.tax),
            discount: parseFloat(newBill.discount),
            ord_no: parseFloat(newBill.ord_no),
            net_payable: parseFloat(net_payable)
        };
        createBill(newBillData, {
            onSuccess: () => {
                setNewBill({ tot_price: '', tax: '', discount: '', ord_no: '' });
            }
        });
    };

    const onEditBillChange = (event) => {
        const { name, value } = event.target;
        setEditBill({ ...editBill, [name]: value });
    };

    const handleEditBillSubmit = (event) => {
        event.preventDefault();
        const net_payable = (parseFloat(editBill.tot_price) + (parseFloat(editBill.tot_price) * parseFloat(editBill.tax) / 100) - (parseFloat(editBill.tot_price) * parseFloat(editBill.discount) / 100)).toFixed(2);
        const editedBillData = {
            ...editBill,
            tot_price: parseFloat(editBill.tot_price),
            tax: parseFloat(editBill.tax),
            discount: parseFloat(editBill.discount),
            ord_no: parseFloat(editBill.ord_no),
            net_payable: parseFloat(net_payable)
        };
        editBillMutation({ id: editBill.bill_no, item: editedBillData }, {
            onSuccess: () => {
                setEditBill({ bill_no: '', tot_price: '', tax: '', discount: '', ord_no: '' });
            }
        });
    };

    const handleDeleteBillSubmit = (event) => {
        event.preventDefault();
        deleteBill(deleteBillNo);
        setDeleteBillNo('');
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
            <h1 className="hero-title">List of all Bills:</h1>
            <div className="hero-main-wrapper"> 
            {data.map(bill => (
                <div className="hero-main" key={bill.bill_no}>
                    <p><span>Bill No:</span>{bill.bill_no}</p>
                    <p><span>Total Price:</span> {bill.tot_price}</p>
                    <p><span>Tax:</span> {bill.tax}</p>
                    <p><span>Discount:</span> {bill.discount}</p>
                    <p><span>Net Payable:</span> {bill.net_payable}</p>
                    <p><span>Order No:</span> {bill.ord_no}</p>
                </div>
            ))}
            </div>
            <br />
            <div className="create-form">
                <h1>Create Bill</h1>
                <form onSubmit={handleCreateBillSubmit}>
                    <input
                        type="text"
                        placeholder="Total Price"
                        name="tot_price"
                        className="form-input"
                        value={newBill.tot_price}
                        onChange={onBillChange}
                    />
                    <input
                        type="text"
                        placeholder="Tax"
                        name="tax"
                        className="form-input"
                        value={newBill.tax}
                        onChange={onBillChange}
                    />
                    <input
                        type="text"
                        placeholder="Discount"
                        name="discount"
                        className="form-input"
                        value={newBill.discount}
                        onChange={onBillChange}
                    />
                    <input
                        type="text"
                        placeholder="Order No"
                        name="ord_no"
                        className="form-input"
                        value={newBill.ord_no}
                        onChange={onBillChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateBillLoading}>
                        Add Bill
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Bills</h1>
                <form onSubmit={handleEditBillSubmit}>
                    <input type="text" placeholder="Bill No." name="bill_no" value={editBill.bill_no} onChange={onEditBillChange} />
                    <input type="text" placeholder="Total Price" name="tot_price" value={editBill.tot_price} onChange={onEditBillChange} />
                    <input type="text" placeholder="Tax" name="tax" value={editBill.tax} onChange={onEditBillChange} />
                    <input type="text" placeholder="Discount" name="discount" value={editBill.discount} onChange={onEditBillChange} />
                    <input type="text" placeholder="Order No" name="ord_no" value={editBill.ord_no} onChange={onEditBillChange} />
                    <button type="submit" value="Edit Bill" className="btn" disabled={isEditBillLoading} >Edit Bill</button>
                </form>
            </div>
            <br />
            <div>
                <h1>Delete Bill</h1>
                <form onSubmit={handleDeleteBillSubmit}>
                    <input type="text" placeholder="Bill No." value={deleteBillNo} onChange={(event) => setDeleteBillNo(event.target.value)} />
                    <button type="submit" className="btn" disabled={isDeleteBillLoading}>
                        Delete Bill
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Bills;
