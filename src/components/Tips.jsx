import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Tips = () => {
    const [newTip, setNewTip] = useState({
        cust_id: '',
        waiter_id: '',
        tip: ''
    });

    const [editTip, setEditTip] = useState({
        cust_id: '',
        waiter_id: '',
        tip: ''
    });

    const [deleteTip, setDeleteTip] = useState({
        cust_id: '',
        waiter_id: ''
    });

    const { createResource: createTip, isLoading: isCreateTipLoading } = useCreateResource('tips');
    const { editResource: editTipMutation, isLoading: isEditTipLoading } = useEditResource('tips');
    const { isLoading, data, error, isError } = useFetchResource('tips');
    const { deleteResource: deleteTipMutation, isLoading: isDeleteTipLoading } = useDeleteResource('tips');

    const onTipChange = (event) => {
        setNewTip({ ...newTip, [event.target.name]: event.target.value });
    };

    const handleCreateTipSubmit = (event) => {
        event.preventDefault();
        createTip({
            cust_id: parseInt(newTip.cust_id),
            waiter_id: parseInt(newTip.waiter_id),
            tip: parseFloat(newTip.tip)
        }, {
            onSuccess: () => {
                setNewTip({ cust_id: '', waiter_id: '', tip: '' });
            }
        });
    };

    const onEditTipChange = (event) => {
        setEditTip({ ...editTip, [event.target.name]: event.target.value });
    };

    const handleEditTipSubmit = (event) => {
        event.preventDefault();
        editTipMutation({
            id: { cust_id: parseInt(editTip.cust_id), waiter_id: parseInt(editTip.waiter_id) },
            item: {
                cust_id: parseInt(editTip.cust_id),
                waiter_id: parseInt(editTip.waiter_id),
                tip: parseFloat(editTip.tip)
            }
        }, {
            onSuccess: () => {
                setEditTip({ cust_id: '', waiter_id: '', tip: '' });
            }
        });
    };

    const handleDeleteTipSubmit = (event) => {
        event.preventDefault();
        deleteTipMutation({
            cust_id: parseInt(deleteTip.cust_id),
            waiter_id: parseInt(deleteTip.waiter_id)
        });
        setDeleteTip({ cust_id: '', waiter_id: '' });
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
            <h1 className="hero-title">List of all Tips:</h1>
            <div className="hero-main-wrapper">
            {data.map(tip => (
                <div className="hero-main" key={`${tip.cust_id}-${tip.waiter_id}`}>
                    <h2>Customer ID: {tip.cust_id}</h2>
                    <h2>Waiter ID: {tip.waiter_id}</h2>
                    <h2>Tip: {tip.tip}</h2>
                </div>
            ))}
            </div>
            <br />
            <div className="create-form">
                <h1>Create Tip</h1>
                <form onSubmit={handleCreateTipSubmit}>
                    <input
                        type="text"
                        placeholder="Customer ID"
                        name="cust_id"
                        className="form-input"
                        value={newTip.cust_id}
                        onChange={onTipChange}
                    />
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={newTip.waiter_id}
                        onChange={onTipChange}
                    />
                    <input
                        type="text"
                        placeholder="Tip"
                        name="tip"
                        className="form-input"
                        value={newTip.tip}
                        onChange={onTipChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateTipLoading}>
                        Add Tip
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Tip</h1>
                <form onSubmit={handleEditTipSubmit}>
                    <input
                        type="text"
                        placeholder="Customer ID"
                        name="cust_id"
                        className="form-input"
                        value={editTip.cust_id}
                        onChange={onEditTipChange}
                    />
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={editTip.waiter_id}
                        onChange={onEditTipChange}
                    />
                    <input
                        type="text"
                        placeholder="Tip"
                        name="tip"
                        className="form-input"
                        value={editTip.tip}
                        onChange={onEditTipChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isEditTipLoading}>
                        Edit Tip
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h4>Delete Tip</h4>
                <form onSubmit={handleDeleteTipSubmit}>
                    <input
                        type="text"
                        placeholder="Customer ID"
                        name="cust_id"
                        className="form-input"
                        value={deleteTip.cust_id}
                        onChange={(event) => setDeleteTip({ ...deleteTip, cust_id: event.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={deleteTip.waiter_id}
                        onChange={(event) => setDeleteTip({ ...deleteTip, waiter_id: event.target.value })}
                    />
                    <button type="submit" className="btn" disabled={isDeleteTipLoading}>
                        Delete Tip
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Tips;
