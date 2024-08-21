import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register", { name, email, password })
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => console.log(err));
    };

    const isFormValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== ''; // Check if all fields are not empty

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Password Manager</h1>
                <h2 style={styles.formHeading}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="name" style={styles.label}>Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            style={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
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
                        <label htmlFor="password" style={styles.label}>Password</label>
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
                        Register
                    </button>
                </form>
                <p style={styles.linkText}>Already have an account?</p>
                <Link to="/login" style={styles.link}>
                    Sign In
                </Link>
            </div>
        </div>
    );
}

// Styles
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
        backgroundColor: '#007bff', // Blue background for the button
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
        backgroundColor: '#333333', // Dark grey background for the link
        border: '1px solid #555555', // Darker grey border
        borderRadius: '4px',
        color: '#007bff', // Blue text color for the link
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

export default Register;
