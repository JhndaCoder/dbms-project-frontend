import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Waiters = () => {
    const { isLoading, data, error, isError } = useFetchResource('waiters');
    const { createResource: createWaiter, isLoading: isCreateWaiterLoading } = useCreateResource('waiters');
    const { editResource: editWaiter, isLoading: isEditWaiterLoading } = useEditResource('waiters');
    const { deleteResource: deleteWaiter, isLoading: isDeleteWaiterLoading } = useDeleteResource('waiters');

    const [newWaiter, setNewWaiter] = useState({
        waiter_fname: '',
        waiter_lname: '',
    });

    const [editWaiterData, setEditWaiterData] = useState({
        waiter_id: '',
        waiter_fname: '',
        waiter_lname: '',
    });

    const [deleteWaiterId, setDeleteWaiterId] = useState('');

    if (isLoading) {
        return <p style={{ margin: '1rem' }}>Loading.....</p>;
    }

    if (isError) {
        return <p style={{ margin: '1rem' }}>{error.response.data}</p>;
    }

    const onWaiterChange = (event) => {
        setNewWaiter({ ...newWaiter, [event.target.name]: event.target.value });
    };

    const onEditWaiterChange = (event) => {
        setEditWaiterData({ ...editWaiterData, [event.target.name]: event.target.value });
    };

    const handleCreateWaiterSubmit = (event) => {
        event.preventDefault();
        createWaiter(newWaiter, {
            onSuccess: () => {
                setNewWaiter({ waiter_id: '', waiter_fname: '', waiter_lname: '' });
            }
        });
    };

    const handleEditWaiterSubmit = (event) => {
        event.preventDefault();
        editWaiter({ id: editWaiterData.waiter_id, item: editWaiterData }, {
            onSuccess: () => {
                setEditWaiterData({ waiter_id: '', waiter_fname: '', waiter_lname: '' });
            }
        });
    };

    const handleDeleteWaiterSubmit = (event) => {
        event.preventDefault();
        deleteWaiter(deleteWaiterId);
        setDeleteWaiterId('');
    };

    return (
        <Fragment>
            {data?.length === 0 ? <h1>No waiters currently</h1> :
                <Fragment>
                    <h1 className="hero-title">List of all Waiters:</h1>
                    <div className="hero-main-wrapper"> 
                    {data.map(waiter => (
                        <div className="hero-main" key={waiter.waiter_id}>
                            <h1>{`${waiter.waiter_fname} ${waiter.waiter_lname}`}</h1>
                            <h2>Waiter ID: {waiter.waiter_id}</h2>
                        </div>
                    ))}
                    </div>
                    <br />
                </Fragment>
            }
            <div className="create-form">
                <h1>Create Waiter</h1>
                <form onSubmit={handleCreateWaiterSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="waiter_fname"
                        className="form-input"
                        value={newWaiter.waiter_fname}
                        onChange={onWaiterChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="waiter_lname"
                        className="form-input"
                        value={newWaiter.waiter_lname}
                        onChange={onWaiterChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateWaiterLoading}>
                        Add Waiter
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Waiter</h1>
                <form onSubmit={handleEditWaiterSubmit}>
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        name="waiter_id"
                        className="form-input"
                        value={editWaiterData.waiter_id}
                        onChange={onEditWaiterChange}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        name="waiter_fname"
                        className="form-input"
                        value={editWaiterData.waiter_fname}
                        onChange={onEditWaiterChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="waiter_lname"
                        className="form-input"
                        value={editWaiterData.waiter_lname}
                        onChange={onEditWaiterChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isEditWaiterLoading}>
                        Edit Waiter
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Delete Waiter</h1>
                <form onSubmit={handleDeleteWaiterSubmit}>
                    <input
                        type="text"
                        placeholder="Waiter ID"
                        value={deleteWaiterId}
                        onChange={(event) => setDeleteWaiterId(event.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isDeleteWaiterLoading}>
                        Delete Waiter
                    </button>
                </form>
            </div>

        </Fragment>
    );
};

export default Waiters;
