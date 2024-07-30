import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemForm = () => {
    const [itemData, setItemData] = useState({
        name: '',
        description: '',
        price: '',
        categories: { main: '', sub: '' },
        images: []
    });

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'main' || name === 'sub') {
            setItemData(prevState => ({
                ...prevState,
                categories: { ...prevState.categories, [name]: value }
            }));
        } else if (name === 'images') {
            setItemData(prevState => ({
                ...prevState,
                images: value.split(',').map(img => img.trim()).filter(img => img)
            }));
        } else {
            setItemData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting data:', itemData);
        try {
            const response = await axios.post('http://localhost:5000/api/items', itemData);
            alert('Item added successfully!');
            setItemData({
                name: '',
                description: '',
                price: '',
                categories: { main: '', sub: '' },
                images: []
            });
        } catch (error) {
            console.error('Failed to add item:', error);
            alert(`Failed to add item: ${error.response.data.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="name" name="name" value={itemData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea className="form-control" id="description" name="description" value={itemData.description} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input type="number" className="form-control" id="price" name="price" value={itemData.price} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="main" className="form-label">Main Category:</label>
                            <input type="text" className="form-control" id="main" name="main" value={itemData.categories.main} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sub" className="form-label">Sub Category:</label>
                            <input type="text" className="form-control" id="sub" name="sub" value={itemData.categories.sub} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Images (comma-separated URLs):</label>
                            <input type="text" className="form-control" id="images" name="images" value={itemData.images.join(',')} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;
