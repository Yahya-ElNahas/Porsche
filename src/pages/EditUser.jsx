import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Control_Panel from '../components/control-panel-register';
import Cookies from 'js-cookie';
import './styles/register.css';

export default function EditUser() {
    const username = Cookies.get("username")
    const type = Cookies.get('type')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        
        if(!Cookies.get('token') || !Cookies.get('type')) {
            navigate('/porsche')
            return
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updates = {};

        if (firstName) updates.first_name = firstName;
        if (lastName) updates.last_name = lastName;
        if (mobileNumber) updates.mobile_numbers = [mobileNumber];
        if (password) updates.password = password;
        
        try {
            const response = await fetch(`http://localhost:3001/v1/api/Customers/:${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token':'' + Cookies.get("token")
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            console.log(type)
            navigate("../profile")
           
        } catch (error) {
            console.log(error)            
        }
    };

    return (
        <div className='register-login'>
            <header>
                <Control_Panel />
                <main className="main">
                    <div className="lr-form">
                        <div className="container">
                            <h1 className="hdr">Edit User</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                </div>
                                <div className="input-row">
                                    {
                                        type == 'Customers' &&(<>
                                        <div className="input-group">
                                        <label htmlFor="first-name">First Name</label>
                                        <input type="text" name="first-name" id="first-name" className='lbox' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                    <label htmlFor="mobile-number">Mobile Number</label>
                                    <input type="tel" name="mobile-number" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div></>)
                                    }
                                </div> 
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="tel" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn">Update</button>
                            </form>
                        </div>
                    </div>
                </main>
            </header>
        </div>
    );
}
