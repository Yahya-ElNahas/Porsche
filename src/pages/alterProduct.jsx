import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-admin_home';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles/addProduct.css';

export default function AlterProduct() {
    const [name, setName] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [quantity, setQuantity] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Products/:'+productName, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: '$'+price,
                    quantity: quantity,
                    imageLink: imageLink
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const data = await response.json();
            window.alert('Success')
            navigate('/admin_home')
        } catch (error) {
            window.alert('Error');
            navigate('/admin_home')
        }
    };

    return (
        <div className='addProduct-body'>
            <header>
                <Control_Panel />
                <main className="main">
                    <div className="lr-form">
                        <div className="container">
                            <h1 className="hdr">Edit Product</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <label htmlFor="name">Product Name</label>
                                        <input type="text" name="productname" id="productname" className='lbox' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                    </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="name">New Name</label>
                                        <input type="text" name="name" id="name" className='lbox' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="number">Quantity</label>
                                        <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="imageLink">Image link</label>
                                    <input type="url" name="imageLink" id="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <button type="submit" className="btn">Confirm</button>
                            </form>
                        </div>
                    </div>
                </main>
            </header>
        </div>
    );
}
