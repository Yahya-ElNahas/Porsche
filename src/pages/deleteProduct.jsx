import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-admin_home';
import { Link, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles/addProduct.css';

export default function DeleteProduct() {

    const [productName, setProductName] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Admin') {
            navigate('/porsche')
            return
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(productName)
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Products', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                },
                body: JSON.stringify({
                    name: productName
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
                            <h1 className="hdr">Remove Product</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input type="text" name="productname" id="productname" className='lbox' value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                                </div>
                                <button type="submit" className="btn">Delete</button>
                            </form>
                        </div>
                    </div>
                </main>
            </header>
        </div>
    );
}
