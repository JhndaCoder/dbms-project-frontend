import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Orders = () => {
    const { isLoading, data, error, isError } = useFetchResource('orders');
    const { createResource: createOrder, isLoading: isCreateOrderLoading } = useCreateResource('orders');
    const { editResource: editOrder, isLoading: isEditOrderLoading } = useEditResource('orders');
    const { deleteResource: deleteOrder, isLoading: isDeleteOrderLoading } = useDeleteResource('orders');

    const [newOrder, setNewOrder] = useState({
        ord_no: '',
        waiter_id: '',
        cust_id: '',
        ord_date: '',
    });

    const [editOrderData, setEditOrderData] = useState({
        ord_no: '',
        waiter_id: '',
        cust_id: '',
    });

    const [deleteOrderId, setDeleteOrderId] = useState('');

    if (isLoading) {
        return <p style={{ margin: '1rem' }}>Loading.....</p>;
    }

    if (isError) {
        return <p style={{ margin: '1rem' }}>{error.response.data}</p>;
    }

    const onOrderChange = (event) => {
        setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
        console.log(newOrder);
    };

    const onEditOrderChange = (event) => {
        setEditOrderData({ ...editOrderData, [event.target.name]: event.target.value });
    };

    const handleCreateOrderSubmit = (event) => {
        event.preventDefault();
        createOrder(newOrder, {
            onSuccess: () => {
                setNewOrder({ waiter_id: '', cust_id: '' });
            }
        });
    };

    const handleEditOrderSubmit = (event) => {
        event.preventDefault();
        editOrder({ id: editOrderData.ord_no, item: editOrderData }, {
            onSuccess: () => {
                setEditOrderData({ ord_no: '', waiter_id: '', cust_id: '' });
            }
        });
    };

    const handleDeleteOrderSubmit = (event) => {
        event.preventDefault();
        deleteOrder(deleteOrderId);
        setDeleteOrderId('');
    };

    return (
        <Fragment>
            {console.log(data)}
            {data?.length === 0 ? <h1>No orders currently</h1> :
                <Fragment>
                    <h1 className="hero-title">List of all Orders:</h1>
                    <div className="hero-main-wrapper">
                        {data?.map(order => (
                            <div className="hero-main" key={order.ord_no}>
                                <p><span>Order No:</span>{order.ord_no}</p>
                                <p><span>Date:</span> {order.ord_date}</p>
                                <p><span>Waiter ID:</span> {order.waiter_id}</p>
                                <p><span>Customer ID:</span> {order.cust_id}</p>
                            </div>
                        ))}
                    </div>
                    <br />
                </Fragment>
            }
            <div className="create-form">
                <h1>Create Order</h1>
                <form onSubmit={handleCreateOrderSubmit}>
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={newOrder.waiter_id}
                        onChange={onOrderChange}
                    />
                    <input
                        type="text"
                        placeholder="Customer ID"
                        name="cust_id"
                        className="form-input"
                        value={newOrder.cust_id}
                        onChange={onOrderChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateOrderLoading}>
                        Add Order
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Order</h1>
                <form onSubmit={handleEditOrderSubmit}>
                    <input
                        type="text"
                        placeholder="Order No."
                        name="ord_no"
                        className="form-input"
                        value={editOrderData.ord_no}
                        onChange={onEditOrderChange}
                    />
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={editOrderData.waiter_id}
                        onChange={onEditOrderChange}
                    />
                    <input
                        type="text"
                        placeholder="Customer ID"
                        name="cust_id"
                        className="form-input"
                        value={editOrderData.cust_id}
                        onChange={onEditOrderChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isEditOrderLoading}>
                        Edit Order
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Delete Order</h1>
                <form onSubmit={handleDeleteOrderSubmit}>
                    <input
                        type="text"
                        placeholder="Order No."
                        value={deleteOrderId}
                        onChange={(event) => setDeleteOrderId(event.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isDeleteOrderLoading}>
                        Delete Order
                    </button>
                </form>
            </div>

        </Fragment>
    );
};

export default Orders;
