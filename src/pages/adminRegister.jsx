import React, { useState, useEffect } from 'react';
import Control_Panel from '../components/control-panel-register';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './styles/register.css';

function AdminRegister() {

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
            const response = await fetch('http://localhost:3001/v1/api/Admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            const token = data.token;
            Cookies.set('token', token, {expires: 1})
            Cookies.set('username', username, {expires: 1})
            Cookies.set('type', 'Admin', {expires: 1})
            navigate('/admin_home')
        } catch (error) {
            window.alert('Error');
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
                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

export default AdminRegister;
