import React, { useState, useEffect } from 'react'
import Customer from '../components/Customer.jsx';
import Control_Panel from '../components/control-panel-manage_customers.jsx';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/home.css'

export default function ManageCustomers() {
    const [customers, setCustomers] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Admin') {
            navigate('/porsche')
            return
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/v1/api/Customers', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'token': ''+Cookies.get('token')},
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data.Customers); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-body">
            <Control_Panel/>
            <div className='products-container'>
                <h1 className='products-title'>Customers</h1>
                <div className='products-main'>
                    {customers.map(customer => (
                        <Customer customer={customer}/>
                    ))}
                </div>
            </div>
        </div>
    );
}