import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Using js-cookie for cookie management
import './Auth.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message
    const navigate = useNavigate(); // Hook for navigating

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:1045/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User signed up.', data);
                Cookies.set('userId', data.userId); // Set cookie with userId
                setErrorMessage(''); // Clear any previous errors
                setSuccessMessage('User added successfully'); // Set success message

                // Delay of 3 seconds before navigating to homepage, to show success message
                setTimeout(() => {
                    navigate('/');
                }, 1500);

                // Clear fields after setting the message
                setUsername('');
                setPassword('');
                setConfirmPassword('');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred');
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} 
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
            />
            <button onClick={handleSignup} className="auth-button">Signup</button>
        </div>
    );
}

export default SignUp;
