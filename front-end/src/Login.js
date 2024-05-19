import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  // State to hold the success message

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:1045/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // If login is successful, save the userId to cookies
                Cookies.set('userId', data.userId);
                setSuccessMessage('User logged in successfully'); // Set success message
                setErrorMessage(''); // Clear any existing error messages
                // Delay of 3 seconds before navigating to homepage to show the success message
                setTimeout(() => {
                    navigate('/'); // Redirect to homepage after the delay
                }, 1500);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred');
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="auth-container">
            <h1>Login Page</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}  
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} className="auth-input" />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="auth-input" />
            <div className="auth-actions">
                <button onClick={handleLogin} className="auth-button">Login</button>
                <button onClick={handleSignup} className="auth-button secondary">Signup</button>
            </div>
        </div>
    );
};

export default Login;
