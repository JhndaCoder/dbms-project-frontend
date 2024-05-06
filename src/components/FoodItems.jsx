import { Fragment, useState } from "react";
import {
    useCreateResource,
    useEditResource,
    useFetchResource,
    useDeleteResource
} from "../hooks/ReactQueryCustomHooks";

const FoodItems = () => {
    const [newFoodItem, setNewFoodItem] = useState({
        item_name: '',
        item_type: '',
        item_price: '',
        item_stock: '',
        chef_id: ''
    });

    const [editFoodItem, setEditFoodItem] = useState({
        item_no: '',
        item_name: '',
        item_type: '',
        item_price: '',
        item_stock: '',
        chef_id: ''
    });

    const [deleteFoodItemId, setDeleteFoodItemId] = useState('');

    const { createResource: createFoodItem, isLoading: isCreateFoodItemLoading } = useCreateResource('foods');
    const { editResource: editFoodItemMutation, isLoading: isEditFoodItemLoading } = useEditResource('foods');
    const { isLoading, data, error, isError } = useFetchResource('foods');
    const { deleteResource: deleteFoodItem, isLoading: isDeleteFoodItemLoading } = useDeleteResource('foods');

    const onFoodItemChange = (event) => {
        const { name, value } = event.target;
        setNewFoodItem({ ...newFoodItem, [name]: value });
    };

    const handleCreateFoodItemSubmit = (event) => {
        event.preventDefault();
        const newItem = {
            ...newFoodItem,
            item_price: parseFloat(newFoodItem.item_price), // Convert to number
            item_stock: parseInt(newFoodItem.item_stock), // Convert to number
            chef_id: parseInt(newFoodItem.chef_id) // Convert to number
        };
        createFoodItem(newItem, {
            onSuccess: () => {
                setNewFoodItem({ item_name: '', item_type: '', item_price: '', item_stock: '', chef_id: '' });
            }
        });
    };

    const onEditFoodItemChange = (event) => {
        const { name, value } = event.target;
        setEditFoodItem({ ...editFoodItem, [name]: value });
    };

    const handleEditFoodItemSubmit = (event) => {
        event.preventDefault();
        const editedItem = {
            ...editFoodItem,
            item_price: parseFloat(editFoodItem.item_price), // Convert to number
            item_stock: parseInt(editFoodItem.item_stock), // Convert to number
            chef_id: parseInt(editFoodItem.chef_id) // Convert to number
        };
        editFoodItemMutation({ id: editFoodItem.item_no, item: editedItem }, {
            onSuccess: () => {
                setEditFoodItem({ item_no: '', item_name: '', item_type: '', item_price: '', item_stock: '', chef_id: '' });
            }
        });
    };

    const handleDeleteFoodItemSubmit = (event) => {
        event.preventDefault();
        deleteFoodItem(deleteFoodItemId);
        setDeleteFoodItemId('');
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
            <h1 className="hero-title">List of all Food Items:</h1>
            <div className="hero-main-wrapper"> 
            {data.map(foodItem => (
                <div className="hero-main" key={foodItem.item_no}>
                    <h1>{foodItem.item_no}</h1>
                    <h2>Name: {foodItem.item_name}</h2>
                    <h2>Type: {foodItem.item_type}</h2>
                    <h2>Price: {foodItem.item_price}</h2>
                    <h2>Stock: {foodItem.item_stock}</h2>
                    <h2>Chef ID: {foodItem.chef_id}</h2>
                </div>
            ))}
            </div>
            <br />
            <div className="create-form">
                <h1>Create Food Item</h1>
                <form onSubmit={handleCreateFoodItemSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="item_name"
                        className="form-input"
                        value={newFoodItem.item_name}
                        onChange={onFoodItemChange}
                    />
                    <input
                        type="text"
                        placeholder="Type"
                        name="item_type"
                        className="form-input"
                        value={newFoodItem.item_type}
                        onChange={onFoodItemChange}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        name="item_price"
                        className="form-input"
                        value={newFoodItem.item_price}
                        onChange={onFoodItemChange}
                    />
                    <input
                        type="text"
                        placeholder="Stock"
                        name="item_stock"
                        className="form-input"
                        value={newFoodItem.item_stock}
                        onChange={onFoodItemChange}
                    />
                    <input
                        type="text"
                        placeholder="Chef ID"
                        name="chef_id"
                        className="form-input"
                        value={newFoodItem.chef_id}
                        onChange={onFoodItemChange}
                    />
                    <br />
                    <button type="submit" className="btn" disabled={isCreateFoodItemLoading}>
                        Add Food Item
                    </button>
                </form>
            </div>
            <br />
            <div>
                <h1>Edit Food Items</h1>
                <form onSubmit={handleEditFoodItemSubmit}>
                    <input type="text" placeholder="Item No." name="item_no" value={editFoodItem.item_no} onChange={onEditFoodItemChange} />
                    <input type="text" placeholder="Name" name="item_name" value={editFoodItem.item_name} onChange={onEditFoodItemChange} />
                    <input type="text" placeholder="Type" name="item_type" value={editFoodItem.item_type} onChange={onEditFoodItemChange} />
                    <input type="text" placeholder="Price" name="item_price" value={editFoodItem.item_price} onChange={onEditFoodItemChange} />
                    <input type="text" placeholder="Stock" name="item_stock" value={editFoodItem.item_stock} onChange={onEditFoodItemChange} />
                    <input type="text" placeholder="Chef ID" name="chef_id" value={editFoodItem.chef_id} onChange={onEditFoodItemChange} />
                    <button type="submit" value="Edit Food Item" className="btn" disabled={isEditFoodItemLoading} >Edit Food Item</button>
                </form>
            </div>
            <br />
            <div>
                <h1>Delete Food Item</h1>
                <form onSubmit={handleDeleteFoodItemSubmit}>
                    <input type="text" placeholder="Item No." value={deleteFoodItemId} onChange={(event) => setDeleteFoodItemId(event.target.value)} />
                    <button type="submit" className="btn" disabled={isDeleteFoodItemLoading}>
                        Delete Food Item
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default FoodItems;
