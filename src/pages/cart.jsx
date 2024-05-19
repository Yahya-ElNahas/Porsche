import React, { useState, useEffect } from 'react';
import './styles/cart.css';
import Control_Panel_Admin from '../components/control-panel-profile-admin';
import Control_Panel_Customer from '../components/control-panel-profile';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const username = Cookies.get('username');
    const type = Cookies.get('type');
    const navigate = useNavigate();
    const [userdata, setUserData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/v1/api/${type}s/:${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': '' + Cookies.get('token')
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching data`);
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            window.alert('Error fetching data');
        }
    };

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [username]);

    const removeFromCart = async () => {
        try {
            const response = await fetch(`http://localhost:3001/v1/api/removeFromCart`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': Cookies.get('token')
                },
                body: JSON.stringify({
                    cart: [],
                    username: username
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to remove items from cart');
            }
    
            // Refetch userdata to update the cart
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {type === 'Admin' ? <Control_Panel_Admin /> : <Control_Panel_Customer />}
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-header">{username}'s Cart</div>
                    <div className="profile-info">
                        {userdata && (
                            <>
                                {type !== 'Admin' && (
                                    <>
                                        {userdata.cart && userdata.cart.length > 0 && (
                                            <form>
                                                
                                               
                                                    {userdata.cart.map((item, index) => (
                                                        <li key={item._id}>
                                                            {index + 1} Name: {item.name} Price: {item.price}
                                                            <button className="remove-button" onClick={() => removeFromCart(item.product_id)}>Remove from Cart</button>
                                                        </li>
                                                    ))}
                                               
                                               
                                            </form>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
