import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import { Link, useNavigate } from "react-router-dom"; 
import { isLoggedIn, logout } from "../utils/api";


function NavigationBar() { 
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
  };

  return ( 
    <Navbar 
      sticky="top" 
      style={{
        background: 'linear-gradient(to right, #2563eb, #1e40af)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '70px',
        borderRadius: 0
      }} 
      data-bs-theme="dark"
    > 
      <Container> 
        <Nav className="me-auto" style={{ gap: '1.5rem' }}> 
          {loggedIn ? (
            <>
              <Nav.Link style={{ transition: 'all 0.2s' }}> 
                <Link to="/expenses" style={{ color: 'white', fontWeight: '600' }}>Expenses</Link> 
              </Nav.Link> 
              <Nav.Link style={{ transition: 'all 0.2s' }}> 
                <Link to="/income" style={{ color: 'white', fontWeight: '600' }}>Income</Link> 
              </Nav.Link>
              <Nav.Link style={{ transition: 'all 0.2s' }}> 
                <Link to="/profile" style={{ color: 'white', fontWeight: '600' }}>Profile</Link> 
              </Nav.Link>
              <Nav.Link 
                onClick={handleLogout} 
                style={{ cursor: 'pointer', color: 'white', fontWeight: '600' }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link> 
                <Link to="/login" style={{ color: 'white', fontWeight: '600' }}>Sign In</Link> 
              </Nav.Link>
              <Nav.Link> 
                <Link to="/register" style={{ color: 'white', fontWeight: '600' }}>Sign Up</Link>
              </Nav.Link>
            </>
          )}
        </Nav> 
      </Container> 
    </Navbar> 
  ); 
} 
 
export default NavigationBar;