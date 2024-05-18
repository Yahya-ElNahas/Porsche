import React, { useState, useEffect } from 'react'
import Product from '../components/product.jsx'
import Control_Panel from '../components/control-panel-home.jsx';
import Cookies from 'js-cookie';
import './styles/home.css'

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Customer') {
            navigate('/porsche')
            return
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/v1/api/Products', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.Products); 
            } catch (error) {
                window.alert('Error');
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="home-body">
            <Control_Panel/>
            <div className='products-container'>
                <h1 className='products-title'>Products</h1>
                <div className='products-main'>
                    {products.map(product => (
                        <Product key={product.id} name={product.name} price={product.price}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
