import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Control_Panel_Admin from '../components/control-panel-profile-admin';
import Control_Panel_Customer from '../components/control-panel-profile';
import Cookies from 'js-cookie';
import './styles/register.css';

export default function EditUser() {
    const username = Cookies.get("username")
    const type = Cookies.get('type')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [numbers, setNum] = useState('');
    const [addresses, setAdrs] = useState('');

    
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/v1/api/Customers/:${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const data = await response.json();
            setNum(data.mobile_numbers)
            setAdrs(data.addresses)           
        } catch (error) {
            window.alert('error')            
        }
    }

    useEffect(() => {
        
        if(!Cookies.get('token') || !Cookies.get('type')) {
            navigate('/porsche')
            return
        }
        fetchData()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updates = {};

        if (firstName) updates.first_name = firstName;
        if (lastName) updates.last_name = lastName;
        if (numbers) updates.numbers = numbers;
        if (password) updates.password = password;
        if (addresses) updates.addresses = addresses;

        console.log(updates)
        
        try {
            const response = await fetch(`http://localhost:3001/v1/api/Customers/:${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            navigate("/profile")
           
        } catch (error) {
            console.log(error)            
        }
    };

    const ptch = async () => {
        const updates = {};
        if (firstName) updates.first_name = firstName;
        if (lastName) updates.last_name = lastName;
        if (numbers) updates.mobile_numbers = numbers;
        if (password) updates.password = password;
        if (addresses) updates.addresses = addresses;
        try {
            const response = await fetch(`http://localhost:3001/v1/api/Customers/:${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'token': ''+Cookies.get('token')
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
            navigate("/profile")
           
        } catch (error) {
            navigate("/profile")          
        }
    }

    const addNumber = async () => {
        if(!mobileNumber || mobileNumber == '') return
        numbers.push(mobileNumber)
        await ptch()
    }

    const removeNumber = async () => {
        if(!mobileNumber || mobileNumber == '') return
        let i = 0
        while(i < numbers.length && numbers[i] != mobileNumber) i++
        numbers.splice(i, 1)
        await ptch()
    }
    
    const addAddress = async () => {
        if(!address || address == '') return
        addresses.push(address)
        await ptch()
    }

    const removeAddress = async () => {
        if(!address || address == '') return
        let i = 0
        while(i < addresses.length && addresses[i] != address) i++
        console.log(addresses[0])
        addresses.splice(i, 1)
        await ptch()
    }

    return (
        <div className='register-login'>
            <header>
            {type == 'Admin' && (
              <Control_Panel_Admin/>
            )}
            {type != 'Admin' && (
              <Control_Panel_Customer/>
            )}
                <main className="main">
                    <div className="lr-form">
                        <div className="container">
                            <h1 className="hdr">Edit User</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                    {
                                        type == 'Customer' &&(<>
                                            <div className="input-row">
                                        <div className="input-group">
                                        <label htmlFor="first-name">First Name</label>
                                        <input type="text" name="first-name" id="first-name" className='lbox' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div> 
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="mobile-number">Mobile Number</label>
                                        <input type="tel" name="mobile-number" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn" onClick={addNumber}>Add</button>
                                    <button type="submit" className="btn" onClick={removeNumber}>Remove</button>
                                    </div>
                                    <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="mobile-number">Address</label>
                                        <input type="tel" name="mobile-number" id="mobile-number" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn" onClick={addAddress}>Add</button>
                                    <button type="submit" className="btn" onClick={removeAddress}>Remove</button>
                                    </div>
                                    </>
                                    )
                                    }
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
