import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import blogo from './assects/logo.png'
import './styles/Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password}, {
                headers: {
                  'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
              console.log('Login successful:', response.data);
              localStorage.setItem('token', response.data.token);
              console.log("Token is stored in Local Storage",localStorage.getItem('token'));
              navigate('/home');}
        } catch (error) {
            console.error('Login failed:', error);
            navigate('/signup')
        }
    };
  
    return (
      <div className='body'>
        <form onSubmit={handleSubmit}>

          <img src={blogo} alt="Logo" />

          <h1>Login</h1>
          <label for="User">Username:</label>
          <input type="text" id='User' className='User' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          
          <label for="password">Password:</label>
          <input type="password" className='password' id='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className='lbutton'>Submit</button>
        </form>
      </div>
    );
};

export default Login;
