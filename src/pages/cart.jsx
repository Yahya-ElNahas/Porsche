import React, { useState, useEffect } from 'react';
import './styles/home.css';
import Control_Panel_Customer from '../components/control-panel-index-customer';
import Cookies from 'js-cookie';
import Product from '../components/product';
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [mycart, setCart] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        if(!Cookies.get('token')) {
            navigate('/login')
            return
        }
        if(Cookies.get('type') && Cookies.get('type') == 'Admin') {
            navigate('/admin_home')
            return
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/v1/api/Customers/:'+Cookies.get('username'), {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'token': Cookies.get('token')},
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setCart(data.cart)
            } catch (error) {
                window.alert('Error');
            }
        };
        fetchProducts();
    }, []);

    const clearCart = async () => {
        try {
            const response = await fetch('http://localhost:3001/v1/api/Customers/:'+Cookies.get('username'), {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'token': Cookies.get('token')},
                body: JSON.stringify({
                    cart: []
                })
            })
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();

            window.alert('Cart Cleared')
            navigate('/home')
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="home-body">
            <Control_Panel_Customer/>
            <div className='products-container'>
                <h1 className='products-title'>Cart</h1>
                    <button className='clr_cart_btn' type='button' style={{'margin-left':'100px'}} onClick={clearCart}>Clear Cart</button>
                <div className='products-main'>
                    {mycart.map(product => (
                        <Product name={product[0]} price={product[1]} lnk={product[2]}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
