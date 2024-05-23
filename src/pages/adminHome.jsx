import React, { useState, useEffect } from 'react'
import Product from '../components/product.jsx'
import Control_Panel from '../components/control-panel-admin_home.jsx';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/home.css'

function AdminHome() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {

        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Admin') {
            navigate('/porsche')
            return
        }

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/v1/api/Products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': ''+Cookies.get('token')
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.Products); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-body">
            <Control_Panel flag={true}/>
            <div className='products-container'>
                <h1 className='products-title'>Products</h1>
                <div className='products-main'>
                    {products.map(product => (
                        <Product key={product.id} name={product.name} quantity={product.quantity} price={product.price} description={product.description} lnk={product.imageLink}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
