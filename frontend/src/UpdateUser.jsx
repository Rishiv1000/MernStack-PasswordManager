import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/read/${id}`);
      setInputUser({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
      });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/updateuser/${id}`, inputUser);
      if (res.status === 200) {
        window.location = "/";
      }
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Update User</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              style={styles.input}
              placeholder="Enter name"
              required
              value={inputUser.name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              style={styles.input}
              placeholder="Enter email"
              required
              value={inputUser.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              style={styles.input}
              placeholder="Enter Password"
              required
              value={inputUser.password}
              onChange={handleChange}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageContainer: {
    backgroundColor: '#000000', // Black background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    backgroundColor: '#1e1e1e', // Dark grey background for container
    borderRadius: '8px',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ffffff', // White text
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#cccccc', // Light grey text for labels
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderRadius: '8px',
    padding: '0.75rem',
    border: '2px solid #444444', // Dark grey border
    backgroundColor: '#2c2c2c', // Slightly lighter grey background
    color: '#ffffff', // White text
    fontSize: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff', // Blue button background
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
    transform: 'scale(1.05)',
  },
};

export default UpdateUser;
