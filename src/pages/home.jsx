import React, { useState, useEffect } from 'react'
import Product from '../components/product.jsx'
import Control_Panel from '../components/control-panel-home.jsx';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/home.css'

function Home() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        if(Cookies.get('type') && Cookies.get('type') == 'Admin') {
            navigate('/admin_home')
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
                        <Product username={Cookies.get('username')} usertype={Cookies.get('type')} quantity={product.quantity} name={product.name} description={product.description} price={product.price} lnk={product.imageLink}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
