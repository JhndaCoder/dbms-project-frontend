import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const Chefs = () => {
    const [newChef, setNewChef] = useState({
        chef_fname: '',
        chef_lname: '',
        chef_type: ''
    });

    const [editChef, setEditChef] = useState({
        chef_id: '',
        chef_fname: '',
        chef_lname: '',
        chef_type: ''
    });

    const [deleteChefId, setDeleteChefId] = useState('');

    const { createResource: createChef, isLoading: isCreateChefLoading } = useCreateResource('chefs');
    const { editResource: editChefMutation, isLoading: isEditChefLoading } = useEditResource('chefs');
    const { isLoading, data, error, isError } = useFetchResource('chefs');
    const { deleteResource: deleteChef, isLoading: isDeleteChefLoading } = useDeleteResource('chefs');

    const onChefChange = (event) => {
        setNewChef({ ...newChef, [event.target.name]: event.target.value });
    };

    const handleCreateChefSubmit = (event) => {
        event.preventDefault();
        createChef(newChef, {
            onSuccess: () => {
                setNewChef({ chef_fname: '', chef_lname: '', chef_type: '' });
            }
        });
    };

    const onEditChefChange = (event) => {
        setEditChef({ ...editChef, [event.target.name]: event.target.value });
    };

    const handleEditChefSubmit = (event) => {
        event.preventDefault();
        editChefMutation({ id: editChef.chef_id, item: editChef }, {
            onSuccess: () => {
                setEditChef({ chef_id: '', chef_fname: '', chef_lname: '', chef_type: '' });
            }
        });
    };

    const handleDeleteChefSubmit = (event) => {
        event.preventDefault();
        deleteChef(deleteChefId);
        setDeleteChefId('');
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
            <h1 className="hero-title">List of all Chefs:</h1>
            <div className="hero-main-wrapper"> 
            {data.map(chef => (
                <div className="hero-main" key={chef.chef_id}>
                    <h1>{chef.chef_id}</h1>
                    <h2>{chef.chef_fname} {chef.chef_lname}</h2>
                    <h2>Chef Type: {chef.chef_type}</h2>
                </div>
            ))}
            </div>
            <br />
            <div>
                <h1>Create Chef</h1>
                <form onSubmit={handleCreateChefSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="chef_fname"
                        className="form-input"
                        value={newChef.chef_fname}
                        onChange={onChefChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="chef_lname"
                        className="form-input"
                        value={newChef.chef_lname}
                        onChange={onChefChange}
                    />
                    <input
                        type="text"
                        placeholder="Chef Type"
                        name="chef_type"
                        className="form-input"
                        value={newChef.chef_type}
                        onChange={onChefChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateChefLoading}>
                        Add Chef
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Chefs</h1>
                <form onSubmit={handleEditChefSubmit}>
                    <input type="text" placeholder="Chef ID" name="chef_id" value={editChef.chef_id} onChange={onEditChefChange} />
                    <input type="text" placeholder="First Name" name="chef_fname" value={editChef.chef_fname} onChange={onEditChefChange} />
                    <input type="text" placeholder="Last Name" name="chef_lname" value={editChef.chef_lname} onChange={onEditChefChange} />
                    <input type="text" placeholder="Chef Type" name="chef_type" value={editChef.chef_type} onChange={onEditChefChange} />
                    <button type="submit" value="Edit Chef" className="btn" disabled={isEditChefLoading} >Edit Bills</button>
                </form>
            </div>
            <br />
            <div>
                <h4>Delete Chef</h4>
                <form onSubmit={handleDeleteChefSubmit}>
                    <input type="text" placeholder="Chef ID" value={deleteChefId} onChange={(event) => setDeleteChefId(event.target.value)} />
                    <button type="submit" className="btn" disabled={isDeleteChefLoading}>
                        Delete Chef
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Chefs;
