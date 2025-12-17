import React, { useState, useEffect } from 'react';
import { getAdminData } from '../utils/api';
import { getUser } from '../utils/api';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function AdminDashboard() {
  const [data, setData] = useState({
    users: [],
    expenses: [],
    income: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = getUser();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await getAdminData();
      if (response) {
        setData(response);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load admin data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="mb-5">
        <h3 className="mb-3">Users ({data.users?.length || 0})</h3>
        {data.users && data.users.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.userName || 'N/A'}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No users found</p>
        )}
      </div>

      <div className="mb-5">
        <h3 className="mb-3">Expenses ({data.expenses?.length || 0})</h3>
        {data.expenses && data.expenses.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.expenses.map((e) => (
                  <tr key={e._id}>
                    <td>{e.user}</td>
                    <td>{e.category || 'N/A'}</td>
                    <td>${e.amount?.toFixed(2) || '0.00'}</td>
                    <td>{e.description || 'N/A'}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No expenses found</p>
        )}
      </div>

      <div className="mb-5">
        <h3 className="mb-3">Income ({data.income?.length || 0})</h3>
        {data.income && data.income.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.income.map((i) => (
                  <tr key={i._id}>
                    <td>{i.user}</td>
                    <td>{i.category || 'N/A'}</td>
                    <td>${i.amount?.toFixed(2) || '0.00'}</td>
                    <td>{i.description || 'N/A'}</td>
                    <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No income found</p>
        )}
      </div>
    </Container>
  );
}

export default AdminDashboard;
