import Control_Panel from '../components/control-panel-login';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
 
import './styles/register.css';

function Login() {

    for (const cookieName in Cookies.get()) {
        Cookies.remove(cookieName);
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/v1/api/Admins/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username : username,
                    password : password
                })
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            const token = data.token;
            Cookies.set('token', token, {expires: 1})
            navigate('/admin_home')
        } catch (error) {
            try {
                const response = await fetch('http://localhost:3001/v1/api/Customers/Login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username : username,
                        password : password
                    })
                });
                console.log(response)
    
                if (!response.ok) {
                    throw new Error('Failed to login');
                }
    
                const data = await response.json();
                const token = data.token;
                Cookies.set('token', token, {expires: 1})
                navigate('/home')
            } catch (error) {
                window.alert('Incorrect data')
                navigate('/login')
            }
        }
    };

    return (
        <div className='register-login'>
            <header>
                <Control_Panel />
                <div class="main">
                    <div class="lr-form">
                        <div class="container">
                            <h1 class="hdr">Porsche</h1>
                            <form class="form" onSubmit={handleLogin}>
                                <div class="input-group">
                                    <label for="email">Email / Username</label>
                                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="email" id="email" required />
                                </div>
                                <div class="input-group">
                                    <label for="password">Password</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" required />
                                </div>
                                <button type="submit" class="btn">Login</button>
                            </form>
                            <div class="rdrct">
                                <p>Don't have an account?
                                    <span> <Link to="/register"><a>Sign up</a></Link></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Login;
