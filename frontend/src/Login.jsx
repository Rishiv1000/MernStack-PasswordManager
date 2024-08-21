import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/management");
                } else {
                    navigate("/");
                    alert("You are not registered to this service");
                }
            })
            .catch(err => console.log(err));
    };

    const isFormValid = email.trim() !== '' && password.trim() !== ''; // Check if fields are not empty

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Password Manager</h1>
                <h2 style={styles.formHeading}>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ ...styles.button, ...(isFormValid ? {} : styles.buttonDisabled) }}
                        disabled={!isFormValid}
                    >
                        Sign In
                    </button>
                </form>
                <p style={styles.linkText}>Don't have an account?</p>
                <Link to="/" style={styles.link}>
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

// Styles for the component
const styles = {
    pageContainer: {
        background: 'linear-gradient(135deg, #000000, #434343)', // Dark gradient background
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    formContainer: {
        backgroundColor: '#1e1e1e', // Dark grey background for the form
        padding: '20px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Darker shadow for depth
    },
    heading: {
        fontSize: '2.5rem',
        color: '#ffffff', // White text
        marginBottom: '1.5rem',
        textAlign: 'center',
    },
    formHeading: {
        fontSize: '1.5rem',
        color: '#ffffff', // White text
        marginBottom: '1rem',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        borderRadius: '4px',
        padding: '0.75rem',
        border: '1px solid #555555', // Dark grey border
        backgroundColor: '#2a2a2a', // Darker background for inputs
        color: '#ffffff', // White text
    },
    button: {
        width: '100%',
        borderRadius: '4px',
        padding: '0.75rem',
        backgroundColor: '#007bff', // Blue background
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#555555', // Darker gray when disabled
        cursor: 'not-allowed',
    },
    linkText: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#ffffff', // White text
        fontSize: '0.875rem',
    },
    link: {
        display: 'block',
        textAlign: 'center',
        padding: '0.75rem',
        backgroundColor: '#333333', // Dark grey background
        border: '1px solid #555555', // Darker grey border
        borderRadius: '4px',
        color: '#007bff', // Blue text color
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'background-color 0.3s, color 0.3s',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#ffffff', // White text
        fontSize: '1rem',
    },
};

export default Login;
