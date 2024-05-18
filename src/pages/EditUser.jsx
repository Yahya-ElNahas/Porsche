import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Control_Panel from '../components/control-panel-register';
import './styles/register.css';

export default function EditUser() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(!Cookies.get('token') || !Cookies.get('type') || Cookies.get('type') != 'Admin') {
            navigate('/porsche')
            return
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:4004/v1/api/Customers/${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_numbers: [mobileNumber]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();
           
        } catch (error) {
            console.error('Error:', error);
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
                                    <div className="input-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </div>
                                </div>
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
                                <div className="input-group">
                                    <label htmlFor="mobile-number">Mobile Number</label>
                                    <input type="tel" name="mobile-number" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
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
