import React, { useState, useEffect } from 'react';
import './styles/profile.css';
import Control_Panel from '../components/control-panel-login';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const username = Cookies.get('username')
  const navigate = useNavigate();
  const [userdata, setUserData] = useState(null);

  const fetchData = () => {
    fetch(`http://localhost:4004/v1/api/Customers/${username}`)
      .then((doc) => doc.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  console.log(userdata); // You can access userdata here

  async function editUser(name) {
    try {
      const response = await fetch(`http://localhost:4004/v1/api/Customers/${username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: name,
        })
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
    <Control_Panel></Control_Panel>
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">Profile</div>
        <div className="profile-info">
          <div>Name: {username}</div>
          {/* <div>Type: {type}</div> */}
          {userdata && (
            <>
              <div>Email: {userdata.email}</div>
             
              <div>First Name: {userdata.first_name}</div>
              <div>Last Name: {userdata.last_name}</div>
              <div>Mobile Numbers: {userdata.mobile_numbers}</div>
              <button onClick={() => navigate('/editUser')}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
    </>
    
  );
}
