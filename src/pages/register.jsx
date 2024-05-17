import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-register';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/register.css';

function Register() {

    for (const cookieName in Cookies.get()) {
        Cookies.remove(cookieName);
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [dob, setDob] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_numbers: [mobileNumber],
                    addresses: [],
                    age: new Date().getFullYear() - new Date(dob).getFullYear()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            navigate('/home')
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
                            <h1 className="hdr">Porsche</h1>
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className='lbox' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
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
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="mobile-number">Mobile Number</label>
                                    <input type="tel" name="mobile-number" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="dob">Birthdate</label>
                                    <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                                </div>
                                <button type="submit" className="btn">Register</button>
                            </form>
                            <div className="rdrct">
                                <p>Already have an account? 
                                    <span> <Link to="/login">Login</Link></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </header>
        </div>
    );
}

export default Register;
