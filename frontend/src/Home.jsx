import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState({});

  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("https://password-manager-using-mern-u4rt.onrender.com/createuser", inputUser);
      console.log(res);
      fetchAllUser();
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("https://password-manager-using-mern-u4rt.onrender.com/readalluser");
      console.log(res);
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://password-manager-using-mern-u4rt.onrender.com/delete/${id}`);
      if (res.status === 200) {
        fetchAllUser();
      }
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('authToken'); // Example for removing token
      navigate('/login');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Passwords Management</h1>
          <button
            onClick={handleLogout}
            style={{
              ...styles.logoutButton,
              ...(isLogoutHovered && styles.logoutButtonHover),
            }}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
          >
            Logout
          </button>
        </div>

        {/* Creating form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.formHeading}>Save Your Information</h2>
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
              type="text"
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
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isButtonHovered && styles.buttonHover),
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Add User
            </button>
          </div>
        </form>

        {/* User table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeadCell}>SN.</th>
                <th style={styles.tableHeadCell}>Name</th>
                <th style={styles.tableHeadCell}>Email</th>
                <th style={styles.tableHeadCell}>Password</th>
                <th style={styles.tableHeadCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, i) => (
                <tr key={item._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{i + 1}</td>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>{item.email}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.passwordContainer}>
                      <span style={styles.password}>
                        {showPasswords[item._id] ? item.password : '••••••'}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(item._id)}
                        style={{
                          ...styles.toggleButton,
                          ...(isDeleteHovered[item._id] && styles.toggleButtonHover),
                        }}
                        onMouseEnter={() => setIsDeleteHovered(prev => ({ ...prev, [item._id]: true }))}
                        onMouseLeave={() => setIsDeleteHovered(prev => ({ ...prev, [item._id]: false }))}
                      >
                        {showPasswords[item._id] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actions}>
                      <NavLink to={`/readuser/${item._id}`} style={styles.link}>
                        Read
                      </NavLink>
                      <NavLink to={`/updateuser/${item._id}`} style={styles.link}>
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          ...styles.deleteButton,
                          ...(isDeleteHovered[item._id] && styles.deleteButtonHover),
                        }}
                        onMouseEnter={() => setIsDeleteHovered(prev => ({ ...prev, [item._id]: true }))}
                        onMouseLeave={() => setIsDeleteHovered(prev => ({ ...prev, [item._id]: false }))}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageContainer: {
    background: 'linear-gradient(135deg, #000000, #434343)', // Black to dark grey gradient
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: '#1e1e1e', // Dark grey background for form container
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    maxWidth: '900px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ffffff', // White text
    margin: '0',
  },
  logoutButton: {
    backgroundColor: '#ff5722', // Orange button
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  logoutButtonHover: {
    backgroundColor: '#e64a19', // Darker orange on hover
    transform: 'scale(1.05)',
  },
  form: {
    marginBottom: '20px',
  },
  formHeading: {
    fontSize: '1.75rem',
    color: '#ffffff', // White text for form heading
    textAlign: 'center',
    marginBottom: '15px',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    color: '#dddddd', // Light grey text
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderRadius: '6px',
    padding: '0.75rem',
    border: '1px solid #444444', // Darker grey border
    backgroundColor: '#333333', // Dark background for input
    color: '#ffffff', // White text
    fontSize: '1rem',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff', // Blue color
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  },
  buttonHover: {
    backgroundColor: '#0056b3', // Darker blue on hover
    transform: 'scale(1.05)',
  },
  tableContainer: {
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    textAlign: 'left',
    backgroundColor: '#1e1e1e', // Dark grey for table
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#333333', // Dark grey for table header
    color: '#ffffff', // White text
  },
  tableHeadCell: {
    padding: '12px 15px',
    borderBottom: '2px solid #444444', // Darker grey border for heading cells
    fontWeight: 'bold',
  },
  tableRow: {
    backgroundColor: '#1e1e1e', // Dark grey for table rows
    borderBottom: '1px solid #333333', // Slightly lighter grey for row borders
  },
  tableCell: {
    padding: '12px 15px',
    color: '#dddddd', // Light grey text
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  password: {
    fontFamily: 'monospace',
    color: '#ffffff', // White text
  },
  toggleButton: {
    backgroundColor: '#333333', // Dark grey
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  toggleButtonHover: {
    backgroundColor: '#444444', // Slightly lighter grey on hover
    transform: 'scale(1.05)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  link: {
    color: '#007bff', // Blue color for links
    textDecoration: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    backgroundColor: '#333333', // Dark grey background for links
    transition: 'background-color 0.3s, color 0.3s',
    fontSize: '0.875rem',
  },
  linkHover: {
    backgroundColor: '#0056b3', // Darker blue background on hover
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#d32f2f', // Red delete button
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  deleteButtonHover: {
    backgroundColor: '#b71c1c', // Darker red on hover
    transform: 'scale(1.05)',
  },
};

export default Home;
