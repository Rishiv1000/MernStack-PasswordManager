import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReadUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/read/${id}`);
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  if (!userData) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>User Details</h1>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeadCell}>SN.</th>
                <th style={styles.tableHeadCell}>Name</th>
                <th style={styles.tableHeadCell}>Email</th>
                <th style={styles.tableHeadCell}>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={styles.tableCell}>1</td>
                <td style={styles.tableCell}>{userData.name}</td>
                <td style={styles.tableCell}>{userData.email}</td>
                <td style={styles.tableCell}>{userData.password}</td>
              </tr>
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
    background: 'linear-gradient(135deg, #000000, #434343)', // Dark gradient background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    backgroundColor: '#1e1e1e', // Dark grey container background
    borderRadius: '8px',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ffffff', // White text
    textAlign: 'center',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    textAlign: 'left',
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#333333', // Dark grey header background
    color: '#ffffff', // White text
  },
  tableHeadCell: {
    padding: '12px',
    borderBottom: '2px solid #444444', // Slightly lighter grey border
    fontWeight: 'bold',
  },
  tableRow: {
    backgroundColor: '#1e1e1e', // Dark grey rows
    borderBottom: '1px solid #333333', // Slightly lighter grey border
  },
  tableCell: {
    padding: '12px',
    color: '#ffffff', // White text
  },
  loading: {
    color: '#ffffff', // White loading text
    textAlign: 'center',
    fontSize: '1.5rem',
  },
};

export default ReadUser;
