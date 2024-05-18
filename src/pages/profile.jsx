import React, { useState, useEffect } from 'react';
import './styles/profile.css';
import Control_Panel_Admin from '../components/control-panel-profile-admin';
import Control_Panel_Customer from '../components/control-panel-profile';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const username = Cookies.get('username')
  const type = Cookies.get('type')
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
    if(!Cookies.get('token')) {
      navigate('/porsche')
      return
    }
    fetchData();
  }, [username]);

  return (
    <>
            {type == 'Admin' && (
              <Control_Panel_Admin/>
            )}
            {type != 'Admin' && (
              <Control_Panel_Customer/>
            )}
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-header">Profile</div>
                    <div className="profile-info">
                        <div>Name: {username}</div>
                        {userdata && (
                            <>
                                <div>Email: {userdata.email}</div>
                                {type != 'Admin' && (
                                    <>
                                        <div>First Name: {userdata.first_name}</div>
                                        <div>Last Name: {userdata.last_name}</div>
                                        <div>Mobile Numbers: {userdata.mobile_numbers.map(num =>(
                                              <span>{num}, </span>
                                          ))}
                                        </div>
                                    </>
                                )}
                                <button onClick={() => navigate('/edit_profile')}>Edit</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    
  );
}
