import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-admin_home';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles/addProduct.css';

export default function DeleteCustomer() {
    const [customerUsername, setCustomerUsername] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Customers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                },
                body: JSON.stringify({
                    username: customerUsername
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const data = await response.json();
            window.alert('Success')
            navigate('/manage_customers')
        } catch (error) {
            window.alert('Error');
            navigate('/manage_customers')
        }
    };

    return (
        <div className='addProduct-body'>
            <header>
                <Control_Panel />
                <main className="main">
                    <div className="lr-form">
                        <div className="container">
                            <h1 className="hdr">Delete Customer</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="username">Customer Username</label>
                                    <input type="text" name="customerUsername" id="customerUsername" className='lbox' value={customerUsername} onChange={(e) => setCustomerUsername(e.target.value)} required/>
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
