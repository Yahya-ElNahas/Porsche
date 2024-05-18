import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-admin_home';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/addProduct.css';

export default function AddProduct() {
    
    let navigate = useNavigate()

    useEffect(() => {
        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Admin') {
            navigate('/porsche')
            return
        }
    }, []);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Products', {
                method: 'POST',
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
                throw new Error(response);
            }

            const data = await response.json();
            window.alert('Product added:');
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
                            <h1 className="hdr">Add Product</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" className='lbox' value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="number">Quantity</label>
                                        <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="imageLink">Image link</label>
                                    <input type="url" name="imageLink" id="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn">Add</button>
                            </form>
                        </div>
                    </div>
                </main>
            </header>
        </div>
    );
}
